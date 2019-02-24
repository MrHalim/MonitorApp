/* jshint esversion:6*/
const db = require('../models/db');
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
const passport = require('passport');
const registerRoute = require('./register');
const express = require('express');
const router = express.Router();

//router.use('/register', registerRoute);
router.get('/',function(req, res) {
    console.log(req.user);  
    console.log(req.isAuthenticated());
    res.render('home', {title: 'Home Page'});
       
   
  });

  module.exports = router;