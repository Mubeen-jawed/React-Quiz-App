const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1/quizDataDB',
  {
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;

function dbSetup(params) {
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });
}

module.exports = dbSetup