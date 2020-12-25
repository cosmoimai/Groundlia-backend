const express = require("express");
const livebasketballresult = require("../models/livebasketballresult");
const router = new express.Router();
const livebasketballscore = require("../models/livebasketballscore");

router.get("/basketball/:code", async (req,res) =>{

    const orgmember = await livebasketballscore.findOne({organisercode: req.params['code']});

    const volmember = await livebasketballscore.findOne({vollentiercode: req.params['code']});
    const watmember = await livebasketballscore.findOne({watchercode: req.params['code']});

    
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

router.post("/basketball/update/:code/:winner/:new", async (req,res)=> {

    const orgmember = await livebasketballscore.findOne({organisercode: req.params['code']});
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
        await livebasketballscore.updateOne({organisercode: req.params['code']}, {
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

router.get("/basketball/endresult/:code", async (req,res)=> {
    const getresult = livebasketballscore.find({organisercode: req.params['code']});
    
    let winner
    if(getresult.Team_A.Score>getresult.Team_A.Score){
        winner = JSON.stringify(getresult.Team_A.Members)
    }else if(getresult.Team_A.Score<getresult.Team_A.Score){
        winner = JSON.stringify(getresult.Team_B.Members); 
    }else{
        winner = "draw"
    }

    var d = new Date();

    const sendresult = new livebasketballresult({
        organisercode: getresult.organisercode,
        vollentiercode: getresult.vollentiercode,
        watchercode: getresult.watchercode,
        winner: winner,
        Team_A: getresult.Team_A,
        Team_B: getresult.Team_B,
        Date: `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} Time: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    })

    await livebasketballscore.updateOne({organisercode: req.params['code']}, {
        $set: {
            "Team_A.Members": [],
            "Team_A.Score":  0,
            "Team_B.Members": [],
            "Team_B.Score":  0,
            "winner": "no",
            "new": "no",
        }
    })

    try{
        await sendresult.save();
        res.status(200).send(sendresult);
    }catch(e){
        console.log("error");
        res.status(400).send({msg: "fail"});
    }
})

module.exports = router;
