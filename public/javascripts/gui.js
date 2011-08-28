function joined(channel) {
  add_tab(channel);
  switch_channel(channel);
}

function add_tab(channel) {
  var tab = $('<li><a></a></li>');
  tab.addClass('active');
  tab.addClass(channel);
  $('a', tab).html(channel);
  
  tab.click(function() {
    switch_channel($('a', this).text());    
  });
  
  $('.tabs li').removeClass('active');
  $('.tabs').append(tab);
}

function switch_channel(channel) {
  active_channel = channel;
  $('.chat').hide();
  
  if ($('#' + channel).length > 0) {
    $('#' + channel).show();
  } else {
    var chan = $('<div />');
    chan.attr('id', channel);
    chan.addClass('chat');
    $('#chats').append(chan);
  }
  
  $('.tabs li').removeClass('active');
  $('.tabs li.' + channel).addClass('active');
}

$(function() {
  $("#msg").keyup(function(event){
    if(event.keyCode == 13){
      send_message();
    }
  });
});

$(function() {
  $("#nick").keyup(function(event){
    if(event.keyCode == 13){
      set_nickname();
    }
  });
});

function build_user_list() {
  $('#users ul').remove();
  
  var ul = $('<ul />');
  ul.addClass('userlist');
  
  for (var i = 0; i < users_list.length; i++) {
    var li = $('<li>' + users_list[i] + '</li>');
    ul.append(li);
  }
  
  $('#users').append(ul);
}
