const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');
// Require controllers
const { homepage, signupPage, signinPage, ctrlLogout, dashboardsPage } = require('../controllers');
const ctrlSignup = require('../controllers/signup-ctrl');
const ctrlSignin = require('../controllers/signin-ctrl');


router.get('/', homepage);

router.get('/signout', ctrlLogout);

router.get('/dashboards', ensureAuthenticated, dashboardsPage);

// Register Handler
router
  .route('/signup')
  .get(signupPage)
  .post(ctrlSignup);

// Login Handlers
router
  .route('/signin')
  .get(signinPage)
  .post(ctrlSignin);

module.exports = router;
