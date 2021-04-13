const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    _id: {
        type: ObjectID,
        auto: true
    },
    med : {
        type: ObjectID,
        required: true
    },
    initDate : {
        type: Date,
        required: true
    },
    endDate : {
        type: Date,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    dosagePerDay : {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('entry', entrySchema, 'entry');