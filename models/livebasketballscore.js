const mongoose = require("mongoose");
const validator = require("validator");

const livebasketballscore = mongoose.model('livebasketballscore',{
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
    new: {
        type: String,
        trim: true,
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