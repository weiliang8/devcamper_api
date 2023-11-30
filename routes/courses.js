const express = require('express')
const { getCourses } = require('../controller/courses.js')

const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses);

module.exports = router