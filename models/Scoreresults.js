const mongoose = require("mongoose");
const validator = require("validator");

const Scoreresults = mongoose.model('ScoreResults',{
    Organiser:{
        type: String,
        trim: true,
        required: true,
    },
    Location: {
        type: String,
        required: true,
        trim: true,
    },
    Slot: {
        type: Number,
        required: true,
        unique: true,
    },
    Game: {
        WhoWinToss: {
            type: String,
            trim: true,
        },
        Winner: {
            type: String,
            trim: true,
        },
        Total_Over: {
            type: Number,
            trim: true,
        },
        Team_A: {
            Mode: {
                type: String,
                trim: true,
            },
            Score: {
                type: Number,
                trim: true,
            },
            Wicket: {
                type: Number,
                trim: true,
            },
            Current_balls: {
                type: Number,
                trim: true,
            },
            Current_Over: {
                type: Number,
                trim: true,
            },
            Captain: {
            type: String,
            trim: true,
            }
        },
        Team_B: {
            Mode: {
                type: String,
                trim: true,
            },
            Score: {
                type: Number,
                trim: true,
            },
            Wicket: {
                type: Number,
                trim: true,
            },
            Current_balls: {
                type: Number,
                trim: true,
            },
            Current_Over: {
                type: Number,
                trim: true,
            },
            Captain: {
            type: String,
            trim: true,
            }
        }
    }
})

// const me = new Scoreresults({
//     Organiser: "IIIC",
//     Location: "IIITA pavilion",
//     Total_match: 60,
// })

// me.save().then(()=>{
//     console.log(me);
// }).catch((err)=>{
//     console.log("FUCK")
// })

// const me = new Scoreresults({
//     Organiser: "IITK",
//     Location: "IITK pavalion",
//     Slot: 11,
//     Game: {
//         WhoWinToss: "A",
//         Winner: "progress",
//         Total_Over: 10,
//         Team1: {
//             Mode: "Bowling",
//             Score: 113,
//             Wicket: 1,
//             Current_Over: 8,
//             Captain: "nn",
//         },
//         Team2: {
//             Mode: "Batting",
//             Score: 101,
//             Wicket: 5,
//             Current_Over: 9,
//             Captain: "mm",
//         }
//     },
// })

// me.save().then(()=>{
//     console.log(me);
// }).catch((err)=>{
//     console.log("FUCK")
// })

module.exports = Scoreresults;