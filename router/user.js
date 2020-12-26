const express = require("express");
const User = require("../models/users")
const router = new express.Router();
var generator = require('generate-password');
const livebadmintonmatch = require("../models/livebadmintonmatch");
const livebasketballscore = require("../models/livebasketballscore");
const livecricketscore = require("../models/livecricketscore");

router.get("/", async (req,res)=>{
    console.log("hello");
    res.send("hello from the /");
})

router.get("/organisers/:name/:email/:location", async (req,res) => {

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

    const user = new User({
        name: req.params['name'],
        email: req.params['email'],
        location: req.params['location'],
        organisercode: orgcode,
        vollentiercode: volcode,
        watchercode: watcode,
    });

    let bad_match = new livebadmintonmatch({
        organisercode: orgcode,
        vollentiercode: volcode,
        watchercode: watcode,
        winner: "no",
        new: "yes",
        Team_A: {
            Members: [],
            Score: 0,
        },
        Team_B: {
            Members: [],
            Score: 0,
        }
    })

    let bas_match = new livebasketballscore({
        organisercode: orgcode,
        vollentiercode: volcode,
        watchercode: watcode,
        winner: "no",
        new: "yes",
        Team_A: {
            Members: [],
            Score: 0,
        },
        Team_B: {
            Members: [],
            Score: 0,
        }
    })

    let cri_match = new livecricketscore({
        organisercode: orgcode,
        vollentiercode: volcode,
        watchercode: watcode,
        winner: "no",
        new: "yes",
        overs: "0",
        Team_A: {
            Members: [],
            Runs: 0,
            Wickets: 0,
            Mode: "Toss",
        },
        Team_B: {
            Members: [],
            Runs: 0,
            Wickets: 0,
            Mode: "Toss",
        }
    })

    try{
        console.log("hello");
        await bad_match.save().then((err,done)=>{
            if(err)
            {
                console.log("error",err)
            }
            console.log("done",done)
        });
        console.log("Bad")
    } catch(e){
        return res.status(400).send({msg: "Fail"});
    }

    try{
        await bas_match.save().then((err,done)=>{
            if(err)
            {
                console.log("error",err)
            }
            console.log("done",done)
        });
        console.log("bas");
    } catch(e){
        return res.status(400).send(e);
    }

    try{
        await cri_match.save().then((err,done)=>{
            if(err)
            {
                console.log("error",err)
            }
            console.log("done",done)
        });
        console.log("cri");
    } catch(e){
        return res.status(400).send(e);
    }


    try {

        await user.save().then((err,done)=>{
            if(err)
            {
                console.log("error",err)
            }
            console.log("here",done)
        });
        return res.status(201).send({  
        msg: "Success",  
        organisercode: orgcode,
        vollentiercode: volcode,
        watchercode: watcode
        });
    } catch (e){
        return res.status(400).send(e);
    }
})

router.get("/mainpage/:code", async (req,res)=>{
    console.log(req.body);

    const orgmember = await User.findOne({organisercode: req.params['code']});
    const volmember = await User.findOne({vollentiercode: req.params['code']});
    const watmember = await User.findOne({watchercode: req.params['code']});
    
    console.log(orgmember);
    if(orgmember!==null)
    {
        try{
            res.status(201).send({
                orgmember: orgmember,
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
                orgmember: volmember,
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
                orgmember: watmember,
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