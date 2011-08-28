var active_channel = null;
var channels = [];

var pusher = null;

var connected = false;

Pusher.log = function(message) {
  if (window.console && window.console.log) window.console.log(message);
};

$(function() {
//  pusher = new Pusher('7d1978754fb5fce0a8e9');
  pusher = new Pusher('28e501df7286c5d180b0');
  
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
});

function subscribe(channel) {
  pusher.subscribe(channel);
  
  pusher.channel(channel).bind('join', function(username) {
    log(channel, username + ' joined ' + channel);
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
/*

now.get_message = function(nickname, channel, text) {
  if (now.nickname == nickname) {
    var message = $('<p></p>').html('&lt;you&gt; ' + text);
  } else {
    var message = $('<p></p>').html('&lt;' + nickname + '&gt; ' + text);
  }
  
  $('#' + channel).prepend(message);
};

now.ready(function() {
  now.channels = [];
  now.join('main');
});*/