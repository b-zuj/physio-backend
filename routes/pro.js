const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/auth");

// router
//   .post('/auth/login', passport.authenticate('local', { 
//       successRedirect: '/',
//       failureRedirect: '/login',
//       failureFlash: true 
//     })
//   .post('/auth/signup', authControllers.signup)
//   .get('/pros/')


// module.exports = router;


// /auth
// /login - POST login user
// /signup - POST create user
// /signup?token=1231jk23n12b3n12b3 - token contains: id of trainer and session details to create new user type: ‘client’

// /trainers
// /:id - GET one
// /:id - POST edit one
// /:id - DELETE one
