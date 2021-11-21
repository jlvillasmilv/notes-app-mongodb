const usersCtrl = {};
const User = require('../models/User');
const passport = require('passport');
const { validationResult } = require('express-validator');
usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signUp = async (req, res) => {
 const {name, email, password, confirm_password} = req.body;

 const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.render('users/signup', {
         errors: errors.array(),
        name,
        email
      });
    }
 else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The Email is already in use.");
      res.redirect("/users/signup");
    } else { 
      // Saving a New User
      const newUser = new User({name, email, password});
      newUser.password = await newUser.encryptPassword(password); 
      await newUser.save();
      req.flash('success_msg', "You are registered");
      res.redirect('/users/signin');
    }
 }
};

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
};

usersCtrl.signin = passport.authenticate('local', {
  failureRedirect: '/users/signin',
  successRedirect: '/notes',
  failureFlash: true
})

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/users/signin");
};

module.exports = usersCtrl;
