const express = require("express");
const Scoreresults = require("../models/Scoreresults")
const Cricket_Results = require("../models/Cricket_Results")
const badminton_profile = require("../models/badminton_profile");
const badminton_results = require("../models/badminton_results");
const User = require("../models/users");
const livebadmintonmatch = require("../models/livebadmintonmatch");
const { get } = require("mongoose");
const { update } = require("../models/users");
const livebadmintonresults = require("../models/livebadmintonresults");
const router = new express.Router();

router.post("/badminton/singles/result", async (req,res) =>{
    console.log(req.body);

    const username1 = req.body.username1;
    const username2 = req.body.username2;
    const points1 = req.body.points1;
    const points2 = req.body.points2;

    const player1 = await badminton_profile.findOne({username: req.body.username1})
    const player2 = await badminton_profile.findOne({username: req.body.username2})

    player1.Singles.Matches++;
    player2.Singles.Matches++;

    let winner

    if(points1>points2)
    {
        player1.Singles.Won++;
        winner = username1
    }
    else{
        player2.Singles.Won++;
        winner = username2
    }

    player1.save().then(()=>{
        console.log(player1);
    }).catch((err)=>{
        console.log(err);
        console.log("Something went wrong try again")
    })

    player2.save().then(()=>{
        console.log(player2);
    }).catch((err)=>{
        console.log(err);
        console.log("Something went wrong try again")
    })

    var d = new Date();

    const currentmatch = new badminton_results({
        Held_on: `${d.getDate()} ${d.getMonth()} ${d.getFullYear()} time ${d.getHours()}:${d.getMinutes()}`,
        Username1: `${username1}`,
        Username2: `${username2}`,
        Won: `${winner}`
    })
    currentmatch.save().then(()=>{
        console.log(currentmatch);
    }).catch((err)=>{
        console.log(err);
        console.log("You have entered email address that is already present.please enter another email address")
    })

    return res.send({msg: "success"});
})

router.post("/badminton/register", async (req,res) => {

    const newplayer = new badminton_profile({
        username: req.body.username,
        Singles: { Won: 0, Matches: 0, },
        Doubles: { Won: 0, Matches: 0, },
    })
    
    newplayer.save().then(()=>{
        console.log(newplayer);
    }).catch((err)=>{
        console.log(err);
        console.log("please try with different username");
        res.status(400).send({msg: "try different username"});
    })

    return res.status(200).send({msg: "success"})
})

router.post("/badminton/doubles/result", async (req,res) =>{
    console.log(req.body);

    const username1 = req.body.username1;
    const username2 = req.body.username2;
    const username3 = req.body.username3;
    const username4 = req.body.username4;
    const points1 = req.body.points1;
    const points2 = req.body.points2;

    const player1 = await badminton_profile.findOne({username: req.body.username1});
    const player2 = await badminton_profile.findOne({username: req.body.username2});
    const player3 = await badminton_profile.findOne({username: req.body.username3});
    const player4 = await badminton_profile.findOne({username: req.body.username4});

    player1.Singles.Matches++;
    player2.Singles.Matches++;
    player3.Singles.Matches++;
    player4.Singles.Matches++;

    let winner

    if(points1>points2)
    {
        player1.Singles.Won++;
        player2.Singles.Won++;
        winner = `${username1} ${username2}`
    }
    else{
        player3.Singles.Won++;
        player4.Singles.Won++;
        winner = `${username3} ${username4}`
    }

    player1.save().then(()=>{
        console.log(player1);
    }).catch((err)=>{
        console.log(err);
        console.log("Something went wrong try again")
    })

    player2.save().then(()=>{
        console.log(player2);
    }).catch((err)=>{
        console.log(err);
        console.log("Something went wrong try again")
    })

    player3.save().then(()=>{
        console.log(player3);
    }).catch((err)=>{
        console.log(err);
        console.log("Something went wrong try again")
    })

    player4.save().then(()=>{
        console.log(player4);
    }).catch((err)=>{
        console.log(err);
        console.log("Something went wrong try again")
    })

    var d = new Date();

    const currentmatch = new badminton_results({
        Held_on: `${d.getDate()} ${d.getMonth()} ${d.getFullYear()} time ${d.getHours()}:${d.getMinutes()}`,
        Username1: `${username1} ${username2}`,
        Username2: `${username3} ${username4}`,
        Won: `${winner}`
    })

    currentmatch.save().then(()=>{
        console.log(currentmatch);
    }).catch((err)=>{
        console.log(err);
        console.log("You have entered email address that is already present.please enter another email address")
    })

    return res.send({msg: "success"});
})

