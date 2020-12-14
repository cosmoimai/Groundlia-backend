const mongoose = require("mongoose");
const validator = require("validator");

const Scoreresults = mongoose.model('ScoreResults',{
    Organiser:{
        type: String,
        trim: true,
        required: true,
        unique: true,  
    },
    Location: {
        type: String,
        required: true,
        trim: true,
    },
    Total_match: {
        type: Number,
        required: true,
        trim: true,
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
        Team1: {
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
            Current_Over: {
                type: Number,
                trim: true,
            },
            Members: {
            type: String,
            trim: true,
            },
            Captain: {
            type: String,
            trim: true,
            }
        },
        Team2: {
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
            Current_Over: {
                type: Number,
                trim: true,
            },
            Members: {
            type: String,
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

const havetoPush = {
    WhoWinToss: "RCB",
    Winner: "Ongoing",
    Total_Over: 10,
    Score_A: 0,
    wicket_A: 0,
    Team1: {
        Mode: "Batting",
        Score: 160,
        Wicket: 1,
        Current_Over: 13,
        Members: "Sonu Monu Chintu bablu",
        Captain: "bablu"
    },
    Team2: {
        Mode: "Batting",
        Score: 160,
        Wicket: 1,
        Current_Over: 13,
        Members: "Sonu Monu Chintu bablu",
        Captain: "bablu"
    }
}

Scoreresults.findOneAndUpdate({ Organiser: "IIIC" },{ 
    Game: havetoPush,
}, (error,data)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("here is the ")
        console.log(data)
    }
}
);

module.exports = Scoreresults;