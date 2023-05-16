const mongoose = require('mongoose');


// final String id;
//   final String imageUrl;

//   final String title;
//   final String subTitle;
//   final String instructor;
//   final String courseType;
//   final String instructorImage;
//   final double rating;
//   final int enrolls;
//   final String courseLevel;
//   final int modules;
//   final int hours;
//   final String aboutcourse;
//   final List<String> courseHighlights;
//   final List<Map> chapters;
//   final List<Map> requirements;
//   final List<String> tags;
//   final String cardImage;
//   final List<Map> reviews;
//   bool isMarked;
//   bool isEnrolled;

//   bool isChecked;
//   int? prize;
//   final int waletMoney;

const TgCoursesSchemma = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please Enter a title'],
  },
  subtitle: {
    type: String,
    required: [true, 'Please Enter a subtitle'],
  },
  instructor: {
    type: String,
    required: [true, 'Please Enter name of instructor'],
  },
  courseType: {
    type: String,
    required: [true, 'Please Enter a course Type'],
    //enum: ['Paid', 'Free', 'Enrolled'],
  },
  instructorImage: {
    type: String,

    default: 'no-photo.jpg',
  },
  rating: {
    type: Number,
  },
  enrolls: {
    type: Number,
  },
  courseLevel: {
    type: String,
  },

  modules: {
    type: Number,
  },
  hours: {
    type: Number,
  },
  aboutcourse: {
    type: String,
  },

  highlights: {
    type: [String],
  },
  chapters: {
    type: [Object],
  },
  requirements: {
    type: [Object],
  },
  tags: {
    type: [String],
  },
  cardImage: {
    type: String,
    default: 'no-photo.jpg',
    required: [true, 'Please Enter image '],
  },
  reviews: {
    type: [Object],
  },
  isMarked: {
    type: Boolean,
    default: false,
    required: false,
  },
  isEnrolled: {
    type: Boolean,
    default: false,
    required: false,
  },
  isChecked: {
    type: Boolean,
    default: false,
    required: false,
  },
  prize: {
    type: Number,
  },
  walletMoney: {
    type: Number,
  },
  imageUrl: {
    type: String,
    
  },
});
module.exports = mongoose.model('TgCourses', TgCoursesSchemma);