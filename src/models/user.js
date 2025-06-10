const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50
  },
  lastName: {
    type: String
  },
  emailId: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid email address: " + value);
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("enter strong password: " + value);
      }
    }
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("gender data is not valid");
      }
    }
  },
  photoUrl: {
    type: String,
    default: "string"
  },
  about: {
    type: String,
    default: "this is a default value of the user"
  },
  skills: {
    type: [String],
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
