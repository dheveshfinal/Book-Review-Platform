const express = require("express");
const router = express.Router();
const { setdb } = require("../pg");
const { ObjectId } = require("mongodb"); // import ObjectId

// POST /bookreview/:bookId
router.post("/bookreview/:bookId", async (req, res) => {
  try {
    const db = await setdb();
    const { bookId } = req.params;          // Book being reviewed
    const { userId, reviewText, rating } = req.body; // Data from frontend

    if (!userId || !reviewText || !rating) {
      return res.status(400).json({ message: "userId, reviewText, and rating are required" });
    }

    // Convert userId and bookId to ObjectId
    const newReview = {
      bookId: new ObjectId(bookId),
      userId: new ObjectId(userId),
      reviewText,
      rating: parseInt(rating),
      createdAt: new Date(),
    };

    const result = await db.collection("Review").insertOne(newReview);

    res.json({ message: "Review submitted successfully", reviewId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
