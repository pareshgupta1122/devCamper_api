const mongoose = require('mongoose');

const UserSchemma = new mongoose.Schema({
  name: {
    type: String,

    required: [true, 'Please Enter a Name '],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please Enter a email '],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    unique: true,
    maxlength: [10, 'Phone number cannot we more than 10'],
    required: [true, 'Please Enter a Name '],
  },
  dob: {
    type: Date,
    default: Date.now,
    required: [false, 'Please Enter dob '],
  },

  gender: {
    type: String,
    required: [true, 'Please Choose a gender '],
  },

  wishlistCoursesIds: {
    type: [mongoose.Schema.ObjectId],
    ref:'TgCourses'
  },

  enrolledCourses: {
    type: [mongoose.Schema.ObjectId],
    default: 'TgCourses',
  },
});

module.exports = mongoose.model('user', UserSchemma);