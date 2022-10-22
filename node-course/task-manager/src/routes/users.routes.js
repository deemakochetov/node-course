const express = require('express');
const {
  updateUser,
  deleteUser,
  getUser
} = require('../controllers/users.controllers');

const router = express.Router();

router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
