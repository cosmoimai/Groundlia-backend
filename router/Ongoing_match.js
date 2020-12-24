const express = require("express");
const Scoreresults = require("../models/Scoreresults")
const Cricket_Results = require("../models/Cricket_Results")
const router = new express.Router();

router.post("/updatescore", async (req,res)=>{

    const current_match = await Scoreresults.findOne({Slot: req.body.Slot}, (error,match)=>{
        if(error){
            return res.status(400).send(error);
        }
    })

    if(current_match==undefined|| current_match===null)
    {
        res.status(201).send({message: "Not Getting"});
    }
    else
    {
        if(req.body.Batting==="Team1")
        {
            console.log("hello");
            const up = await Scoreresults.updateOne({_id: current_match._id}, {

                $inc: {
                    "Game.Team2.Current_Over": 1,
                    "Game.Team1.Score": req.body.Increase_Runs
                }

            }).then((result)=> {
                return res.status(200).send(result)
                //console.log(result)
            }).catch((error)=> {
                return res.status(404).send(error);
                //console.log(error)
            })
        }
        else if(req.body.Batting==="Team2") {
            const up = await Scoreresults.updateOne({_id: current_match._id}, {

                $inc: {
                    "Game.Team1.Current_Over": 1,
                    "Game.Team2.Score": req.body.Increase_Runs
                }

            }).then((result)=> {
                return res.status(200).send(result)
                //console.log(result)
            }).catch((error)=> {
                return res.status(404).send(error);
                //console.log(error)
            })
        }
        
    }
})

router.post("/endmatch", async (req,res)=>{

    console.log(req.body)

    const up = await Scoreresults.findOneAndDelete({Slot: req.body.Slot})

    let winner = ( req.body.Team_A.Runs>req.body.Team_B.Runs ? "Team A" : "Team B")
    let margin = ( req.body.Team_A.Runs>req.body.Team_B.Runs ? (req.body.Team_A.Runs-req.body.Team_B.Runs) : (req.body.Team_B.Runs-req.body.Team_A.Runs) )
    let d = new Date();


    const new_updpt = new Cricket_Results({
        Held_on: `${d.getDate()} ${d.getMonth()} ${d.getFullYear()}`,
        Slot: req.body.Slot,
        Result: req.body.Result,
        Toss: req.body.Toss,
        Team_A: {
            Runs: req.body.Team_A.Runs,
            Overs: req.body.Team_A.Over,
        },
        Team_B: {
            Runs: req.body.Team_B.Runs,
            Overs: req.body.Team_B.Over,
        }
    }) 

    new_updpt.save().then(() =>{
        console.log(new_updpt)
        res.status(200).send(new_updpt);
    }).catch((e) =>{
        console.log(e);
        res.status(400).send(e);
    })
 
    
})

router.post("/startmatch", async (req,res)=>{

    let empty_slot = 0
    while(1)
    {
        if(await Scoreresults.findOne({Slot: req.body.Slot}))
        {
            empty_slot++;
        }
        else{
                    
            const me = new Scoreresults({
                Organiser: req.body.Organiser,
                Location: req.body.Location,
                Slot: req.body.Slot,
                Game: {
                    WhoWinToss: req.body.WhoWinToss,
                    Winner: "progress",
                    Total_Over: req.body.Total_Over,
                    Team_A: {
                        Mode: req.body.Team_A.Mode,
                        Score: 0,
                        Wicket: 0,
                        Current_balls: 0,
                        Current_Over: 0,
                        Captain: req.body.Team_A.Captain,
                    },
                    Team_B: {
                        Mode: req.body.Team_B.Mode,
                        Score: 0,
                        Wicket: 0,
                        Current_balls: 0,
                        Current_Over: 0,
                        Captain: req.body.Team_B.Captain,
                    }
                },   
            })

            me.save().then(()=>{
                console.log(me);
                return res.status(200).send(me);
            }).catch((err)=>{
                console.log("FUCK")
                return res.status(400).send(err);
            })
            break;
        }
    }
    
})

module.exports = router;