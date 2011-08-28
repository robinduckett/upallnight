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

exports.load_session = load_session;
exports.save_session = save_session;
exports.load_user = load_user;
exports.save_user = save_user;