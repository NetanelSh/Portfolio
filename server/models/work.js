const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setStringType = (maxlength) => {
    return { type: String, required: true, maxlength: maxlength }
};

const workScheme = new Schema({
    userId: setStringType(512),
    slug: { type: String, unique: true, sparse: true },
    title: setStringType(256),
    link: { type: String, unique: true },
    gitLink: { type: String, unique: true },
    description: setStringType(2048),
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: String, default: 'In Development' }
});

module.exports = mongoose.model('Work', workScheme);