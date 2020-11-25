const express = require('express');
const mongoose = require('mongoose');
// const expressSession = require('express-session')({
//   secret: 'loopers-secret',
//   resave: false,
//   saveUninitialized: false
// });
const passport = require('passport');
const { NotFoundError } = require('./utils/errors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const Pro = require('./models/Pro');
const authRoutes = require('./routes/auth');
const proRoutes = require('./routes/pro')
const sessionRoutes = require('./routes/session')

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

passport.initialize()

// app.use(expressSession);

// app.use(passport.initialize());
// app.use(passport.session());

app.use('/auth', authRoutes);

app.use('/pros', proRoutes);

app.use('/sessions', sessionRoutes);

app.get("/", (_, res) => {
  res.status(200).json({
    status: "success",
    message: "Bonjour, Welcome, E Kaabo",
  });
});

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.55hby.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  app.listen(process.env.PORT || 4000, () =>
    console.log(`App is running at port: ${process.env.PORT || 4000}`)
  )
);
