const { StatusCodes } = require('http-status-codes');

const Task = require('../models/task');

const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);

    await task.save();
    res.status(StatusCodes.CREATED).send(task);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

const getAllTasks = async (req, res) => {
  try {
    let searchQuery = {};
    if (req.query.completed) {
      searchQuery = {
        completed: req.query.completed
      };
    }
    const tasks = await Task.find(searchQuery);
    res.send(tasks);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.send(task);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const data = req.body;
    for (const [key, value] of Object.entries(data)) {
      task[key] = value;
    }
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.deleteOne({
      _id: req.params.id
    });
    res.send();
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  getTask,
  deleteTask
};
