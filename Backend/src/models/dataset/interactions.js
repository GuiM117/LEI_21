const mongoose = require('mongoose')

const interactionsSchema = new mongoose.Schema({
    chnm1 : {
        type: Number
    },
    chnm2 : {
        type: Number
    },
    descriptionMed : {
        type: String
    },
    descriptionPharm : {
        type: String
    },
    descriptionEnf : {
        type: String
    },
    descriptionFull : {
        type: String
    },
});

module.exports = mongoose.model('interactions', interactionsSchema, 'interactions');