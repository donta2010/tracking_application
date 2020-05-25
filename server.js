// const express = require("express");
// const logger = require("morgan");
// const mongoose = require("mongoose");
// const path= require("path");

// const PORT = process.env.PORT || 3100;

const db = require("./Model");

// const app = express();

// app.use(logger("dev"));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(express.static("public"));

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// app.get("/", (req, res) =>{
// res.send(index.html)
// })
// app.get("/exercise", (req, res) =>{
//  res.sendFile(path.join(__dirname, "./public/exercise.html"));
//   })
//   app.get("/stats", (req, res) =>{
//     res.sendFile(path.join(__dirname,"public", "stats.html"));
//      })

// app.get("/api/workouts",async (req,res) =>{
//     try {
//         const allWorkouts = await db.Workout.find({});
//         console.log(allWorkouts)
//         res.json(allWorkouts);
// } catch (err)
// {
//     res.json(err);
// }
// });
// app.get("/api/workouts/range", (req,res) =>{
//  db.Workout.find({}, (err, data) =>{
// if (err){
//   console.log(err);
// }else{
//   res.json(data);
// }
//  })
// })

// // app.get("/api/workouts/:id", (req,res) =>{
// //   db.Workout.update(
// //     {_id: req.params},
// //     {$push: {exercise:req.body},
// //   },
// //     (err, data) =>{
// //  if (err){
// //    console.log(err);
// //  }else{
// //    res.json(data);
// //  }
// //   })
// //  })
// //Post routes here
// // app.post("/submit", ({body}, res) => {
// //   db.Book.create(body)
// //     .then(({_id}) => db.Library.findOneAndUpdate({}, { $push: { books: _id } }, { new: true }))
// //     .then(dbLibrary => {
// //       res.json(dbLibrary);
// //     })
// //     .catch(err => {
// //       res.json(err);
// //     });
// // });
// //put request
// //adds to an old exercise entry
// app.put("/api/workouts/:id", async(req, res)=>{
//   try{
//     const currentWorkout= await db.Workout.findOne({
// _id: req.params.id, 
//     })
//     const savedWorkout = await currentWorkout.addExercise(req.body);
//   }catch (err){
//     throw err;
//   }
// })

// // app.post("/api/workouts", ({body},res)=>{
// //   db.Workout.create(body)
// //   .then(({_id})=> db.Workouts.findOneAndUpdate({}, {$push: {Workouts: _id}}, {new: true}))
// //    .then(dbWorkouts => {
// //     res.json(dbWorkouts);
// //   })
// //   .catch(err => {
// //     res.json(err);
// //   })
// //   })

// app.post("/api/workouts", (req, res) => {
//   db.Workout.create(req.body, (err, data) => {
//     // If statement to catch errors
//     //console.log(req.body);
//     if (err) {
//       res.send(err);
//       // Display Data in JSON data format
//     } else {
//       res.json(data);
//     }
//   });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`App running on port ${PORT}!`);
// });



const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3100;

// const db = require("./Models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

app.get("/", (req, res) => {
  res.send(index.html);
});

app.get("/api/workouts", (req, res) => {
  db.Workout.find({}, (err, data) => {
    // If statement to catch errors
    if (err) {
      res.send(err);
      // Display Data in JSON data format
    } else {
      res.json(data);
      //console.log(data);
    }
  });
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/api/workouts/range", (req, res) => {
  const startDate = new Date().setDate(new Date().getDate() - 7);
  db.Workout.find({ day: { $gte: startDate } }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});
//get one workout by the id and push a new exercise into the exercises array
app.put("/api/workouts/:id", async (req, res) => {
  try {
    const currentWorkout = await db.Workout.findOne({
      _id: req.params.id,
    });

    const savedWorkout = await currentWorkout.addExercise(req.body);
    res.json(savedWorkout);
  } catch (err) {
    throw err;
  }
});

app.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body, (err, data) => {
    // If statement to catch errors
    //console.log(req.body);
    if (err) {
      res.send(err);
      // Display Data in JSON data format
    } else {
      res.json(data);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});