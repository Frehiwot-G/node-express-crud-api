const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const bookRoute = require("./routes/book.route.js");

const dotenv = require("dotenv");
dotenv.config();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/books", bookRoute);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tmon6bh.mongodb.net/node-api?retryWrites=true&w=majority&appName=Cluster0`
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
