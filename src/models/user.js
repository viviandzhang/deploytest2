//import node modules
const mongoose = require('mongoose');


//define a schema
const UserModelSchema = new mongoose.Schema({
    name        : String,
    googleid    : String,
    adjective   : String, 
    color       : String, 
<<<<<<< HEAD
    //add String array of Strings of "liked comments"

=======
    adjective   : String,
    liked_comments : Array,
>>>>>>> 09eb324eb4b04cbefb86c24003c1f2578dca46e4
}); 


//compile a model from schema
module.exports = mongoose.model('UserModel', UserModelSchema); 