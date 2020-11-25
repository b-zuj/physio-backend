const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/auth');
const clientControllers = require('../controllers/client');

// router
//   .post('/auth/login', authControllers.login)
//   .post('/auth/signup/:token', authControllers.signup)

// /auth
// /login - POST login user
// /signup - POST create user
// /signup?token=1231jk23n12b3n12b3 - token contains: id of trainer and session details to create new user type: ‘client’

router
  .get(
    '/',
    errorHandler(async (req, res) => {
      const { pro } = req.query;
      const clientsData = await clientControllers.getAllSessions(pro);
      res.json(clientsData).status(200).end();
    })
  )
  .get(
    '/:id',
    errorHandler(async (req, res) => {
      const { id } = req.params;
      const clientData = await clientControllers.getClient(id);
      res.json(clientData).status(200).end();
    })
  )
  .put(
    '/:id',
    errorHandler(async (req, res) => {
      const { id } = req.params;
      const updatedClientData = req.body;
      const clientData = await clientControllers.updateClient(id, updatedClientData);
      res.json(clientData).status(201).end();
    }),
  )
  .delete(
    '/:id',
    errorHandler(async (req, res) => {
      const { id } = req.params;
      await clientControllers.deleteClient(id);
      res.status(200).end()
    }),
  )

module.exports = router;
