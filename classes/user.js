function User(username) {
  this.username = username;
}

User.prototype.toObject = function() {
  return {
    username: this.username,
    email: this.email,
    password_hash: this.password_hash,
    channels: this.channels,
    avatar: this.avatar,
    banned: this.banned,
    host: this.host
  }
};
