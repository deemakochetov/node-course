const { StatusCodes } = require('http-status-codes');

const User = require('../models/user');

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();
    res.status(StatusCodes.CREATED).send(user);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const data = req.body;
    for (const [key, value] of Object.entries(data)) {
      user[key] = value;
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
    res.send(user);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({
      _id: req.params.id
    });
    res.send();
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

module.exports = { createUser, updateUser, deleteUser, getUser };
