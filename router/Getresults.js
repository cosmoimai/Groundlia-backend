const express = require("express");
const Scoreresults = require("../models/Scoreresults")
const Cricket_Results = require("../models/Cricket_Results")
const router = new express.Router();

router.get("/Getresult/cricket/:Slot", async (req,res) =>{
    //console.log("hello from /Getresult/cricket")
    //console.log(req.params['Slot']);

    if(req.params['Slot']==null)
    {
        return res.send( await Cricket_Results.find() );
    }
    else{
        //console.log("here i am")
        return res.send( await Cricket_Results.find({Slot: req.params['Slot']}))
    }
    
})

module.exports = router;