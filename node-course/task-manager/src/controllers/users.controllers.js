const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const createUser = async (req, res) => {
  const allowedFields = ['name', 'age', 'email', 'password'];
  try {
    const queryObject = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (allowedFields.includes(key)) queryObject[key] = value;
      else
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: 'Invalid parameters' });
    }
    const user = new User(queryObject);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(StatusCodes.CREATED).send({ user, token });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const allowedUpdates = ['name', 'age', 'email', 'password'];
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).send();
      return;
    }
    const data = req.body;
    for (const [key, value] of Object.entries(data)) {
      if (allowedUpdates.includes(key)) user[key] = value;
      else
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: 'Invalid parameters' });
    }
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(StatusCodes.NOT_FOUND).send();
    else res.send(user);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({
      _id: req.params.id
    });
    if (result.deletedCount === 0) res.status(StatusCodes.NOT_FOUND).send();
    else res.send();
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

module.exports = { createUser, updateUser, deleteUser, getUser, loginUser };
