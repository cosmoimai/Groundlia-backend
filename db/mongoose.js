const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb+srv://abhishekbhaware:abhishekbhaware@groundlia-organiser.fnt6r.mongodb.net/groundlia-organiser?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});