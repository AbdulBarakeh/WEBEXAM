require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const cors = require('cors')

require('./dataAccess/mongoDbAccess');
require('./models/student')
require('./models/user')
const studentsRouter = require('./routes/students');
const authenticationRouter = require('./routes/authentication');
const workoutRouter = require('./routes/workout')
const exerciseRouter = require('./routes/excercise')
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/students', studentsRouter);
app.use('/auth', authenticationRouter);
app.use('/workout', workoutRouter);
app.use('/exercise', exerciseRouter);
app.use('', express.static(path.join(__dirname, 'public')))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.json({
    "message": 'Unknown endpoint.'
  });
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({
      "message": err.name + ": " + err.message
    });
  }
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Return error as json
  res.status(err.status || 500);
  res.json({ error: err.message });
});



module.exports = app;
