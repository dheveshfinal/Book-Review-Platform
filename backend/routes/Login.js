const express = require("express");
const router = express.Router();
const { setdb } = require("../pg");
const bcrypt = require("bcryptjs");


router.post("/login", async (req, res) => {
  try {
    const data = req.body; 
    const db = setdb(); 


    const user = await db.collection("User").findOne({ email: data.email }); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }


    res.status(200).json({
      message: "Login successful",
      id:user._id.toString(),        
      name: user.name       
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
