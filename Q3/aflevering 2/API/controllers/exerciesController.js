// Imports
const mongoose = require('../dataAccess/mongoDbAccess');
var model = require('../models/exercise');
var modelW = require('../models/workout');
exports.createExercise = function (req, res) {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    console.dir('mongoose connected.')
    //Don't use resources if reps and sets are invalid
    if(req.body.exerciseSet > 0 && req.body.exerciseRep > 0){
    let exercise = new model.Exercise({ Name: req.body.exerciseName, Description: req.body.exerciseDescription, NumberOfSets: req.body.exerciseSet, NumberOfReps: req.body.exerciseRep });
    exercise.save(function (err) {
      if (err) return handleError(err)
      var workouts = modelW.Workout;
      workouts.findOne({ 'Name':req.body.workoutNameSelect}).then(doc => {
        doc.Exercises.push(exercise)
        doc.save();
      }).catch(err => {
        console.error(err)
      });
      res.status(200).json({
        exercise
      })
    })}
    else{
      res.send("Can't add exercises with 0 reps/sets or under")
    }
  }

exports.getAllWorkouts = function (req, res) {
    var workouts = mongoose.model('Workout')
    var query = workouts.find({ 'UserId' : req.user.id});
    query.exec(function(err, workouts){
        if(err){
            console.log("Error occoured: " + err.message);
            return;
        }
        res.status(200).json({
          workouts
        })
    })
};

exports.getAllExcercies = function (req, res) {
  var workouts = mongoose.model('Exercise')
  var query = workouts.find({});
  query.exec(function(err, workouts){
      if(err){
          console.log("Error occoured: " + err.message);
          return;
      }
      res.status(200).json({
        workouts
      })
  })
};