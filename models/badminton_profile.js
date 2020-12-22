const mongoose = require("mongoose");
const validator = require("validator");

const badminton_profile = mongoose.model('badminton_profile',{
    username: {
        type: String,
        trim: true,
    },
    Singles: {
        Won: {
            type: Number
        },
        Matches: {
            type: Number
        }
    },
    Doubles: {
        Won: {
            type: Number
        },
        Matches: {
            type: Number
        }
    }

})

module.exports = badminton_profile;