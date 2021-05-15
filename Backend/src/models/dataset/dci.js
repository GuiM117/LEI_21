const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const dciSchema = new mongoose.Schema({
    _id : {
        type: Number
    },
    description : {
        type: String
    }
});

module.exports = mongoose.model('dci', dciSchema, 'dci');