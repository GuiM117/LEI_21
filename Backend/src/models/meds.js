const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const medsSchema = new mongoose.Schema({
    _id: {
        type: ObjectID,
        auto: true
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    medType:{
        type: String
    }
});

module.exports = mongoose.model('meds', medsSchema, 'meds');
