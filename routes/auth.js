const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/auth");

router
  .post('/login', authControllers.login)
  .post('/signup', authControllers.signup)
  .post('/auth/signup/:token', authControllers.signup);


module.exports = router;