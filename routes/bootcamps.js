const express = require('express')
const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius,bootcampPhotoUpload } = require('../controller/bootcamps.js')

const Bootcamp = require('../models/Bootcamps.js')

const advancedResults = require('../middleware/advancedResults.js')

// INCLUDE OTHER RESOURCES ROUTERS
const courseRouter = require('./courses.js')

const router = express.Router();

// RE-ROUTE INTO OTHER RESOURCE ROUTERS
router.use('/:bootcampId/courses', courseRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router.route('/:id/photo')
  .put(bootcampPhotoUpload)

router.route('/')
  .get(advancedResults(Bootcamp,'courses'),getBootcamps)
  .post(createBootcamp);

router.route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp)

module.exports = router;