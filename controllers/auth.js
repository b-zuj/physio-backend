module.exports = {
  login: (req, res, next) => {
    console.log("Auth login");
    res.send();
  },
  signup: (req, res, next) => {
    console.log(req)
    const token = req.query.token
    token ? console.log(token + ' - signup verified') : console.log('Signup successful')
    res.send();
  },
}
