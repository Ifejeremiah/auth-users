require('dotenv').config();   //Load environment variables into application
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./app_server/models/db');

// Require routes
const indexRouter = require('./app_server/routes');

// Initialize express
const app = express();

// Passport config
require('./app_server/config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express session
app.use(session({
  secret: process.env.SECRET,   // Load given secret from .env file 
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash middleware
app.use(flash());

// Set global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

// Routes Middleware
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render('error', {
    status: 404,
    message: 'Sorry, we could not find this resource.'
  });
});

// error handler (Server Error - 500)
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).render('error', {
    status: 500,
    message: 'Something somewhere just got wrong.'
  });
});

module.exports = app;
