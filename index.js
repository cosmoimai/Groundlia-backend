const express = require("express");
require("./db/mongoose");
const User = require("./models/users")
const userrouter = require("./router/user");
const Scoreresult = require("./models/Scoreresults");
const Players_record = require("./models/Players_record");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userrouter);

// app.post("")

app.listen(port, () => {
  console.log("server is on port " + port);
});
