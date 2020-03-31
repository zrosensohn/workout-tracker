const router = require("express").Router();
const db = require("../models");
let path = require('path');

/////////////////
// HTML ROUTES
////////////////
router.get("/exercise", (req, res) => {
    res.sendFile(path.resolve('public/exercise.html'));
  });
 
  router.get("/stats", (req, res) => {
    res.sendFile(path.resolve('public/stats.html'));
  });
  
//////////////
// API ROUTES
//////////////

// Workouts
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .populate("exercises")
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

router.put("/api/workouts/:id", (req, res) => {
    db.Exercise.create(req.body)
        .then((response) => {
            console.log(response);
            let filter = { _id: req.params.id };
            let update = { 
                $push: { exercises: response._id }  
                // ,$inc: { totalDuration: response.duration}
            };
            db.Workout.findByIdAndUpdate(filter, update, { new: true })
                .then(exercise => {
                    console.log(exercise);
                    res.json(exercise);
                })
                .catch(err => {
                    res.json(err);
                });
        })
});

router.get("/api/workouts/range", (req, res) => {
    var days = 7; // Days you want to subtract
    var date = new Date();
    var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    var day = last.getDate(); // Seven days ago
    db.Workout.find({
        day: {
            $gte: day
        }
    })
    .populate("exercises")
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    });
});

module.exports = router;