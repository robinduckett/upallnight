if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

var active_channel = null;
var channels = [];

var pusher = null;

var connected = false;

var users_list = [];

Pusher.log = function(message) {
  if (window.console && window.console.log) window.console.log(message);
};

$(function() {
  pusher = new Pusher('[]');
  //pusher = new Pusher('28e501df7286c5d180b0');
  
  pusher.back_channel.bind('connection_established', function() {
    pusher.back_channel.trigger('rage', {fsid: $('meta[name=fsid]').attr('content')});
  });
  
  pusher.back_channel.bind('rejoin', function(channels) {
    for (var i = 0; i < channels.length; i++) {
      pusher.back_channel.trigger('join', {fsid: $('meta[name=fsid]').attr('content'), channel: channels[i]});
      log(channels[i], 'You joined ' + channels[i]);
      subscribe(channels[i]);
      joined(channels[i]);
    }
  });
  
  pusher.back_channel.bind('join', function(channel) {
    log(channel, 'You joined ' + channel);
    subscribe(channel);
    joined(channel);
  });
    
  pusher.back_channel.bind('user_count', function(count) {
    $('#userAmount').html(count.count);
  });
  
  pusher.back_channel.bind('user_list', function(list_part) {
    switch (list_part.type) {
      case 'add':
        for (var i = 0; i < list_part.list.length; i++) {
          var ind = users_list.indexOf(list_part.list[i]);
          if (ind == -1) {
            users_list.push(list_part.list[i]);
          }
        }
      break;
      case 'remove':
      for (var i = 0; i < list_part.list.length; i++) {
        var ind = users_list.indexOf(list_part.list[i]);
        if (ind > -1) {
          users_list.splice(ind, 1);
        }
      }
      break;
    }
    
    build_user_list();
  });
  
  pusher.back_channel.bind('user_list_full', function(list_full) {
    users_list = list_full.list;
    
    build_user_list();
  });
});

function subscribe(channel) {
  pusher.subscribe(channel);
  
  pusher.channel(channel).bind('join', function(username) {
    log(channel, username + ' joined ' + channel);
    pusher.channel(channel).trigger('list', {room: channel, fsid: $('meta[name=fsid]').attr('content')});
  });
  
  pusher.channel(channel).bind('message', function(message) {
    var text = message.message;
    var username = message.nickname;
    log(channel, '&lt;' + username + '&gt; ' + text);
  });
  
  pusher.channel(channel).bind('quit', function(username) {
    log(channel, username +' quit ' + channel);
  });
}

function log(channel, text) {
  var p = $('<p></p>');
  p.html(text);
  replaceFaces(p);
  $('#' + channel).prepend(p);
}

function send_message() {
  var msg = $('#msg').val();
  $('#msg').val('');
  var trig = {fsid: $('meta[name=fsid]').attr('content'), message: msg, chan: active_channel};
  console.log(trig);
  pusher.back_channel.trigger('message', trig);
}