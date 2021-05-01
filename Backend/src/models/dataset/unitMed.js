const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const unitMedSchema = new mongoose.Schema({
    _id : {
        type: Number
    },
    description : {
        type: String
    }
});

module.exports = mongoose.model('unitMed', unitMedSchema, 'unitMed');