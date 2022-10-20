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
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
