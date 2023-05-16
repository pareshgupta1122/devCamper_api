const ErrorResponse = require('../utlis/errorResponse');
const asyncHandler = require('../middleware/async');
const Module = require('../models/Module');

exports.createModule = asyncHandler(async (req, res, next) => {
  const { name, numberOfLessons,courseId} = req.body;


  const model = await Module.create({
  name,
  numberOfLessons,
   courseId
  }); 

  //we need to send body parser for that so send it in the server,js

  res.status(201).json({
    success: true,
    data: model,
  });
});


exports.fetchModules = asyncHandler(async (req, res, next) => {
  const Modules = await Module.find();

  res
    .status(200)
    .json({ success: true, count: Modules.length, data: Modules });
});


exports.fetchModuleByCourseId = asyncHandler(async (req, res, next) => {
  
     let query;

     if (req.params.courseId) {
       query = Module.find({ courseId: req.params.courseId });
     } else {
       query = Module.find();
     }
     const modules = await query;

     res.status(200).json({
       success: true,
       count: modules.length,
       data: modules,
     });
});