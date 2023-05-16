const express = require('express');

const {
  
  createQuiz, fetchQuiz,
} = require('../controllers/quiz');
const router = express.Router({ mergeParams: true });

router.route('/').post(createQuiz).get(fetchQuiz);


//router.route('/:id').get(fetchItem);
module.exports = router;
