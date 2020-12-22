const mongoose = require("mongoose");
const validator = require("validator");

const badminton_results = mongoose.model('badminton_results',{
    Held_on: {
        type: String,
        trim: true,
    },
    Username1: {
        type: String,
        trim: true,
    },
    Username2: {
        type: String,
        trim: true,
    },
    Won: {
        type: String,
        trim: true,
    },

})

module.exports = badminton_results;