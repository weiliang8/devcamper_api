const express = require("express");
const {
  getCourse,
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controller/courses.js");

const Course = require("../models/Courses.js");
const advancedResults = require("../middleware/advancedResults.js");

const router = express.Router({ mergeParams: true });

const { protect,authorize} = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect,authorize('publisher','admin'), addCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(protect,authorize('publisher','admin'), updateCourse)
  .post(protect,authorize('publisher','admin'), addCourse)
  .delete(protect, deleteCourse);

module.exports = router;
