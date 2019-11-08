const Courses = require('../models/Courses');
const asyncHandler = require('../middlewares/async');

// @desc    Get all the courses or get all courses for a specific bootcamp.
// @route   GET /api/v1/course
// @router  GET /api/v1/bootcamps/:bootcampId/course
// @access  Public
const getCourses = asyncHandler(async (req,res,next) => {
    let query;
  if(req.params.bootcampId) {
      query = Courses.find({ bootcamp: req.params.bootcampId });
  } else {
      query = Courses.find();
  }
  const courses = await query;
  res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
  });
});

const getSingleCourse = asyncHandler(async (req,res,next) => {
    res.status(200).json({ success: true, data: {message: `Getting one course for id ${req.params.id}`}});
});

const addCourses = asyncHandler(async (req,res,next) => {
    res.status(200).json({ success: true, data: {message: `Adding one course`}});
});

const updateCourses = asyncHandler(async (req,res,next) => {
    res.status(200).json({ success: true, data: {message: `Updating one course for id ${req.params.id}`}});
});

const deleteCourses = asyncHandler(async (req,res,next) => {
    res.status(200).json({ success: true, data: {message: `Deleting one course for id ${req.params.id}`}});
});


module.exports = {
    getCourses,
    getSingleCourse,
    addCourses,
    updateCourses,
    deleteCourses
}
