const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    _id: {
        type: ObjectID,
        auto: true
    },
    email: {
        type: String,
        match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, 'Please fill a valid email address'],
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String
    },
    role: {
        type: String,
        enum: [ "User", "Admin"],
        default: "User",
        required: true
    },
});

module.exports = mongoose.model('users', usersSchema, 'users');