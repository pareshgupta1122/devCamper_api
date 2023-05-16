const mongoose = require('mongoose');

const ActivitySchemma = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ' Enter a name'],
  },

  courseId: {
    type: mongoose.Schema.ObjectId,
    ref: 'TgCourses',
    required: true,
  },
  moduleId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Module',
    required: true,
  },
});
module.exports = mongoose.model('Activity', ActivitySchemma);
