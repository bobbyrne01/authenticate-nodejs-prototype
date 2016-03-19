var express = require('express'),
	app = express(),
  http = require('http').Server(app),
	winston = require('winston'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	MongoClient = require('mongodb').MongoClient,
	ObjectId = require('mongodb').ObjectID,
	assert = require('assert'),
	flash = require('connect-flash'),
	bcrypt = require('bcrypt-nodejs'),
	ipaddress = '127.0.0.1',
  port = 3000,
	mongoUrl = 'mongodb://' + ipaddress + ':27017/authenticate-nodejs-prototype';

// during dev
winston.level = 'debug';


/*
 * Database query
 * Searches db for user that matches provided username
 */
var findUser = function (db, id, callback) {
	var cursor = db.collection('userInfo').find({username: id.username});
	var result;
	cursor.each(function (err, doc) {
		assert.equal(err, null);
		if (doc !== null) {
			if (doc.username === id.username){ // if username matches
				if (bcrypt.compareSync(id.password, doc.password)){ // compare password against hash in db TODO investigate async
					result = doc;
				}
			}
		} else {
			callback(result);
		}
	});
};


// configure passport to use username and password authentication
passport.use(new LocalStrategy(
  function(username, password, done) {
		MongoClient.connect(mongoUrl, function (err, db) { // connect to db
			assert.equal(null, err);
			findUser(db, {username:username, password:password}, function (result) {
				db.close(); // close db connection

				if (err) {
					return done(err);
				}
				if (result) {
            return done(null, result); // success
        } else {
            return done(null, false); // failure
        }
			});
		});
  }
));
passport.serializeUser(function(user, done) {
  return done(null, user);
});
passport.deserializeUser(function(id, done) {
	return done(null, false);
});

app.configure(function() {
  app.use(express.static('public'));
	app.use('/css', express.static(__dirname + '/css/'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
	app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

/*
 * setup endpoints
  */
app.get('/', function(req, res){
	winston.debug('GET /');
  res.sendfile('views/index.html');
});
app.get('/success', function(req, res){
	winston.debug('GET /success');
  res.sendfile('views/success.html');
});
app.get('/failure', function(req, res){
	winston.debug('GET /failure');
  res.sendfile('views/failure.html');
});
app.post('/login',
  passport.authenticate('local', { successRedirect: '/success',
                                   failureRedirect: '/failure' })
);

// start server
http.listen(port, ipaddress, function(){
  winston.info('Listening on ' + ipaddress + ':' + port);
});
