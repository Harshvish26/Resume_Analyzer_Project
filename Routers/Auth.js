const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");

// Register
router.post("/register", async (req, res) => {
  const { name, email, field, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, field, password: hashedPassword });
    await newUser.save();

    res
      .status(201)
      .json({
        message: "User registered successfully",
        newUser,
        Success: true,
      });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
