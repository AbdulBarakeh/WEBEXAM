const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    grade: Number
});

mongoose.model('Student', studentSchema);