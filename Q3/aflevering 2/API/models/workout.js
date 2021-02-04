const mongoose = require('mongoose');
var model = require('../models/exercise')
const schema = new mongoose.Schema({ Name: 'string', UserId: mongoose.Schema.Types.ObjectId, Exercises: [model.schema]});
const Workout = mongoose.model('Workout', schema);

module.exports = {
    schema,
    Workout
}