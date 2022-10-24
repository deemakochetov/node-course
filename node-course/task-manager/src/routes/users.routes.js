const express = require('express');
const {
  getUser,
  deleteUser,
  updateUser,
  logoutUser,
  logoutUserSessions
} = require('../controllers/users.controllers');

const router = express.Router();

router.get('', getUser);
router.patch('', updateUser);
router.delete('', deleteUser);
router.post('/logout', logoutUser);
router.post('/logout-all-sessions', logoutUserSessions);

module.exports = router;
