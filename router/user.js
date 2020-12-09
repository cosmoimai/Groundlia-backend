const express = require("express");
const User = require("../models/users")
const router = new express.Router();
var generator = require('generate-password');

router.get("/", async (req,res)=>{
    console.log("hello");
    res.send("hello from the /");
})

router.get("/organisers", async (req,res) => {

    var orgcode = generator.generate({
        length: 6,
        numbers: true
    });
    var volcode = generator.generate({
        length: 6,
        numbers: true
    }); 
    var watcode = generator.generate({
        length: 6,
        numbers: true
    });

    console.log
    const user = new User({
        ...req.body,
        organisercode: orgcode,
        vollentiercode: volcode,
        watchercode: watcode,
    });

    try {
        await user.save();
        res.status(201).send({    
        organisercode: orgcode,
        vollentiercode: volcode,
        watchercode: watcode
        });
    } catch (e){
        res.status(400).send(e);
    }
})

router.post("/mainpage", async (req,res)=>{
    console.log(req.body);

    const orgmember = await User.findOne({organisercode: req.body.code});
    const volmember = await User.findOne({vollentiercode: req.body.code});
    const watmember = await User.findOne({watchercode: req.body.code});
    
    console.log(orgmember);
    if(orgmember!==null)
    {
        try{
            res.status(201).send({
                orgmember: orgmember.name,
                location: orgmember.location,
                identity: "Organiser",
            });
        }
        catch (e){
            res.status(400).send(e);
        }
    }
    else if(volmember!==null)
    {
        try{
            res.status(201).send({
                orgmember: volmember.name,
                location: volmember.location,
                identity: "Volunteer",
            });
        }
        catch (e){
            res.status(400).send(e);
        }
    }
    else if(watmember!==null)
    {
        try{
            res.status(201).send({
                orgmember: watmember.name,
                location: watmember.location,
                identity: "Watcher",
            });
        }
        catch (e){
            res.status(400).send(e);
        }
    }
    else
    {
        try{
            res.status(404).send({
                orgmember: "Wrong code",
                location: "NULL",
                identity: "UNDEFINED",
            });
        }
        catch (e){
            res.status(400).send(e);
        }
    }
    console.log(volmember);
    console.log(watmember);

    try{
        res.status(201).send("i am comming here");
    }
    catch (e){
        res.status(400).send(e);
    }
})

module.exports = router;