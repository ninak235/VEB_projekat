const express = require("express");
const router = express.Router();
const locationService = require("../service/location_service");

router.use(express.json());

router.get("/", (req, res) => {
  res.json(locationService.getAll());
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    res.status(200).json(locationService.getById(id));
  } catch {
    res.status(404).json({ error: "Location not found" });
  }
});

module.exports = router;
