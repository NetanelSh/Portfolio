const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioScheme = new Schema({
    userId: String,
    title: String,
    company: String,
    location: String,
    position: String,
    description: String,
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model('Portfolio', portfolioScheme);