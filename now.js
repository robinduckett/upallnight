function load_session(sid, callback) {
  global.redis_store.get(unescape(sid), function(err, session) {
    if (err) {
      callback(err);
    } else {
      callback(null, session);
    }
  });
}

function save_session(sid, session, callback) {
  global.redis_store.set(unescape(sid), session, function(err) {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

function load_user(username, callback) {
  global.redis_store.get('user-' + username, function(err, user) {
    if (err) {
      callback(err);
    } else {
      callback(null, user);
    }
  });
}

function save_user(user_obj, callback) {
  global.redis_store.client.set('user-' + user_obj.username, JSON.stringify(user_obj), function(err) {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
}

module.exports = function(app) {
  var nowjs = require('now');
  var everyone = nowjs.initialize(app);
  
  nowjs.on('disconnect', function() {
    console.log(this.user);
  });
  
  nowjs.on('connect', function() {
    var now = this;
    
    load_session(now.user.cookie['connect.sid'], function(err, session) {
      if (err) {
        console.log(err);
      } else {
        if (session) {
          if (session.logged_in) {
            console.log(session);
          } else {
            anon(nowjs, now);
          }
        } else {
          anon(nowjs, now);
        }
      }
    });
  });
};

function anon(nowjs, client) {
  client.now.join_channel(client.user.clientId.toString(36), 'main');
  client.now.join_channel(client.user.clientId.toString(36), 'ragechat');
  client.now.join_channel(client.user.clientId.toString(36), 'haxd');
  client.now.join_channel(client.user.clientId.toString(36), 'test');
  
  var main = nowjs.getGroup('main');
  main.addUser(client.user.clientId);
}