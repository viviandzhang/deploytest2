const mongoose = require('mongoose');
require('dotenv').config();

// set up mongoDB connection
const mongoURL = process.env.ATLAS_SRV; //'mongodb+srv://admin:admin@cluster0-ggqro.mongodb.net/test?retryWrites=true';
const options = {
    useNewUrlParser: true,
};
mongoose.connect(mongoURL, options);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// db error handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function() { console.log('database connected!'); });