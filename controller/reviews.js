const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../models/Reviews");
const Bootcamp = require("../models/Bootcamps");

// @desc Get all reviews
// @route GET /api/v1/reviews
// @route GET /api/v1/bootcamps/:bootcampId/reviews
// @access Public
exports.getReviews = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
      const reviews =await Review.find({bootcamp: req.params.bootcampId})
  
      return res.status(200).json({
        success: true,
      count: reviews.length,
      data: reviews,
      })
    }
    else {
      return res.status(200).json(res.advancedResults)
      
    }
    const courses = await query;
  
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  });