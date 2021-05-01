const mongoose = require('mongoose');

const activeSubs = new mongoose.Schema({
    chnm: {
        type: Number
    },
    name: {
        type: String
    },
    dcd_ID: {
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
    capacity_unit : {
        type: Number
    },
    administrationForm_IDs : {
        type : [Number]
    }

});

module.exports = mongoose.model('activeSubs', activeSubs, 'activeSubs');