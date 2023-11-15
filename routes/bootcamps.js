const express = require('express')
const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp } = require('../controller/bootcamps.js')

const router = express.Router();

router.route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router.route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp)

module.exports = router;