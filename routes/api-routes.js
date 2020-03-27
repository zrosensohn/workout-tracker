const router = require("express").Router();
const db = require("../models");
let path = require('path');

/////////////////
// HTML ROUTES
////////////////
router.get("/exercise", (req, res) => {
    res.sendFile(path.resolve('public/exercise.html'));
  });
 
  
//////////////
// API ROUTES
//////////////

// Workouts
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;