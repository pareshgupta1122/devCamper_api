const mongoose = require('mongoose');

const ModuleSchemma = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ' Enter a name'],
  },
  numberOfLessons: {
    type: Number,
    required: [true, ' Enter number of Lessons'],
  },
  courseId: {
    type: mongoose.Schema.ObjectId,
    ref: 'TgCourses',
    required: true,
  },
});
module.exports = mongoose.model('Module', ModuleSchemma);