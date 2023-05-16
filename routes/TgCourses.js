const express = require('express');

const { createItem,fetchItems,fetchItem, updateTgCourses } = require('../controllers/TgCourses');

//including other resource router for modules
// const moduleRouter=require("./module");

const router = express.Router();

// router.use('/:TgCoursesId/modules',moduleRouter);

router.route('/').post(createItem).get(fetchItems);

router.route('/:id').get(fetchItem).put(updateTgCourses);
module.exports = router;
