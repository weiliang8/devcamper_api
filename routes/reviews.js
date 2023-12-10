const express = require("express");
const {
  getReviews
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
  )
 

module.exports = router;
