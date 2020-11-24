const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/auth');
const { errorHandler } = require('../utils/errorHandler');

router
  .post('/login', errorHandler(async (req, res) => {
    const loginBody = req.body;
    console.log('body::::', loginBody)
    const userType = 'Pro'
    const token = authControllers.login(loginBody, userType);
    res.send(token).status(201).end();
  }));
  
  // authControllers.login()
  // .post('/signup', authControllers.signup)
  // .post('/auth/signup/:token', authControllers.signup);


module.exports = router;



// router.post(
//   '/',
//   errorHandler(async (req, res) => {
//     const data = req.body;
//     const review = await controllers.postReview(data);
//     res.json(review).status(201).end();
//   }),
// );