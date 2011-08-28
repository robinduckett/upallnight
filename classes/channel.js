function Channel(name) {
  this.name = name;
  this.users = [];
  this.moderators = [];
  this.banned = [];
  this.topic = '';
}

Channel.prototype.find_user = function(user) {
  
};

Channel.prototype.add_user = function(user) {
  
};

Channel.prototype.

global.channels = {
  _channels: [],
  
  find_channel: function(channel) {
    for (var i = 0; i < this._channels.length; i++) {
      if (channel == _channels[i].name) {
        return _channels[i];
      }
    }
    
    var new_channel = new Channel(channel);
    
    return _channels.push(new_channel) - 1; // should hopefully return the last index
  }
};