const express = require("express");
const router = express.Router();
const userService = require("../service/user_service");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  const { username } = req.body;
  try {
    const existingUser = userService
      .getAll()
      .find((user) => user.username === username);

    if (existingUser) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    userService.create(req.body);

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to create user" });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = userService.getByUsername(username);
    const userRole = existingUser.userRole;
    if (existingUser && password == existingUser.password) {
      const token = jwt.sign(
        { id: existingUser.id, username, userRole },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        }
      );
      res
        .status(200)
        .json({ message: "User logged in successfully", token, userRole });
      return;
    } else {
      res.status(401).json({ error: "Wrong credentials" });
    }
  } catch {
    res.status(400).json({ error: "Failed to login" });
  }
});

module.exports = router;
