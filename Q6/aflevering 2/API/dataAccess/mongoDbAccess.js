const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://abduldb:abduldb123@cluster0.zfzf3.mongodb.net/test';
// const connectionString = 'mongodb://localhost:27017/test';

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

// Event messages:
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected`);
    });
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
    });
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
    });
mongoose.model
module.exports = mongoose;
