const express = require("express");
const router = express.Router();

const { signup, login, protectedRoute } = require("../controllers/auth");
const { authenticate } = require("../middleware/authenticate");
const { errorHandler } = require("../utils/errorHandler");

router
  .post("/signup", errorHandler(signup))
  .post("/login", errorHandler(login))
  .get("/amiworthy", authenticate, errorHandler(protectedRoute));

module.exports = router;
