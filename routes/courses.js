const express = require('express')
const { getCourse,getCourses, addCourse } = require('../controller/courses.js')

const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses).post(addCourse);

router.route('/:id').get(getCourse);

module.exports = router