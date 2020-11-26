const express = require("express");
const router = express.Router();

// const authControllers = require("../controllers/auth");
const exerciseControllers = require('../controllers/exercise');
const { errorHandler } = require('../utils/errorHandler');
const { ConnectionStates } = require("mongoose");

router
  .get(
    '/',
    errorHandler(async (req, res) => {
      const { session, title } = req.query;
      const exercisesData = await exerciseControllers.getAllExercises(session, title);
      res.json(exercisesData).status(200).end();
    })
  )
  .get(
    '/:id',
    errorHandler(async (req, res) => {
      const { id } = req.params;
      const exerciseData = await exerciseControllers.getExercise(id);
      res.json(exerciseData).status(200).end();
    })
  )
  // .post(
  //   '/',
  //   errorHandler(async (req, res) => {
  //     const exerciseValues = req.body;
  //     console.log(exerciseValues)
  //     const exerciseData = await exerciseControllers.createExercise(exerciseValues);
  //     res.json(exerciseData).status(201).end();
  //   })
  // )
  // .put(
  //   '/:id',
  //   errorHandler(async (req, res) => {
  //     const { id } = req.params;
  //     const updatedExerciseData = req.body;
  //     const exerciseData = await exerciseControllers.updateExercise(id, updatedExerciseData);
  //     res.json(exerciseData).status(201).end();
  //   }),
  // )
  // .delete(
  //   '/:id',
  //   errorHandler(async (req, res) => {
  //     const { id } = req.params;
  //     await exerciseControllers.deleteExercise(id);
  //     res.status(200).end()
  //   }),
  // )

module.exports = router;

// / - GET all
// /:id - GET one
// / - POST create new exercise
// /:id - POST edit exercise
// /:id - DELETE one
