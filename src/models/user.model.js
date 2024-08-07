const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type:String,trim:true,unique:[true,"Username is already in used"]},
    password:{type:String,trim:true,unique:true}
});

module.exports = mongoose.model('users',userSchema);