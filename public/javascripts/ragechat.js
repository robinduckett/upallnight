var active_channel = null;
var channels = [];

var pusher = null;

Pusher.log = function(message) {
  if (window.console && window.console.log) window.console.log(message);
};

$(function() {
  pusher = new Pusher('7d1978754fb5fce0a8e9');
  
  pusher.connection.bind('connected', function() {
    pusher.back_channel.trigger('connect', {fsid: $('meta[name=fsid]').attr('content')});
  });
  
  pusher.back_channel.bind('event:rejoin', function(channels) {
    for (var i = 0; i < channels.length; i++) {
      subscribe(channels[i]);
      joined(channels[i]);
    }
  });
  
  pusher.back_channel.bind('event:join', function(channel) {
    subscribe(channel);
    var message = $('<p></p>').html('You joined ' + channel);
    joined(channel);
    $('#' + channel).prepend(message);
  });
});

function subscribe(channel) {
  pusher.subscribe(channel);
  
  pusher.channel(channel).bind('event:join', function(username) {
    $('#' + channel).prepend(username +' joined ' + channel);
  });
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