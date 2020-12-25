const mongoose = require("mongoose");
const validator = require("validator");

const livecricketscore = mongoose.model('livecricketscore',{
    organisercode: {
        type: String,
        trim: true,
        required: true,
        unique: true,  
    },
    vollentiercode:{
        type: String,
        trim: true,
        required: true,
        unique: true,  
    },
    watchercode:{
        type: String,
        trim: true,
        required: true,
        unique: true,  
    },
    winner: {
        type: String,
        trim: true
    },
    new: {
        type: String,
        trim: true,
    },
    Team_A: {
        Members: {
            type: [String],
            trim: true
        },
        Runs: {
            type: Number,
            trim: true
        },
        Wickets: {
            type: Number,
            trim: true,
        }
    },
    Team_B: {
        Members: {
            type: [String],
            trim: true
        },
        Runs: {
            type: Number,
            trim: true,
        },
        Wickets: {
            type: Number,
            trim: true,
        }
    }
    

})

module.exports = livecricketscore;