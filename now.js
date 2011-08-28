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
  
  everyone.now.send_message = function(channel, text) {
    var now = this;
    var chan = nowjs.getGroup(channel);
    
    chan.hasClient(now.user.clientId, function(hasClient) {
      if (hasClient) {
        chan.now.get_message(new Number(now.now.client_id).toString(36), channel, text);
      } else {
        now.now.get_message('Error', 'main', 'You are not in ' + channel);
      }
    });
  };
  
  nowjs.on('disconnect', function() {
    console.log(this.now.client_id + ' disconnected');
  });
  
  nowjs.on('connect', function() {
    if (!this.now.client_id) {
      this.now.client_id = this.user.clientId;
    }
    
    this.now.client_id + 'connected'
  });
};

function anon(nowjs, client) {
  if (client.now.channels.indexOf('main') == -1) {
    join_channel(nowjs, client, 'main');
    join_channel(nowjs, client, 'ragechat');
  }
}

function join_channel(nowjs, client, channel) {
  var chan = nowjs.getGroup(channel);
  chan.addUser(client.user.clientId);
  client.now.join_channel(new Number(client.now.client_id).toString(36), channel);
}