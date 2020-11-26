const express = require('express');
const router = express.Router();

const {
  signup,
  login,
  protectedRoute,
  autoLogin,
  signupClient
} = require('../controllers/auth');
const { authenticate } = require('../middleware/authenticate');
const { errorHandler } = require('../utils/errorHandler');

router
  .post('/signup', errorHandler(signup))
  .post('/client/signup', errorHandler(signupClient))
  .post('/login', errorHandler(login))
  .get('/login', authenticate, errorHandler(autoLogin));

module.exports = router;
