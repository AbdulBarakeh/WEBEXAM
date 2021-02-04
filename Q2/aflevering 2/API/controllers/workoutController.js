const mongoose = require('../dataAccess/mongoDbAccess');
const model = require('../models/exercise');
const modelW = require('../models/workout');
exports.createWorkout = (req, res) => {
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  console.dir('mongoose connected.')
  let workout = new modelW.Workout({ Name: req.body.workoutName, UserId: req.user.id });
  var workouts = modelW.Workout;
  //If doc already exist do not insert again
  workouts.exists({Name:req.body.workoutName,  UserId: req.user.id}, function(err,result){
    if(result){
      res.send("Name already exist")
      return
    }
    else{
      workout.save(function (err) {
        if (err) return handleError(err);
      });
      res.status(200).json({
        workout
      })
    }
  })
}

exports.findALLWorkouts = function (req, res) {
  var workouts = modelW.Workout;
  var query = workouts.find({});
  query.exec(function (err, workouts) {
    if (err) {
      console.log("Error occoured: " + err.message);
      return;
    }
    res.status(200).json({
      workouts
    })
  });
}

exports.findWorkouts = function (req, res) {    
  var workouts = modelW.Workout;
  var query = workouts.find({'UserId':req.user.id});
  query.exec(function (err, workouts) {
    if (err) {
      console.log("Error occoured: " + err.message);
      return;
    }
    res.status(200).json({
      workouts
    })
  });
}
