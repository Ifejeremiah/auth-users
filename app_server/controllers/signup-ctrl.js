const mongoose = require('mongoose');
const User = mongoose.model('User');    //Define database user model

module.exports = (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // Check passwords match 
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('signup', {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          errors.push({ msg: 'Email is already registered' });
          res.render('signup', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          // Create a new instance of database model
          const user = new User()
          user.name = name;
          user.email = email;
          user.setPassword(password);
          user.save()
            .then(
              (user) => {
                req.flash('success_msg', "You are registered and can login");
                res.redirect('/signin')
              }
            )
            .catch(err => console.log(err));
        }
      });
  }
}
