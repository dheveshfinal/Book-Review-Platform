
const express = require("express");
const router = express.Router();
const { setdb } = require("../pg"); 

// GET /bookinfo?page=1&limit=5
router.get("/bookinfo", async (req, res) => {
  try {
    const db = await setdb();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const books = await db
      .collection("Book")
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection("Book").countDocuments();

    
    res.json({
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
