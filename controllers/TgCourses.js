const ErrorResponse = require('../utlis/errorResponse');
const asyncHandler = require('../middleware/async');
const TgCourses = require('../models/TgCourses');

exports.createItem = asyncHandler(async (req, res, next) => {
  const {id, title,subtitle,instructor,courseType,cardImage,imageUrl,highlights} = req.body;

  const courseItem = await TgCourses.create({
    title,
    subtitle,
    instructor,
    courseType,
    cardImage,
    imageUrl,
    highlights

  }); //we need to send body parser for that so send it in the server,js

  res.status(201).json({
    success: true,
    data: courseItem,
  });
});


exports.fetchItems = asyncHandler(async (req, res, next) => {
 const courseItems = await TgCourses.find();

 res
   .status(200)
   .json({ success: true, count:courseItems.length, data: courseItems });



});

exports.fetchItem = asyncHandler(async (req, res, next) => {
  const courseItem = await TgCourses.findById(req.params.id);
  if (!courseItem) {
    return res.status(400).json({ success: false });
  }
  

  res
    .status(200)
    .json({ success: true, data: courseItem });
});



exports.updateTgCourses = asyncHandler(async (req, res, next) => {
  const course = await TgCourses.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    data: course,
  });
});
