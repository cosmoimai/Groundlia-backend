const mongoose = require("mongoose");
const validator = require("validator");

const livebadmintonresults = mongoose.model('livebadmintonresults',{
    organisercode: {
        type: String,
        trim: true,  
    },
    vollentiercode:{
        type: String,
        trim: true,  
    },
    watchercode:{
        type: String,
        trim: true,  
    },
    winner: {
        type: String,
        trim: true
    },
    Team_A: {
        Members: {
            type: [String],
            trim: true
        },
        Score: {
            type: Number,
            trim: true
        }
    },
    Team_B: {
        Members: {
            type: [String],
            trim: true
        },
        Score: {
            type: Number,
            trim: true,
        }
    },
    Date: {
        type: String,
        trim: true
    }   
})

module.exports = livebadmintonresults;