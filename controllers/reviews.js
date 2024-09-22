const Listing = require("../models/listing");
const Review = require("../models/review");

// post route 
module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);                      // find listing with the help of id
    let newReview = new Review(req.body.review);                              // we pass new review in req.body and pass to backend
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();                                                      // for save in any existing doc in dbs we use save
    await listing.save();
    req.flash("success", "New Review Created");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
    let {id, reviewId} = req.params;                
    Listing.findByIdAndUpdate(id, {$pull: { reviews: reviewId }}); // after delete review update listing so listing ke riviews array se review jo bhi riviewId se match hoga use delete kr denge
    await Review.findByIdAndDelete(reviewId);   // get review id and delete
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
};