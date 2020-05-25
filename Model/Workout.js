const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    // const workoutKeyMap = {
    //     date: "Date",
    //     totalDuration: "Total Workout Duration",
    //     numExercises: "Exercises Performed",
    //     totalWeight: "Total Weight Lifted",
    //     totalSets: "Total Sets Performed",
    //     totalReps: "Total Reps Performed",
    //     totalDistance: "Total Distance Covered"
    
    date:{
        type: Date,
        default: Date.now(),
    },
    exercises: [
      {
        type: {
            type:String,
            trim: true,
            required:"Excersice Name is required"
        },
        name: 
        {
            type:String,
            trim: true,
            required:"Excersice Name is required"
        },
        duration: 
        {
            type:String,
            trim: true
        },
        weight: {
            type:Number,
            trim: true,
        },
        reps: {
            type:Number,
            trim: true,
        },
        sets: {
            type:Number,
            trim: true,
        },
          distance:{
            type:Number,
            trim: true,
        },
      },
    ],
    totalDuration:{
        type:Number,
        trim:true,
    }
});

WorkoutSchema.methods.setTotalDuration =function(){
    let total =0;
    this.exercises.forEach(exercises => {
        totalDuration+=exercise.duration;
    });
    this.totalDuration=total;
    return this.totalDuration
}
WorkoutSchema.methods.addExercise = function (exercise) {
    this.exercises.push(exercise);
    this.setTotalDuration();
    return this.save();
};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
