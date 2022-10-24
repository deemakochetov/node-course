const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.get('Autorization').replace('Bearer ', '');
    const compared = jwt.compare(token, process.env.AUTH_TOKEN_SECRET);
    const user = User.findOne({ _id: compared._id, tokenstoken: token });
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
