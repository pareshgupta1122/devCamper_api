const express = require('express');

const {createModule, fetchModules, fetchModuleByCourseId} = require('../controllers/module');
const router = express.Router({mergeParams:true});

router.route('/').post(createModule).get(fetchModules);
router.route('/:courseId').get(fetchModuleByCourseId);

//router.route('/:id').get(fetchItem);
module.exports = router;
