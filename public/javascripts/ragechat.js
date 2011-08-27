var active_channel = null;

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
});