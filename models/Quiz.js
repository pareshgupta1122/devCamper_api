const mongoose = require('mongoose');

const QuizSchemma = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
    required: [true, ' Enter a question'],
  },
  questions: {
    type: [Object],
  },
  timer: {
    type: Number,
    required: true,
  },
  isSelected: {
    type: [[Boolean]],
    required: true,
  },

  userAnswers: {
    type: [String],
    required: true,
  },
});
module.exports = mongoose.model('Quiz', QuizSchemma);