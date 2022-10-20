const express = require('express');
const { StatusCodes } = require('http-status-codes');
const { log, logSuccess, logFailure } = require('./src/utils/logging');
require('./src/db/mongoose');
const User = require('./src/models/user');
const Task = require('./src/models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(StatusCodes.CREATED).send(user);
    })
    .catch((e) => {
      res.status(StatusCodes.BAD_REQUEST).send(e);
    });
});

app.post('/tasks', (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.status(StatusCodes.CREATED).send(task);
    })
    .catch((e) => {
      res.status(StatusCodes.BAD_REQUEST).send(e);
    });
});

app.listen(port, () => {
  logSuccess(`Listening on port ${port}`);
});
