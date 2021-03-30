const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    _id: {
        type: ObjectID,
        auto: true
    },
    patient : {
        type: ObjectID,
        required : true
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

module.exports = mongoose.model('prescription', prescriptionSchema, 'prescription');