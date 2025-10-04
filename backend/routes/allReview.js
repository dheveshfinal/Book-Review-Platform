const express = require("express");
const router = express.Router();
const { setdb } = require("../pg");
const { ObjectId } = require("mongodb");

// GET all books with their reviews
router.get("/allreview", async (req, res) => {
  try {
    const db = setdb();

    
    const books = await db.collection("Book").find({}).toArray();

   
    const bookIds = books.map(b => new ObjectId(b._id));

  
    const reviews = await db.collection("Review").find({ bookId: { $in: bookIds } }).toArray();

    res.json({ books, reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
