const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const pacientSchema = new mongoose.Schema({
    _id: {
        type: ObjectID,
        auto: true
    },
    email: {
        type: String,
        match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, 'Please fill a valid email address'],
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

module.exports = mongoose.model('patients', pacientSchema, 'patients');