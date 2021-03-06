const mongoose = require('mongoose');
const {Schema} = mongoose;
const userSchema = new Schema({
    
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    } 
    
},{versionKey: false})

module.exports = mongoose.model('User', userSchema);