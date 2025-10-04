const express = require("express");
const router = express.Router();
const { setdb } = require("../pg");
const { ObjectId } = require("mongodb");

router.put("/booksave/:id", async (req, res) => {
  try {
    const db = setdb();
    const { id } = req.params;
    const data = req.body;

    const result = await db.collection("Book").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          Title: data.Title,
          Author: data.Author,
          Description: data.Description,
          Genre: data.Genre,
          PublishedYear: data.PublishedYear,
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/bookdelete/:id", async (req, res) => {
  try {
    const db = setdb();
    const { id } = req.params;

    const result = await db.collection("Book").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
