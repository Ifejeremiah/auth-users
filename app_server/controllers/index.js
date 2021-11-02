const homepage = (req, res) => { res.render('homepage') };

const signupPage = (req, res) => { res.render('signup') };

const signinPage = (req, res) => { res.render('signin') };

const dashboardsPage = (req, res) => { res.render('dashboard', { username: req.user.name }) };

const ctrlLogout = (req, res) => {
  req.logout()
  req.flash('success_msg', 'You are logged out');
  res.redirect('/signin')
};


module.exports = { homepage, signupPage, signinPage, dashboardsPage, ctrlLogout }
