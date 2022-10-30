const express = require('express');
const upload = require('../middleware/multer');
const {
  getUser,
  deleteUser,
  updateUser,
  logoutUser,
  logoutUserSessions,
  uploadImage
} = require('../controllers/users.controllers');

const router = express.Router();

router.get('', getUser);
router.patch('', updateUser);
router.delete('', deleteUser);
router.post('/logout', logoutUser);
router.post('/logout-all-sessions', logoutUserSessions);
router.post('/upload-avatar', upload.single('avatar'), uploadImage);

module.exports = router;
