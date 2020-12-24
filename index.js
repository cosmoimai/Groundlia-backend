const express = require("express");
require("./db/mongoose");
const User = require("./models/users")
const userrouter = require("./router/user");
const Ongoing_match = require("./router/Ongoing_match");
const Scoreresult = require("./models/Scoreresults");
const Players_record = require("./models/Players_record");
const Getresult = require("./router/Getresults");
const badminton_router = require("./router/badminton_router");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userrouter);
app.use(Ongoing_match);
app.use(Getresult);
app.use(badminton_router);
// app.post("")

app.listen(port, () => {
  console.log("server is on port " + port);
});
