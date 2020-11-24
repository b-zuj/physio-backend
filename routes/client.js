const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/auth");

// router
//   .post('/auth/login', authControllers.login)
//   .post('/auth/signup/:token', authControllers.signup)

// /auth
// /login - POST login user
// /signup - POST create user
// /signup?token=1231jk23n12b3n12b3 - token contains: id of trainer and session details to create new user type: ‘client’

// /clients
// / - GET all users related to trainer
// /:id - GET one user related to trainer
// / - POST create new user, related to trainer
// /:id POST edit user, related to trainer
// /:id - DELETE user, can be done by a trainer
