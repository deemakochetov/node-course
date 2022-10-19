const mongoose = require('mongoose');
const validator = require('validator');

const CONNECTION_URL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
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
    min: [7, 'The password is too short'],
    validate(value) {
      if (value.toLowercase().includes('password'))
        throw new Error(`Password should not contain word'password'`);
    }
  }
});

const Task = mongoose.model('Task', {
  description: { type: String },
  completed: { type: Boolean }
});
