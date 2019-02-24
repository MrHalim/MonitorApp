/* jshint esversion:6*/
const bodyParser = require('body-parser');
const logger = require('morgan');
const hbs = require('hbs');
const expressValidator = require('express-validator');
const session = require('express-session');
const flash = require('express-flash-messages');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cookieParser = require('cookie-parser');
const db = require('./models/db');
const dht = require('./models/dht');
const bcrypt = require('bcrypt');
const MySqlStore = require('express-mysql-session');
const registerRoute = require('./routes/register');
//const homeRoute = require('./routes/home');
const express = require('express');


const app = express();


app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
app.use(logger('tiny'));
app.use(cookieParser());

const options = {
    host:'localhost',
    user:'root',
    password:'password',
    database:'dhtmonapp'
};

const sessionStore =  new MySqlStore(options);

app.use(session({
    secret: 'this secret flacky',
    resave:false,
    store: sessionStore,
    saveUninitialized:false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

//app.use('/', homeRoute);
//app.use('/home', homeRoute);
app.use('/', registerRoute);

passport.use(new LocalStrategy(
    function(username, password, done) {
     db.query('SELECT id, password from users where username = ?',[username], function(err, reslt, fields){
         if (err) {done(err)};
         if (reslt.length === 0) {
            done(null, false, {
                message: 'username or password was invalid.'
      });
         } else{
            const hash = reslt[0].password.toString();
            bcrypt.compare(password, hash, function(err, response){
                if(response === true){
                    return done(null, {user_id: reslt[0].id});
                }
                else{
                    return(null, false);
                }
               });
         }
         
        
     });
       
    }
   ));


app.listen(3333,function(){
    console.log(`listening on port 3333`);
});