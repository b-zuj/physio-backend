const express = require('express');
const router = express.Router();

const { signup, login, protectedRoute } = require('../controllers/auth');
const { authenticate } = require('../middleware/authenticate');
const { errorHandler } = require('../utils/errorHandler');

router
  // .post('/login', errorHandler(async (req, res) => {
  //   const loginBody = req.body;
  //   console.log('body::::', loginBody)
  //   const userType = 'Pro'
  //   const token = authControllers.login(loginBody, userType);
  //   res.send(token).status(201).end();
  // }))
  .post('/signup', errorHandler(signup))
  .post('/login', errorHandler(login))
  .get('/amiworthy', authenticate, errorHandler(protectedRoute));
  
  // authControllers.login()
  // .post('/signup', authControllers.signup)
  // .post('/auth/signup/:token', authControllers.signup);


module.exports = router;
