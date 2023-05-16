const ErrorResponse = require('../utlis/errorResponse');
const asyncHandler = require('../middleware/async');
const Quiz = require('../models/Quiz');

exports.createQuiz = asyncHandler(async (req, res, next) => {
  const { title,questions, timer, isSelected } = req.body;

  const Quizquestions = await Quiz.create({
    title,
 questions,
    timer,
    isSelected,
  });

  //we need to send body parser for that so send it in the server,js

  res.status(201).json({
    success: true,
    data: Quizquestions,
  });
});

exports.fetchQuiz = asyncHandler(async (req, res, next) => {
  const questions = await Quiz.find();

  res.status(200).json({ success: true, count: questions.length, data: questions });
});
