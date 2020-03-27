const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now //takes a function or a value
  },
  totalDuration: {
    type: Number,
    default: 0
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ]
});

const User = mongoose.model("Workout", WorkoutSchema);

module.exports = User;