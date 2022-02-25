const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const {
  loginValidator,
  createUserValidator,
} = require('../validators/celebrate-validators');

router.post('/signin', loginValidator, login);
router.post('/signup', createUserValidator, createUser);

router.use(auth);

router.use(routerUsers);
router.use(routerMovies);

module.exports = router;
