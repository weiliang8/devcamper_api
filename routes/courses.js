const express = require('express')
const { getCourse,getCourses, addCourse, updateCourse,deleteCourse } = require('../controller/courses.js')

const Course = require('../models/Courses.js')
const advancedResults = require('../middleware/advancedResults.js')

const router = express.Router({ mergeParams: true });

router
.route('/')
.get(advancedResults(Course,{
    path: 'bootcamp',
    select: 'name description'}),getCourses)
.post(addCourse);

router
.route('/:id')
.get(getCourse)
.put(updateCourse)
.delete(deleteCourse);

module.exports = router