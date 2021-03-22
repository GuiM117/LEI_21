const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    _id: {
        type: ObjectID,
        auto: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    name:{
        type: String
    },
    sex:{
        type: String
    },
    role: {
        type: String
    },
    birth_date:{
        type: String
    }
});

module.exports = mongoose.model('MedsDB', usersSchema, 'users');