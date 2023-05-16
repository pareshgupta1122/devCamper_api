const express = require('express');

const {
  createActivity, fetchActivityByCourseId, fetchActivities, fetchActivityBymoduleId
} = require('../controllers/activity');
const router = express.Router();

router.route('/').post(createActivity).get(fetchActivities);

router.route('/:courseId/courses').get(fetchActivityByCourseId);
router.route('/:moduleId/modules').get(fetchActivityBymoduleId);

//router.route('/:id').get(fetchItem);
module.exports = router;
