const { StatusCodes } = require('http-status-codes');
const sharp = require('sharp');
// const config = require('config');
const User = require('../models/user');
const sendEmail = require('../utils/sendEmail');

const REGISTRATION_REASON = 'registration';
const LEAVING_REASON = 'deletingAccount';

const AVATAR_HEIGHT = 250;
const AVATAR_WIDTH = 250;

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
    //    sendEmail(user.email, user.name, REGISTRATION_REASON);
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
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.deleteOne(req.user);
    if (user.deletedCount === 0) res.status(StatusCodes.NOT_FOUND).send();
    else {
      // sendEmail(user.email, user.name, LEAVING_REASON);
      res.send();
    }
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

const updateUser = async (req, res) => {
  const allowedUpdates = ['name', 'age', 'email', 'password'];
  try {
    const { user } = req;
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

const logoutUser = async (req, res) => {
  try {
    const { user } = req;
    user.tokens = user.tokens.filter((token) => token.token !== req.token);
    await user.save();
    res.send();
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

const logoutUserSessions = async (req, res) => {
  try {
    const { user } = req;
    user.tokens = [];
    await user.save();
    res.send();
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

const getAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user || !user.avatar) {
      throw new Error('Cannot fetch avatar of the user');
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).send(err);
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const { user, file } = req;
    const buffer = await sharp(file.buffer)
      .resize({ width: AVATAR_WIDTH, height: AVATAR_HEIGHT })
      .png()
      .toBuffer();
    user.avatar = buffer;
    await user.save();
    res.send();
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
  }
};

const deleteAvatar = async (req, res) => {
  try {
    const { user } = req;
    user.avatar = undefined;
    await user.save();
    res.send();
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err);
  }
};

module.exports = {
  createUser,
  loginUser,
  getUser,
  deleteUser,
  updateUser,
  logoutUser,
  logoutUserSessions,
  getAvatar,
  uploadAvatar,
  deleteAvatar
};
