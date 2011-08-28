var Pipe = require('pusher-pipe'),
    redis = require('./redis');

var pipe = Pipe.createClient({
  key: '7d1978754fb5fce0a8e9',
  secret: 'ea42eae168f0b04d12d0',
  app_id: 26
});

pipe.connect();

var users = [];
var rooms = {};

pipe.sockets.on('event:connect', function(socket_id, data) {
  console.log(users);
  
  if (data.fsid) {
    if (data.fsid.length > 3) {
      var found = false;
      
      for (var i = 0; i < users.length; i++) {
        if (users[i]) {
          if (users[i].fsid == data.fsid) {
            found = true;
            
            redis.load_session(data.fsid, function(i) {
              return function(err, session) {
                users[i].session = session;
                
                users[i].socket_id = socket_id;
                
                if (!session.user) {
                  users[i].username = socket_id;
                } else {
                  users[i].username = session.user.username;
                }
                
                pipe.socket(socket_id).trigger('event:rejoin', users[i].channels);
              }
            }(i));
            
          }
        }
      }
      
      if (found == false) {
        redis.load_session(data.fsid, function(err, session) {
          if (err) {
            console.log(err);
          } else {
            var user = users.push({fsid: data.fsid, username: session.user.username, socket_id: socket_id, session: session, channels: []}) - 1;
            user = users[user];
            join_room(user, 'main');
          }
        });
      }
    }
  }
});

function join_room(user, room) {
  if (user.channels.indexOf(room) == -1) {
    pipe.channel(room).trigger('event:join', user.username);
    pipe.socket(user.socket_id).trigger('event:join', room);
    user.channels.push(room);
    
    if (rooms[room]) {
      var found = false;
      
      for (var i = 0; i < rooms.users.length; i++) {
        if (rooms.users[i].username == user.username)
      }
    } else {
      create_room(room, user);
    }
  }
}

function create_room(room, mod) {
  
}

pipe.sockets.on('event:join', function(socket_id, channel) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].socket_id == socket_id) {
      join_room(users[i], channel);
    }
  }
});

pipe.sockets.on('close', function(socket_id) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].socket_id == socket_id) {
      for (var j = 0; j < users[i].channels.length; j++) {
        pipe(users[i].channels[i]).trigger('event:quit', users[i].username);
      }
    }
  }
});