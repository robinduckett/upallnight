var active_channel = null;
var channels = [];

var pusher = null;

Pusher.host = 'ws.darling.pusher.com';

Pusher.log = function(message) {
  if (window.console && window.console.log) window.console.log(message);
};

$(function() {
  pusher = new Pusher('7d1978754fb5fce0a8e9');
  pusher.back_channel.trigger('connect', {fsid: $('meta[name=fsid]').attr('content')});
});

/*
now.join_channel = function(nickname, channel) {
  if (now.nickname == nickname) {
    var message = $('<p></p>').html('You joined ' + channel);
    join_channel(channel);
  } else {
    var message = $('<p></p>').html(nickname + ' joined ' + channel);
  }
  
  $('#' + channel).prepend(message);
};

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