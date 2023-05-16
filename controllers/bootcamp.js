const path = require('path');
const ErrorResponse = require('../utlis/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utlis/geocoder');
const Bootcamp = require('../models/Bootcamp');

//@desc   Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access    Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  //advance filtering and this is actually for to put the $ sign for the average cost

  res.status(200).json(res.advancedResults);
});

//@desc   Get single bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access    Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

//@desc   Create  bootcamps
//@route    POST /api/v1/bootcamps
//@access    private
exports.createBootcamp = asyncHandler(async (req, res, next) => {

  const {firstName,email,mmobile,dob,gender,accceptGi}=req.body;

  const bootcampp = await Bootcamp.create({
firstName:firstName,
acceptGi,
  }); //we need to send body parser for that so send it in the server,js

  res.status(201).json({
    success: true,
    data: bootcampp,
  });
});

//@desc   Update bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access    Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

//@desc   Delete bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access    Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${req.params.id}`,
        404
      )
    );
  }
  //this will trigger that remove middleware
  res.status(200).json({
    success: true,
    data: {},
  });
});

//@desc   Get bootcamp witin a radius
//@route    GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access    Private
exports.getBootcampInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  //Get the lat/lng from geocoder

  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //calculate radius using radians
  //divide dist by radius of Earth
  //Earth radius =3963 mi/6378 km

  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

//@desc   Upload photo for bootcamp
//@route   Put /api/v1/bootcamps/:id/photo
//@access    Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${req.params.id}`,
        404
      )
    );
  }
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file `, 400));
  }
  // console.log(req.files);

  const file = req.files.file;

  //Make sure the image is a photo

  if (!file.minetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file `, 400)); //didnt get that error
  }

  // CHECK FILE SIZE
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image LESS THAN ${process.env.MAX_FILE_UPLOAD} `,
        400
      )
    );
  }

  //create custom filename ,so that noone override the name the of the file

  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);

      return next(new ErrorResponse(`Problem with file uplad  `, 500));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });

  console.log(file.name); //didnt get the file name
});
