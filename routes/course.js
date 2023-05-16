const express = require('express');

const {
  getCourses,
  getCourse,
  addCourse,
  UpdateCourse,
  deleteCourse,
} = require('../controllers/course');
const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses).post(addCourse);
router.route('/:id').get(getCourse).put(UpdateCourse).delete(deleteCourse);

module.exports = router;
