const ErrorResponse = require('../utlis/errorResponse');
const asyncHandler = require('../middleware/async');
const Activity = require('../models/Activity');

exports.createActivity = asyncHandler(async (req, res, next) => {
  const { name, moduleId, courseId } = req.body;

  const user = await Activity.create({
    name,
    moduleId,
    courseId,
  });


  //we need to send body parser for that so send it in the server,js
  
  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.fetchActivities = asyncHandler(async (req, res, next) => {
  const Modules = await Activity.find();

  res.status(200).json({ success: true, count: Modules.length, data: Modules });
});


exports.fetchActivityByCourseId = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.courseId) {
    query = Activity.find({ courseId: req.params.courseId });
  } else {
    query = Activity.find();
  }
  const activity = await query;

  res.status(200).json({
    success: true,
    count: activity.length,
    data: activity,
  });
});

exports.fetchActivityBymoduleId = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.moduleId) {
    query = Activity.find({ moduleId: req.params.moduleId });
  } else {
    query = Activity.find();
  }
  const activity = await query;

  res.status(200).json({
    success: true,
    count: activity.length,
    data: activity,
  });
});