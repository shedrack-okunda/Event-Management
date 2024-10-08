const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Event = require("./models/event");
require("dotenv").config();

const app = express();

// connects to mongoDB
mongoose
  .connect(process.env.dbURL)
  .then((result) => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Server started on port 8080");
    });
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err);
  });

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/add-event", (req, res) => {
  res.render("add-event", { title: "Add Event" });
});

// post request for posting a data
app.post("/submit-event", (req, res) => {
  const event = new Event(req.body);
  event
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
    });
});

// get all events
app.get("/", (req, res) => {
  Event.find()
    .then((result) => {
      res.render("index", { title: "All event", events: result });
    })
    .catch((err) => {
      console.error(err);
    });
});

// app.get("/index", (req, res) => {
//   res.render("index", { title: "Add Event" });
// });
