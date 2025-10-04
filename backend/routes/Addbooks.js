const express = require("express");
const router = express.Router();
const { setdb } = require("../pg");
const { ObjectId } = require("mongodb");

router.post("/adddata/:id", async (req, res) => {
  try {
    const db = setdb();
    const data = req.body;
    const { id } = req.params;

    const newBook = {
      Title: data.Title,
      Author: data.Author,
      Description: data.Description,
      Genre: data.Genre,
      PublishedYear: parseInt(data.PublishedYear),
      AddedBy: new ObjectId(id),
      CreatedAt: new Date()
    };

    const result = await db.collection("Book").insertOne(newBook);

    res.status(201).json({ message: "Book added successfully", bookId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
