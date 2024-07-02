const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    name: {type: String, required: true },
    author: {type: String, required: true},
    date: {type: Date, required: true},
    price: {type: String, required: true},
    isDeleted: {type: Boolean,default:false},
    addedBy: {type: Number}

});


module.exports = mongoose.model('Book', bookSchema);