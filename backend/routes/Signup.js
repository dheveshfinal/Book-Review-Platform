const express = require("express");
const router = express.Router();
const { setdb } = require("../pg"); 
const bcrypt = require("bcryptjs"); 

router.post("/signup", async (req, res) => {
  try {
    const data = req.body; 

    if (!data.Name || !data.email || !data.password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const db = setdb(); 
    const usersCollection = db.collection("User");

   
    const existingUser = await usersCollection.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

   
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const result = await usersCollection.insertOne({
      name: data.Name,
      email: data.email,
      password: hashedPassword
    });

    if (result.insertedId) {
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
