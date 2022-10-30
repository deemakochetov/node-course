const express = require('express');
const upload = require('../middleware/multer');
const {
  getUser,
  deleteUser,
  updateUser,
  logoutUser,
  logoutUserSessions,
  getAvatar,
  uploadAvatar,
  deleteAvatar
} = require('../controllers/users.controllers');

const router = express.Router();

router.get('/me', getUser);
router.patch('/me', updateUser);
router.delete('/me', deleteUser);
router.post('/me/logout', logoutUser);
router.post('/me/logout-all-sessions', logoutUserSessions);
router.get('/:id/avatar', getAvatar);
router.put('/me/avatar', upload.single('avatar'), uploadAvatar);
router.delete('/me/avatar', deleteAvatar);

module.exports = router;
