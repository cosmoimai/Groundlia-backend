const mongoose = require("mongoose");
const validator = require("validator");

const Playersrecord = mongoose.model('Players_record',{
    username:{
        type: String,
        trim: true,
        required: true,
        unique: true,  
    },
    name:{
        type: String,
        trim: true,
        required: true,  
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },
    Game: {
        Cricket:{
            Role: {
                type: String,
                required: true,
                trim: true,
            },
            Total_Matches: {
                type: Number,
                required: true,
                trim: true,
            },
            Total_Runs: {
                type: Number,
                required: true,
                trim: true,
            },
            Total_wickets: {
                type: Number,
                required: true,
                trim: true
            },
            Best_bowling: {
                type: String,
                required: true,
                trim: true,
            },
            Highest_Runs: {
                type: Number,
                required: true,
                trim: true
            },
            Centuries: {
                type: Number,
                required: true,
                trim: true
            },
            Half_centuries: {
                type: Number,
                required: true,
                trim: true
            }

        }
    },
})

// const me = new User({
//     name: "Andrew",
//     email: "abhishek.jee2019@gmail.com",
//     location: "nanhe randi khana",
// })

// me.save().then(()=>{
//     console.log(me);
// }).catch((err)=>{
//     console.log("You have entered email address that is already present.please enter another email address")
// })


module.exports = Playersrecord;