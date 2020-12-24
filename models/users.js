const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model('User',{
    name:{
        type: String,
        trim: true,
        required: true,
        unique: true,  
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
    location: {
        type: String,
        trim: true,
        required: true,
    },
    organisercode: {
        type: String,
        trim: true,
        required: true,
        unique: true,  
    },
    volunteercode:{
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
})

// const me = new User({
//     name: "Andrew",
//     email: "abhishek.jee2019@gmail.com",
//     location: "nanhe khana",
//     organisercode: "abcd",
//     vollentiercode: "abcd",
//     watchercode: "abcd",
// })

// me.save().then(()=>{
//     console.log(me);
// }).catch((err)=>{
//     console.log(err);
//     console.log("You have entered email address that is already present.please enter another email address")
// })
//console.log("ashu");

module.exports = User;