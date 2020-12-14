const mongoose = require("mongoose");
const validator = require("validator");

const Cricket_Results = mongoose.model('Cricket_Results',{
    Result:{
        type: String,
        trim: true,
        required: true,
        unique: true,  
    },
    Toss: {
        type: String,
        trim: true,
        
    }
})


module.exports = Cricket_Results;