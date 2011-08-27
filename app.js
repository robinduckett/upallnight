
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

var RedisStore = require('connect-redis')(express);

global.redis_store = new RedisStore({
  host: 'ragechat.com'
});

require('nko')('FDVuw0Qpjelbhb2p');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({secret: 'minecraft is fun', store: global.redis_store}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

require('./routes')(app);

app.listen(3000);

require('./now')(app);

console.log("Ragechat server listening on port %d in %s mode", app.address().port, app.settings.env);
