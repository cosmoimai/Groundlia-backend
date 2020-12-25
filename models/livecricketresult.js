const mongoose = require("mongoose");
const validator = require("validator");

const livecricketresult = mongoose.model('livecricketresult',{
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
        Runs: {
            type: Number,
            trim: true
        },
        Wickets: {
            type: Number,
            trim: true,
        },
    },
    Team_B: {
        Runs: {
            type: Number,
            trim: true,
        },
        Wickets: {
            type: Number,
            trim: true,
        },
    }
})

module.exports = livecricketresult;