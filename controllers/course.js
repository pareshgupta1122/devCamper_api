const ErrorResponse = require('../utlis/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

//desc   Get Courses
//@route   Get/api/v1/courses
//@route    GET/api/v1/bootcamps/:bootcampId/courses
//@acess    Public

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      //populate is used to get the bootcamp parameters in the courses and select tells which parameter we requires

      path: 'bootcamp',
      select: 'name description',
    });
  }
  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

//@desc   Get Courses
//@route   Get/api/v1/courses/:id
//@acess    Public

exports.getCourse = asyncHandler(async (req, res, next) => {
  //add this to the routes
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,

    data: course,
  });
});
//@desc   Add Courses
//@route   Post/api/v1/bootcamp/:bootcampId/courses
//@acess    Public

exports.addCourse = asyncHandler(async (req, res, next) => {
  //add this to the routes

  req.body.bootcamp = req.params.bootcampId;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampid}`),
      404
    );
  }
  //jb us id the bootcamp mil gya with data we will create a course with that bootcamp data
  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,

    data: course,
  });
});

//@desc   Update a Courses
//@route   Post/api/v1/bootcamp/:bootcampId/courses
//@acess    Public

exports.UpdateCourse = asyncHandler(async (req, res, next) => {
  //add this to the routes

  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,

    data: course,
  });
});


//@desc   Delete a Course
//@route   Post/api/v1/bootcamp/:bootcampId/courses
//@acess    Public

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  //add this to the routes

  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }


  res.status(200).json({
    success: true,

    data: {},
  });
});
