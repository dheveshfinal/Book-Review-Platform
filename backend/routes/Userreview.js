const express = require("express");
const router = express.Router();
const { setdb } = require("../pg");
const { ObjectId } = require("mongodb");

// GET all reviews of a user with book title
router.get("/Userreview/:id", async (req, res) => {
  try {
    const db = setdb();
    const userId = req.params.id;

    // Convert to ObjectId
    const userIdObj = new ObjectId(userId);

    // 1️⃣ Get all reviews by this user
    const reviews = await db.collection("Review").find({ userId: userIdObj }).toArray();
    if (reviews.length === 0) return res.json({ reviews: [] });

    // 2️⃣ Extract bookIds
    const bookIds = reviews.map(r => new ObjectId(r.bookId));

    // 3️⃣ Get books with those IDs
    const books = await db.collection("Book").find({ _id: { $in: bookIds } }).toArray();

    // 4️⃣ Merge book title into each review
    const merged = reviews.map(r => {
      const book = books.find(b => b._id.toString() === r.bookId.toString());
      return {
        _id: r._id,
        Title: book?.Title || "N/A",
        reviewText: r.reviewText,
        rating: r.rating,
      };
    });

    res.json({ reviews: merged });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// PUT: update a review
router.put("/Userreview/:reviewId", async (req, res) => {
  try {
    const db = setdb();
    const { reviewId } = req.params;
    const { reviewText, rating } = req.body;

    await db.collection("Review").updateOne(
      { _id: new ObjectId(reviewId) },
      { $set: { reviewText, rating } }
    );

    res.json({ message: "Review updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE: delete a review
router.delete("/Userreview/:reviewId", async (req, res) => {
  try {
    const db = setdb();
    const { reviewId } = req.params;

    await db.collection("Review").deleteOne({ _id: new ObjectId(reviewId) });
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
