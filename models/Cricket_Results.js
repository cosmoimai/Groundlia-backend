const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const validator = require("validator");

const Cricket_Results = mongoose.model('Cricket_Results',{
    Held_on: {
        type: String
    },
    Slot: {
        type: Number
    },
    Result:{
        type: String,
        trim: true,
    },
    Toss: {
        type: String,
        trim: true,   
    },
    Team_A: {
        Runs: {
            type: Number,
            trim: true
        },
        Overs:{
            type: Decimal128,
        }
    },
    Team_B: {
        Runs: {
            type: Number,
            trim: true
        },
        Overs:{
            type: Decimal128,
        }
    }
})


module.exports = Cricket_Results;