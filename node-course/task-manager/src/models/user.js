/* eslint-disable no-use-before-define */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Task = require('./task');

const AUTH_TOKEN_SECRET = config.get('secretTokensConfig.auth_token_secret');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error('An email is invalid');
      }
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) throw new Error('Age must be a positive number');
      }
    },
    password: {
      type: String,
      trim: true,
      minlength: [7, 'The password is too short'],
      validate(value) {
        if (value.toLowerCase().includes('password'))
          throw new Error(`Password should not contain word 'password'`);
      }
    },
    tokens: [
      {
        token: {
          type: String,
          require: true
        }
      }
    ],
    avatar: {
      type: Buffer
    }
  },
  {
    timestamps: true
  }
);

// UserSchema.virtual('tasks', {
//   ref: 'Task',
//   localField: '_id',
//   foreignField: 'owner'
// });

UserSchema.methods.toJSON = function () {
  const privateFields = ['password', 'tokens', 'avatar'];
  const user = this.toObject();
  privateFields.forEach((field) => delete user[field]);
  return user;
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, AUTH_TOKEN_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Login unsuccessful');

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) throw new Error('Login unsuccessful');
  return user;
};

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

UserSchema.pre('remove', async function (next) {
  const user = this;

  await Task.deleteMany({ owner: user._id });

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
