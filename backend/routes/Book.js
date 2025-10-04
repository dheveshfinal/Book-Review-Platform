const express = require("express");
const router = express.Router();
const { setdb } = require("../pg");
const { ObjectId } = require("mongodb");

router.get("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = setdb();

    const books = await db
      .collection("Book")
      .find({ AddedBy: new ObjectId(id) })
      .toArray();

    if (books.length === 0) {
      return res.json({ message: "No books found!" });
    }

    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
