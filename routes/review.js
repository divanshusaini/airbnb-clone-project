const express = require("express");
const  router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isreviewAuthor}= require("../middleware.js");

const reviewController = require("../controllers/reviews.js")


//post review route
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.createReview));

//delete Review route 
router.delete("/:reviewId",isLoggedIn,isreviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;