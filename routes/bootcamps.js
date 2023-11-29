const express = require('express')
const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius } = require('../controller/bootcamps.js')

// INCLUDE OTHER RESOURCES ROUTERS
const courseRouter = require('./courses.js')

const router = express.Router();

// RE-ROUTE INTO OTHER RESOURCE ROUTERS
router.use('/:bootcampId/courses', courseRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router.route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router.route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp)

module.exports = router;