const express = require("express");
const router = express.Router();
const userService = require("../service/upload_file_service");

router.post("/", (req, res) => {
  const id = req.user.id;
  try {
    res.status(200).json(userService.getById(id));
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});

router.put("/", (req, res) => {
  const id = req.user.id;
  try {
    const user = userService.getById(id);
    if (user) {
      if (req.body.username) {
        user.username = req.body.username;
      }
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.lastName) {
        user.lastName = req.body.lastName;
      }
      if (req.body.gender) {
        user.gender = req.body.gender;
      }
      if (req.body.dateOfBirth) {
        user.dateOfBirth = req.body.dateOfBirth;
      }

      userService.update(id, user);
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found to update" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
