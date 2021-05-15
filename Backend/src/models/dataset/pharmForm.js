const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const pharmFormSchema = new mongoose.Schema({
    _id : {
        type: Number
    },
    description : {
        type: String
    }
});

module.exports = mongoose.model('pharmForm', pharmFormSchema, 'pharmForm');