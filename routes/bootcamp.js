const express = require('express');

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampInRadius,
  bootcampPhotoUpload
} = require('../controllers/bootcamp');

//bootcamp model

const Bootcamp=require('../models/Bootcamp')

//advancedresults

const advancedResults=require('../middleware/advancedResults');

//include other resourse routers
const courseRouter=require('./course');



const router = express.Router();

//Re-route into other resource routers

router.use('/:bootcampId/courses',courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampInRadius);


router.route('/:id/photo').put(bootcampPhotoUpload);

router.route('/').get(advancedResults(Bootcamp,'courses'),getBootcamps).post(createBootcamp);



router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
