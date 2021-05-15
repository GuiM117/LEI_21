const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const viaAdminSchema = new mongoose.Schema({
    _id : {
        type: Number
    },
    description : {
        type: String
    }
});

module.exports = mongoose.model('viaAdmin', viaAdminSchema, 'viaAdmin');