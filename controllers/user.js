const ErrorResponse = require('../utlis/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/user');

exports.createUser = asyncHandler(async (req, res, next) => {
  const { name, email, phone, dob, gender } = req.body;

  const user = await User.create({
    name,
    email,
    phone,
    dob,
    gender,
  }); //we need to send body parser for that so send it in the server,js

  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.userLogin = asyncHandler(async (req, res, next) => {
  const { phone } = req.body;

  const user = await User.findOne({ phone });

  if (!user) {
    return next(
      new ErrorResponse(
        `User not found with this number of ${req.params.phone} ,register yourself`,
        404
      )
    );
  } else {
    return res.status(201).json({
      success: true,
      data: user,
    });
  }
});

exports.fetchUsers = asyncHandler(async (req, res, next) => {
  const Users = await User.find();

  res.status(200).json({ success: true, count: Users.length, data: Users });
});

exports.add = asyncHandler(async (req, res, next) => {
  const { userId, courseId, value } = req.body;

  let user;
  if (value) {
    user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { wishlistCoursesIds: courseId },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }else{

 user = await User.findByIdAndUpdate(
   userId,
   {
     $pull: { wishlistCoursesIds: courseId },
   },
   {
     new: true,
     runValidators: true,
   }
 );

  }

  

  res.status(201).json({
    success: true,
    data: user,
  });
});

exports.isEnrolled = asyncHandler(async (req, res, next) => {
   const { userId, courseId, value } = req.body;

   let user;
   if (value) {
     user = await User.findByIdAndUpdate(
       userId,
       {
         $addToSet: { enrolledCourses: courseId },
       },
       {
         new: true,
         runValidators: true,
       }
     );
   } else {
     user = await User.findByIdAndUpdate(
       userId,
       {
         $pull: { enrolledCourses: courseId },
       },
       {
         new: true,
         runValidators: true,
       }
     );
   }

   res.status(201).json({
     success: true,
     data: user,
   });
});
