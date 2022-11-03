/* eslint-disable dot-notation */
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/user');

const AUTH_TOKEN_SECRET = config.get('secretTokensConfig.auth_token_secret');

const auth = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].replace('Bearer ', '');
    const compared = jwt.verify(token, AUTH_TOKEN_SECRET);
    const user = await User.findOne({
      _id: compared._id,
      'tokens.token': token
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.send({ message: 'Authorization failed. Login to continue' });
  }
};

module.exports = auth;
