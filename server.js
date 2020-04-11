const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://user1:a12345@ds061757.mlab.com:61757/heroku_x8fr1kzt", { useNewUrlParser: true });



app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});
app.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .then(workout => {
      res.json(workout);
  })
  .catch(err => {
      res.json(err);
  });
});


app.post("/api/workouts", (req, res) => {
     db.Workout.create({ type: "workout" })
    .then((response) => { res.json(response) })
    .catch ((err)=> {
    console.log(err)
  })
});

app.put("/api/workouts/:id", (req, res) => {
  db.Workout.update({ _id: req.params.id }, { $push: { exercises: req.body } })
    .then((response) => { res.json(response) })
    .catch((err) => {
      console.log(err)
    })  
});
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
  .then(workout => {
      res.json(workout);
  })
  .catch(err => {
      res.json(err);
  });
}); 

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
