const express = require("express");
const {
  getReviews,
  getReview,
  addReview
} = require("../controller/reviews.js");

const Review = require("../models/Reviews.js");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults.js");
const { protect,authorize} = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description",
    }),
    getReviews
  ).post(protect, authorize('user','admin'),addReview)
 
router.route('/:id')
.get(getReview)

module.exports = router;
