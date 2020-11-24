module.exports = {
  login: (loginBody, collection) => {
    // passport?
  },
  signup: (req, res, next) => {
    const token = req.query.token;
    token ? console.log(token + ' - signup verified') : console.log('Signup successful');
    res.status(200).end();
  },
}

