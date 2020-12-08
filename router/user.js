const express = require("express");
const User = require("../models/users")
const router = new express.Router();

router.get("/", async (req,res)=>{
    console.log("hello");
    res.send("hello from the /");
})

router.get("/organisers", async (req,res) => {
    const user = new User(req.body);
    console.log(req.body);

    try {

        await user.save();
        res.status(201).send("prefectly submitted");
    } catch (e){
        res.status(400).send(e);
    }
})

module.exports = router;