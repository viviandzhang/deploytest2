//import node modules
const mongoose = require('mongoose');


//define a schema
const UserModelSchema = new Mongoose.Schema({
    name        : String,
    googleid    : String,
    color       : String, 
}); 


//compile a model from schema
module.exports = mongoose.model('DilemmaModel', DilemmaModelSchema); 