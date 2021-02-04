const mongoose = require('mongoose');

const schema = new mongoose.Schema({ Name: 'string', Description: 'string', NumberOfSets: 'number', NumberOfReps: 'number'});
const Exercise = mongoose.model('Exercise', schema);

module.exports = {
    schema,
    Exercise
}