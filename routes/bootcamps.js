const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controller/bootcamps.js");

const Bootcamp = require("../models/Bootcamps.js");

// INCLUDE OTHER RESOURCES ROUTERS
const courseRouter = require("./courses.js");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults.js");
const { protect,authorize} = require("../middleware/auth");

// RE-ROUTE INTO OTHER RESOURCE ROUTERS
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route("/:id/photo").put(protect,authorize('publisher','admin'), bootcampPhotoUpload);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect,authorize('publisher','admin'), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect,authorize('publisher','admin'), updateBootcamp)
  .delete(protect,authorize('publisher','admin'), deleteBootcamp);

module.exports = router;
