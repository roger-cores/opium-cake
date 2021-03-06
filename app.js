var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var routes = require('./server/routes/index');
var adminUserRoute = require('./server/routes/admin/users');
var adminProjectRoute = require('./server/routes/admin/projects');

var projectRoute = require('./server/routes/api/projects');

var mongoose = require('mongoose');
var models = require('./server/models');
var dbaseConfig = require('./server/models/config.json');
var connector = require('./server/models/connector');
var utils = require('./server/utils');
var app = express();
var loginPage = require('./server/routes/index');
var modulePage = require('./server/routes/module');
var adminPanelPage = require('./server/routes/admin');

var seed = require('./server/seed');

//set to qa server
connector(mongoose, dbaseConfig.qa);

//seed(models);

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//api routes




//Admin Panel
app.use('/api/admin/user', adminUserRoute.registerRoutes(models));
app.use('/api/admin/project', adminProjectRoute.registerRoutes(models, utils));

//App
app.use('/api/project', projectRoute.registerRoutes(models, utils));

//view routes
app.use('/', loginPage);
app.use('/admin', adminPanelPage);
app.use('/module',modulePage);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
