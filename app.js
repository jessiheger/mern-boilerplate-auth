require('dotenv').config();
var bodyParser = require('body-parser');
var express = require('express');
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
// connected to routes/auth.js and HandleSubmit() in signup.js
app.use('/auth', require('./routes/auth'));

// this is eventually where our React is going to live:
app.get('*', function(req, res, next) {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); // client = name of React dir, build = production code (will have the minified versions of our final product; can be changed to Public folder while in dv stage and changed back to build before deployment)
	// index.html = render this html file for any and all routes not covered by '/auth'
});

module.exports = app;
