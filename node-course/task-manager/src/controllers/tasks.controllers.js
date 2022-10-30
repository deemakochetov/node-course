const { StatusCodes } = require('http-status-codes');

const Task = require('../models/task');

const createTask = async (req, res) => {
  const allowedFields = ['description', 'completed'];

  try {
    const queryObject = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (allowedFields.includes(key)) queryObject[key] = value;
      else
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: 'Invalid parameters' });
    }
    queryObject.owner = req.user._id;
    const task = new Task(queryObject);
    await task.save();
    res.status(StatusCodes.CREATED).send(task);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10);
    const skip = parseInt(req.query.skip, 10);
    const sortingOptions = {};
    if (req.query.sortBy) {
      // eslint-disable-next-line prefer-const
      let [sortParameter, order] = req.query.sortBy.split('_');
      if (order === 'asc') order = 1;
      if (order === 'desc') order = -1;
      sortingOptions[sortParameter] = order;
    }
    let searchQuery = {};
    if (req.query.completed) {
      searchQuery = {
        completed: req.query.completed
      };
    }
    searchQuery.owner = req.user._id;
    const tasks = await Task.find(searchQuery)
      .sort(sortingOptions)
      .limit(limit)
      .skip(skip);
    res.send(tasks);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!task) res.status(StatusCodes.NOT_FOUND).send();
    else res.send(task);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

const updateTask = async (req, res) => {
  const allowedUpdates = ['description', 'completed'];

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!task) {
      res.status(StatusCodes.NOT_FOUND).send();
      return;
    }
    for (const [key, value] of Object.entries(req.body)) {
      if (allowedUpdates.includes(key)) task[key] = value;
      else
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: 'Invalid parameters' });
    }
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const result = await Task.deleteOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (result.deletedCount === 0) res.status(StatusCodes.NOT_FOUND).send();
    else res.send();
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
