// import node modules
const mongoose = require('mongoose');

// define a schema
const StoryModelSchema = new mongoose.Schema ({
    creator_id      : String,
    creator_name    : String,
    timestamp       : Date,
    categories      : Array,
    title           : String,
    body            : String,
    active          : Boolean,
    votes_yes       : Number,
    votes_no        : Number,
});

// compile model from schema
module.exports = mongoose.model('DilemmaModel', DilemmaModelSchema)