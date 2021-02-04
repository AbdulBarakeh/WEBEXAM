const mongoose = require('mongoose');
// const connectionString = 'mongodb+srv://johannes:n3zxcAsDzYRpJ1WK@cluster0.hf5fw.azure.mongodb.net/test';
const connectionString = 'mongodb://localhost:27017/test';
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
