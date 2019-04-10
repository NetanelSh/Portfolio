const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setStringType = (maxlength) => {
    return { type: String, required: true, maxlength: maxlength }
};

const workScheme = new Schema({
    userId: setStringType(512),
    title: setStringType(256),
    url: setStringType(256),
    gitUrl: setStringType(128),
    imageLink: setStringType(256),
    description: setStringType(2048),
});

module.exports = mongoose.model('Work', workScheme);