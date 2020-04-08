const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

const db = require("./models");

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
  // let workoutId = req.params.id;
  // let savedExercises = [];
  // db.Workout.find({ _id: workoutId })
  //   .then(dbWorkout => {
  //     savedExercises = dbWorkout[0].exercises;
  //     res.json(dbWorkout[0].exercises);
  //     let allExercises = [...savedExercises, body]
  //     console.log(allExercises)
  //     updateWorkout(allExercises)
  //   })
  //   
  // function updateWorkout(exercises) {
  //   db.Workout.findByIdAndUpdate(workoutId, { exercises: exercises }, function (err, doc) {
  //     if (err) {
  //       console.log(err)
  //     }

  //   })
  // }
        
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
