const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.55hby.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  app.listen(process.env.PORT || 4000, () =>
    console.log(`App is running at port: ${process.env.PORT || 4000}`)
  )
);
