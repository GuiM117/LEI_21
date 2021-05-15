const mongoose = require('mongoose');

const activeSubstancesSchema = new mongoose.Schema({
    chnm: {
        type: Number
    },
    name: {
        type: String
    },
    dci_ID: {
        type: Number
    },
    farmForm_ID:{
        type: Number
    },
    containerForm_ID:{
      type: Number
    },
    capacity: {
        type: Number
    },
    capacityUnit_ID : {
        type: Number
    },
    administrationForm_IDs : {
        type : [Number]
    }
});

module.exports = mongoose.model('activeSubstances', activeSubstancesSchema, 'activeSubstances');