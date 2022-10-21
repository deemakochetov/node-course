const express = require('express');
const {
  createTask,
  getAllTasks,
  updateTask,
  getTask,
  deleteTask
} = require('../controllers/tasks.controllers');

const router = express.Router();

router.get('', getAllTasks);
router.post('', createTask);

router.get('/:id', getTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
