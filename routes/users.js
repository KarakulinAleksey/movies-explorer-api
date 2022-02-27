const router = require('express').Router();
const {
  updateProfileUserValidator,
} = require('../validators/celebrate-validators');

const {
  getAuthUser,
  updateProfileUser,
  logout,
} = require('../controllers/users');

router.get('/users/me', getAuthUser); // d
router.patch('/users/me', updateProfileUserValidator, updateProfileUser); // d
router.get('/signout', logout); // d

module.exports = router;
