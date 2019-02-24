/* jshint esversion:6*/
const db = require('../models/db');
const dht = require('../models/dht');
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash-messages');
const express = require('express');
const router = express.Router();

const saltRounds = 10;

router.get('/',function(req, res) {
  
  res.render('home', {title: 'Home Page'});
     
 
});
router.get('/home',function(req, res) {
  
  res.render('home', {title: 'Home Page'});
     
 
});
router.get('/dht', authenticationMiddleware(),function(req, res) {
  
  db.connect(function(err){
	if(!err){ console.log('connected ');
	};
	var query = db.query('SELECT * FROM  dht Order BY ID DESC LIMIT 2 ;', function(err, rows, fields){
			if(err) throw err;			
			res.render('dht',{data: rows});
			});
  
     
 
});
});
router.get('/login',function(req, res) {
  
  const flashMessages = res.locals.getMessages();
  console.log('flash', flashMessages);
  if (flashMessages.error) {
    res.render('login', {
      showErrors: true,
      errors: flashMessages.error
    });
  } else {
    res.render('login', {title: 'Login Page'});
  }
  
     
 });

 router.post('/login',passport.authenticate('local',{
    
    successRedirect:'/dht',
    failureRedirect:'/login',
    failureFlash: true
    
 }));

 router.get('/logout',function(req, res) {
  
  req.logout();
  req.session.destroy();
  res.redirect('/');
     
 });

router.get('/register',function(req, res) {
    res.render('register', {title: 'Registration'});
    
    
   
  });
  router.post('/register',function(req, res, next) {
    req.checkBody('username', 'Username field cannot be empty').notEmpty();
    req.checkBody('email', 'Enter Valid email').isEmail();
    req.checkBody('password', 'Password must be between 6 and 20').len(6,20);
    req.checkBody('matchPassword', 'Password do not match ').equals(req.body.password);
    
    const errors = req.validationErrors();
    if (errors) {
      res.render('register', {
        title: 'Registration error',
        errors : errors
      });
    }else{
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;

      bcrypt.hash(password, saltRounds, function(err, hash){
      
        
      db.query('INSERT INTO users (username, email, password) VALUES (?,?,?)', [username, email, hash], function(err, result, fields){
        if (err) throw err; 
        
        db.query('SELECT LAST_INSERT_ID() as user_id', function(error, result, field){
          if (error) throw error ;
          const user_id = result[0]; 

          
          req.login(user_id, function(err){
            res.redirect('/');
          });
            
          
        });
        //res.render('register', {title: 'Registration complete'});
    
     });
    });
    }  
   
  });
  passport.serializeUser(function(user_id, done) {
    done(null, user_id);
  });
  
  passport.deserializeUser(function(user_id, done) {
   
    done(null, user_id);
  
  });
  function authenticationMiddleware(){
    return(req, res, next) => {
      if(req.isAuthenticated()) return next();
        res.redirect('/login');
    };
  }
  module.exports = router;