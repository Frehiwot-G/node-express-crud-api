const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

mongoose
  .connect(
    "mongodb+srv://frehiwotgem:Y6ywteQyHNeF7m7E@cluster0.tmon6bh.mongodb.net/node-api?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to the database");
    app.listen(3000, () => {
      console.log("server is running");
    });
  })
  .catch(() => {
    console.log("not connected to the database");
  });
