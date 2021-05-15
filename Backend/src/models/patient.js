const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientNumber: {
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        enum: ["M","F","other"],
        required: true
    },
    birth_date:{
        type: Date,
        required: true
    },
    episode_number:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('patient', patientSchema, 'patient');