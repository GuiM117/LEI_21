const mongoose = require('mongoose')

const interactionsSchema = new mongoose.Schema({
    chnm1 : {
        type: Number
    },
    chnm2 : {
        type: Number
    },
    descriptionFull : {
        type: String
    },
});

module.exports = mongoose.model('interactions', interactionsSchema, 'interactions');