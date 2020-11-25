const passport = require("passport");
const passportLocal = require("../server/passportLocal");
const { ApplicationError, NotFoundError } = require("../utils/errors");

const createCookieFromToken = (user, statusCode, req, res) => {
  const token = user.generateVerificationToken();

  const cookieOptions = {
    expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

module.exports = {
  signup: async (req, res, next) => {
    passport.authenticate(
      "signup",
      { session: false },
      async (err, user, info) => {
        try {
          if (err || !user) {
            const { statusCode = 400, message } = info;

            return res.status(statusCode).json({
              status: "error",
              error: {
                message,
              },
            });
          }
          createCookieFromToken(user, 201, req, res);
        } catch (error) {
          console.log(error);
          throw new ApplicationError(500, error);
        }
      }
    )(req, res, next);
  },

  login: (req, res, next) => {
    passport.authenticate("login", { session: false }, (err, user, info) => {
      if (err || !user) {
        let message = err;
        if (info) {
          message = info.message;
        }
        return res.status(401).json({
          status: "error",
          error: {
            message,
          },
        });
      }
      createCookieFromToken(user, 200, req, res);
    })(req, res, next);
  },

  protectedRoute: async (req, res) => {
    console.log(req.user);

    res.status(200).json({
      status: "success",
      data: {
        message: "Yes you are. You are a Thor-n times developer",
      },
    });
  },
};
