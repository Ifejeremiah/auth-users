const passport = require('passport');   //Require passport for authentication

module.exports = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboards',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
}
