const express = require("express");
const livebasketballresult = require("../models/livebasketballresult");
const router = new express.Router();
const livebasketballscore = require("../models/livebasketballscore");
const livecricketresult = require("../models/livecricketresult");
const livecricketscore = require("../models/livecricketscore");

router.get("/cricket/:code", async (req,res) =>{

    const orgmember = await livecricketscore.findOne({organisercode: req.params['code']});

    const volmember = await livecricketscore.findOne({vollentiercode: req.params['code']});
    const watmember = await livecricketscore.findOne({watchercode: req.params['code']});

    
    if(req.params['code']==null)
    {
        return res.status(404).send({
            msg: "Enter the code"
        })
    }
    else{
        if(orgmember!==null){
            //console.log("hello");
            console.log(orgmember);
            return res.status(200).send({data: orgmember, msg: "Success", role: "Organiser"})
        }
        else if(volmember!==null){
            console.log(volmember);
            return res.status(200).send({data: volmember, msg: "Success", role: "Volnteer"})
        }else if (watmember!==null){
            console.log(watmember);
            return res.status(200).send({data: watmember, msg: "Success", role: "Watcher"})
        }
        else{
            return res.status(404).send({ msg: "Fali"})
        }
        //console.log("here i am") 
    }
    
})

router.post("/cricket/update/:code/:winner/:new", async (req,res)=> {

    const orgmember = await livecricketscore.findOne({organisercode: req.params['code']});
    if(orgmember===undefined||orgmember===null)
    {
        return res.status(400).send({msg: "Enter the corect code"});
    }

    
    let A =[]
    A = req.body.Team_A.Members 
    orgmember.Team_A.Members = A
    orgmember.Team_A.Runs = req.body.Team_A.Runs
    orgmember.Team_A.Wickets = req.body.Team_A.Wickets
    orgmember.Team_A.Mode = req.body.Team_A.Mode 

    let B = []
    B = req.body.Team_B.Members
    orgmember.Team_B.Members = B
    orgmember.Team_B.Runs = req.body.Team_B.Runs
    orgmember.Team_B.Wickets = req.body.Team_B.Wickets
    orgmember.Team_B.Mode = req.body.Team_B.Mode

    orgmember.winner = req.params['winner']
    orgmember.new = req.params['new']
    console.log(orgmember);
    
    try{
        await livecricketscore.updateOne({organisercode: req.params['code']}, {
            $set: {
                "Team_A.Members": A,
                "Team_A.Runs":  req.body.Team_A.Runs,
                "Team_B.Members": B,
                "Team_B.Runs":  req.body.Team_B.Runs,
                "winner": req.params['winner'],
                "new": req.params['new']
            }
        })
    }catch(e){
        return res.staus(400).send({msg: "Fail"});
    }


    return res.status(200).send(orgmember);
})

router.get("/cricket/endresult/:code", async (req,res)=> {
    console.log(req.params['code'])
    const cd=req.params['code']

    const getresult = await livecricketscore.find({organisercode: req.params['code']});
    
    let winner

    let num1 = getresult.Team_A.Runs;
    let num2 = getresult.Team_B.Runs;

    if(num1 > num2){
        winner = "Team 1"
    }else if(num1 < num2){
        winner = "Team 2"
    }else{
        winner = "draw"
    }

    var d = new Date();

    const sendresult = new livecricketresult({
        organisercode: getresult.organisercode,
        vollentiercode: getresult.vollentiercode,
        watchercode: getresult.watchercode,
        winner: winner,
        "Team_A.Winner": getresult.Team_A.Winner,
        "Team_A.Runs": getresult.Team_A.Runs,
        "Team_B.Winner": getresult.Team_B.Winner,
        "Team_B.Runs": getresult.Team_B.Runs,
        Date: `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} Time: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    })

    console.log(sendresult);

    await livecricketscore.updateOne({organisercode: req.params['code']}, {
        $set: {
            "Team_A.Members": [],
            "Team_A.Score":  0,
            "Team_B.Members": [],
            "Team_B.Score":  0,
            "winner": winner,
            "new": "no",
        }
    })

    try{
        await sendresult.save();
        res.status(200).send(winner);
    }catch(e){
        console.log("error");
        res.status(400).send({msg: "fail"});
    }
})

module.exports = router;
