const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require('../utils/geocoder')
const Bootcamp = require("../models/Bootcamps");

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
const getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // COPY REQ.QUERY
  const reqQuery = {...req.query}

  // FIELDS TO EXCLUDE
  const removeFields = ['select','sort','page','limit']

  // LOOP OVER removeFields and delete them from reqQuery
  removeFields.forEach(param =>delete reqQuery[param])

  // CREATE QUERY STRING
  let queryStr = JSON.stringify(reqQuery)

  // CREATE OPERATORS ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match=>`$${match}`)

  // FINDING RESOURCE
  query = Bootcamp.find(JSON.parse(queryStr))

  // SELECT FIELDS
  if(req.query.select){
    const fields=req.query.select.split(',').join(' ')
    query = query.select(fields)
  }

  // SORT
  if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ');
    query =query.sort(sortBy);
  }else{
    query = query.sort('createdAt')
  }

  // PAGINATION
  const page = parseInt(req.query.page,10)||1;
  console.log(page)
  const limit = parseInt(req.query.limit,10)||1;
  const startIndex = (page-1)*limit;
  const endIndex = page*limit
  const total = await Bootcamp.countDocuments();

  query= query.skip(startIndex).limit(limit)
  
  // EXECUTING QUERY
  const bootcamps = await query;

  // PAGINATION RESULT
  const pagination = {}

  if(endIndex<total){
    pagination.next = {
      page:page+1,
      limit
    }
  }

  if(startIndex>0){
    pagination.prev = {
      page: page-1,
      limit
    }
  }

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
});

// @desc Get single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public
const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  // HANDLE CORRECTLY FORMATTED BUT WRONG VALUE ID DATA
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc Create new bootcamp
// @route POST /api/v1/bootcamps
// @access private
const createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @desc Update bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access private
const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc Delete new bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access private
const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc Get bootcamps within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access private
const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // GET LAT/LNG FROM GECODER
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // CALC RADIUS USING RADIANS
  // DIVIDE DIST BY RADIUS OF EARTH
  // EARTH RADIUS = 3963mi / 6378km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  })
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  })
});

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
};
