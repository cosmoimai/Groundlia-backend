const express = require("express");
require("./db/mongoose");
const User = require("./models/users")
const userrouter = require("./router/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userrouter);

// app.get("/",async (req,res) =>{
//     console.log("hello");
//     res.send("hello from the /");

// })

// app.get("/organisers", async (req,res) => {
//     const user = new User(req.body);
//     console.log(req.body);

//     try {

//         await user.save();
//         res.status(201).send("prefectly submitted");
//     } catch (e){
//         res.status(400).send(e);
//     }
// })

app.listen(port, () => {
  console.log("server is on port " + port);
});
