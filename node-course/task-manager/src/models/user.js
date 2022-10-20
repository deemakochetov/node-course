const mongoose = require('mongoose');
const validator = require('validator');

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
    minlength: [7, 'The password is too short'],
    validate(value) {
      if (value.toLowerCase().includes('password'))
        throw new Error(`Password should not contain word 'password'`);
    }
  }
});

module.exports = User;
