const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    _id: {
        type: ObjectID,
        auto: true
    },
    patientNumber : {
        type: Number,
        required : true
    },
    doctorID: {
        type:ObjectID,
        required: true
    },
    entryID : {
        type: [ObjectID],
        required: true
    }
});

module.exports = mongoose.model('prescription', prescriptionSchema, 'prescription');