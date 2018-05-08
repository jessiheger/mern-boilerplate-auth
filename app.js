require('dotenv').config();
var bodyParser = require('body-parser');
var express = require('express');
var expressJWT = require('express-jwt');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var app = express();


// Mongoose connect
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern_auth', {useMongoClient: true});

// Set up middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'client', 'build'))); // when ready to deploy, change 'public' back to 'build'

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.currentUser = req.user;
  next();
});

// Controllers: auth routes
// Now any route that it's in /auth is token-protected
// connected to routes/auth.js and HandleSubmit() in signup.js
app.use('/auth', expressJWT({
	// make it necessary to have a token beore you can access any of these routes 
	secret: process.env.JWT_SECRET,
	// getToken will parse out the token from the request; when we try to access the user w/ a token they already have, 
	getToken: function fromRequest(req){
		// will look for the authorization, and parse out the word "bearer" from the authorization (someone with a token will have this word attached to their token)
		if(req.body.headers.Authorization && 
			req.body.headers.Authorization.split(' ')[0] === 'Bearer'){
			return req.body.headers.Authorization.split(' ')[1];
		}
		return null;
	}
}).unless({
	// paths for the login or signups POST method are UNprotected (not need to be an active user to see these pages)
	path: [
	{ url: '/auth/login', methods: ['POST']},
	{url: '/auth/signup', methods: ['POST']}
	]
}), require('./routes/auth'));

// this is eventually where our React is going to live:
app.get('*', function(req, res, next) {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); // client = name of React dir, build = production code (will have the minified versions of our final product; can be changed to Public folder while in dv stage and changed back to build before deployment)
	// index.html = render this html file for any and all routes not covered by '/auth'
});

module.exports = app;
