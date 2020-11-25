const express = require("express");
const router = express.Router();

// const authControllers = require("../controllers/auth");
const sessionControllers = require('../controllers/session');
const { errorHandler } = require('../utils/errorHandler');
const { ConnectionStates } = require("mongoose");

router
  .get(
    '/',
    errorHandler(async (req, res) => {
      const { pro, client } = req.query;
      const sessionsData = await sessionControllers.getAllSessions(pro, client);
      res.json(sessionsData).status(200).end();
    })
  )
  // .get(
  //   '/:id',
  //   errorHandler(async (req, res) => {
  //     const { id } = req.params;
  //     const proData = await proControllers.getProData(id);
  //     res.json(proData).status(200).end();
  //   })
  // )
  // .put(
  //   '/:id',
  //   errorHandler(async (req, res) => {
  //     const { id } = req.params;
  //     const updatedProData = req.body;
  //     const proData = await proControllers.updatePro(id, updatedProData);
  //     res.json(proData).status(201).end();
  //   }),
  // )
  // .delete(
  //   '/:id',
  //   errorHandler(async (req, res) => {
  //     const { id } = req.params;
  //     await proControllers.deletePro(id);
  //     res.status(200).end()
  //   }),
  //   )

module.exports = router;

// /sessions
// / - GET all by client and/or pro
// /:id - GET one
// / - POST create new session
// /:id - POST edit session
// /:id - DELETE one
