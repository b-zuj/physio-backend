const express = require("express");
const router = express.Router();

// const authControllers = require("../controllers/auth");
const proControllers = require('../controllers/pro');
const { errorHandler } = require('../utils/errorHandler');

router
  .get(
    '/:id',
    errorHandler(async (req, res) => {
      const { id } = req.params;
      const proData = await proControllers.getProData(id);
      res.json(proData).status(200).end();
    })
  )
  .put(
    '/:id',
    errorHandler(async (req, res) => {
      const { id } = req.params;
      const updatedProData = req.body;
      const proData = await proControllers.updatePro(id, updatedProData);
      res.json(proData).status(201).end();
    }),
  )
  .delete(
    '/:id',
    errorHandler(async (req, res) => {
      const { id } = req.params;
      await proControllers.deletePro(id);
      res.status(200).end()
    }),
    )

module.exports = router;

// /auth
// /login - POST login user
// /signup - POST create user
// /signup?token=1231jk23n12b3n12b3 - token contains: id of trainer and session details to create new user type: ‘client’
