const { Router } = require('express');
const { 
  renderSignUpForm,
  signUp,
  signin,
  renderSigninForm,
  logout
} = require('../controllers/users.controller')

const {generateValidators} = require('../validators/UserValidator');
const router = Router();

// Routes
router.get("/users/signup", renderSignUpForm);

router.get("/users/signin", renderSigninForm);

router.get("/users/logout", logout);

router.post("/users/signup", generateValidators, signUp);

router.post("/users/signin", signin);

module.exports = router;
