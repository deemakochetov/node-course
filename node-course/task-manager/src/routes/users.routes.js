const express = require('express');
const {
  createUser,
  updateUser,
  deleteUser,
  getUser
} = require('../controllers/users.controllers');

const router = express.Router();

router.post('', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
