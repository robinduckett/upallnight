var Recaptcha = require('recaptcha').Recaptcha;

var PUBLIC_KEY = '6LekNscSAAAAAHtzYV_VhcxzeDfETK6uAyyhaVyJ';
var PRIVATE_KEY = '6LekNscSAAAAACmXgqfx4sDJD6n9cBfHFOjnxWIz';

module.exports = function(app) {
  app.get('/', function(req, res){
  res.render('index', {
      title: 'Express',
      logged_in: req.session.logged_in || false,
      username: req.session.user ? req.session.user.username : 'guest'
    });
  });
  
  app.get('/logout', function(req, res) {
    req.session.regenerate(function(err) {
      res.header('Location', '/');
      res.send(301);
    });
  });
  
  app.get('/login', function(req, res) {
    res.render('login', {
      title: 'Ragechat Login'
    });
  });
  
  app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    
    var crypto = require('crypto');
    var sha1 = crypto.createHash('sha1');
    
    sha1.update(username + ':' + password);
    var hash = sha1.digest('hex');
    
    var user_obj = {
      username: username
    };
    
    global.redis_store.get('user-' + username, function(err, user) {
      if (err) {
        console.log(err);
        login_fail(res);
      } else {
        if (user) {
          if (user.password_hash == hash) {
            user_obj.email = user.email;
            login_succeed(req, res, user_obj);
          } else {
            login_fail(res);
          }
        } else {
          login_fail(res);
        }
      }
    });
  });
  
  app.get('/register', function(req, res) {
    if (req.session.logged_in) {
      res.header('Location', '/');
      res.send(301); 
    } else {
      var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
      
      res.render('register', {
        title: 'Ragechat Register',
        errors: [],
        recaptcha_form: recaptcha.toHTML()
      });
    }
  });
  
  app.post('/register', function(req, res) {
    if (req.session.logged_in) {
      res.header('Location', '/');
      res.send(301); 
    }
    
    var username = req.body.username;
    var password = req.body.password;
    var password_confirm = req.body.password_confirm;
    var email = req.body.email;
    
    var crypto = require('crypto');
    var sha1 = crypto.createHash('sha1');
    
    sha1.update(username + ':' + password);
    
    var hash = sha1.digest('hex');
    
    var user_obj = {
      username: username,
      password_hash: hash,
      email: email
    };
    
    if (password != password_confirm) {
      render_register(res, req, ['passwords do not match']);
      return;
    }
    
    if (!username || username.length < 5) {
      render_register(res, req, ['please enter a valid username'])
      return;
    }
    
    if (!password || password.length < 5) {
      render_register(res, req, ['please enter a valid password (longer than 5 chars)']);
      return;
    }
    
    if (!email || email.length < 6 || !isEmail(email)) {
      render_register(res, req, ['please enter a valid email address']);
      return;
    }
    
    var data = {
      remoteip:  req.connection.remoteAddress,
      challenge: req.body.recaptcha_challenge_field,
      response:  req.body.recaptcha_response_field
    };
    
    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY, data);
    
    recaptcha.verify(function(success, error_code) {
      if (success) {
        register_user(req, res, user_obj);
      } else {
        res.render('register', {
          title: 'Ragechat Register',
          errors: [],
          recaptcha_form: recaptcha.toHTML()
        });
      }
    });
  });
};

function register_user(req, res, user_obj) {
  global.redis_store.get('user-' + user_obj.username, function(err, user) {
    if (!user) {
      try {
        global.redis_store.client.set('user-' + user_obj.username, JSON.stringify(user_obj), function(err) {
          if (err) {
            render_register(res, req, [err.toString()]);
          } else {
            login_succeed(req, res, user_obj);
          }
        });
      } catch (err) {
        render_register(res, req, [err.toString()]);
      }
    } else {
      render_register(res, req, ['user already exists']);
    }
  });
}

function login_fail(res) {
  res.header('Location', '/login?fail=true');
  res.send(301);
}

function render_register(res, req, errors) {
  var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
  
  var render_data = {
    title: 'Ragechat Register',
    errors: errors,
    recaptcha_form: recaptcha.toHTML()
  };
    
  res.render('register', render_data);
}

function login_succeed(req, res, user_obj) {
  req.session.logged_in = true;
  req.session.user = user_obj;
  
  req.session.save(function(err) {
    res.header('Location', '/');
    res.send(301);
  });
}