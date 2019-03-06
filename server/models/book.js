const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookScheme = new Schema({
    title: String,
    author: String,
    pages: Number,
    price: Number
});

module.exports = mongoose.model('Book', bookScheme);