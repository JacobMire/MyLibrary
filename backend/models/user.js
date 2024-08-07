const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    name: {type: String },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['guest', 'admin'], default: 'guest'},
    userId: {type: Number, required: true}
});

userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);