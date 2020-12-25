const mongoose = require("mongoose");
const validator = require("validator");

const livebasketballscore = mongoose.model('livebasketballscore',{
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
    }
    

})

module.exports = livebasketballscore;