router.get("/badminton/getresult", async (req,res) => {
    console.log(req.body)

    const allresults = await badminton_results.find();
    res.status(200).send(allresults);
} )

router.delete("/badminton/deleteprofile", async (req,res) => {
    console.log(req.body);

    const deleteaccount = await badminton_profile.findOneAndDelete({username: req.body.username}).then((err,done)=> {
        if(err)
        {
            return res.status(404).send({msg: "fail"})
        }
        console.log({msg: "success"})
        console.log(done);
        return res.status(200).send({msg: "success"})
    }).catch((e)=> {
        console.log(e);
        return res.status(400).send({msg: "fail"})
    })
})

router.get("/badminton/:code", async (req,res) =>{
    //console.log("hello from /Getresult/cricket")
    //console.log(req.params['Slot']);

    const orgmember = await livebadmintonmatch.findOne({organisercode: req.params['code']});

    const volmember = await livebadmintonmatch.findOne({vollentiercode: req.params['code']});
    const watmember = await livebadmintonmatch.findOne({watchercode: req.params['code']});

    
    if(req.params['code']==null)
    {
        return res.status(404).send({
            msg: "Enter the code"
        })
    }
    else{
        if(orgmember!==null){
            console.log("hello");
            console.log(orgmember);
            return res.status(200).send({data: orgmember, msg: "Success", role: "Organiser"})
        }
        else if(volmember!==null){
            console.log(volmember)
            return res.status(200).send({data: volmember, msg: "Success", role: "Volnteer"})
        }else if (watmember!==null){
            console.log(watmember)
            return res.status(200).send({data: watmember, msg: "Success", role: "Watcher"})
        }
        else{
            return res.status(404).send({ msg: "Fali"})
        }
        //console.log("here i am") 
    }
    
})

router.post("/badminton/update/:code/:winner/:new", async (req,res)=> {

    const orgmember = await livebadmintonmatch.findOne({organisercode: req.params['code']});
    if(orgmember===undefined||orgmember===null)
    {
        return res.status(400).send({msg: "Enter the corect code"});
    }

    
    let A =[]
    A = req.body.Team_A.Members 
    orgmember.Team_A.Members = A
    orgmember.Team_A.Score = req.body.Team_A.Score

    let B = []
    B = req.body.Team_B.Members
    orgmember.Team_B.Members = B
    orgmember.Team_B.Score = req.body.Team_B.Score

    orgmember.winner = req.params['winner']
    orgmember.new = req.params['new']
    console.log(orgmember);
    
    try{
        await livebadmintonmatch.updateOne({organisercode: req.params['code']}, {
            $set: {
                "Team_A.Members": A,
                "Team_A.Score":  req.body.Team_A.Score,
                "Team_B.Members": B,
                "Team_B.Score":  req.body.Team_B.Score,
                "winner": req.params['winner'],
                "new": req.params['new']
            }
        })
    }catch(e){
        return res.staus(400).send({msg: "Fail"});
    }


    return res.status(200).send(orgmember);
})

router.get("/badminton/endresult/:code", async (req,res)=> {
    console.log(req.params['code'])
    const cd=req.params['code']
    const getresult = await livebadmintonmatch.findOne({organisercode: cd});
    
    //console.log(getresult);
    let winner

    let num1 = getresult.Team_A.Score;
    let num2 = getresult.Team_B.Score;

    if(num1 > num2){
        winner = "Team 1"
    }else if(num1 < num2){
        winner = "Team 2"
    }else{
        winner = "draw"
    }

    console.log("hello");

    var d = new Date();

    const sendresult = new livebadmintonresults({
        organisercode: getresult.organisercode,
        vollentiercode: getresult.vollentiercode,
        watchercode: getresult.watchercode,
        winner: winner,
        "Team_A.Members": getresult.Team_A.Members,
        "Team_A.Score": getresult.Team_A.Score,
        "Team_B.Members": getresult.Team_B.Members,
        "Team_B.Score": getresult.Team_B.Score,
        Date: `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} Time: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    })

    console.log(sendresult);

    // const x = await livebadmintonmatch.updateOne({organisercode: req.params['code']}, {
    //     $set: {
    //         "Team_A.Members": [],
    //         "Team_A.Score":  0,
    //         "Team_B.Members": [],
    //         "Team_B.Score":  0,
    //         "winner": winner,
    //         "new": "no",
    //     }
    // })

    //console.log(x);

    try{
        await sendresult.save();
        res.status(200).send(winner);
    }catch(e){
        console.log("error");
        res.status(400).send({msg: "fail"});
    }
})



module.exports = router;