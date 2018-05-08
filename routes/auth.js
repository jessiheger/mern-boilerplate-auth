require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcrypt');

// POST /auth/login route - returns a JWT
router.post('/login', function(req, res, next) {
  console.log('/auth/login post route', req.body);
  res.send('login route');
});

// POST /auth/signup route - create a user in the DB and then log them in
router.post('/signup', function(req, res, next) {
  //TODO: First check if the user already exists
  console.log('/auth/signup post route', req.body);
  res.send('sign up')
});

// This is checked on a browser refresh
router.post('/me/from/token', function(req, res, next) {
  // check header or url parameters or post parameters for token
  console.log('find user from token', req.body);
  res.send('keep logged in');
});

module.exports = router;


























