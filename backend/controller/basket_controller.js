const express = require("express");
const router = express.Router();
const objectService = require("../service/basket_service");

router.use(express.json());

router.get("/", (req, res) => {
  res.json(objectService.getAll());
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    res.status(200).json(objectService.getByUserId(id));
  } catch {
    res.status(404).json({ error: "Object not found" });
  }
});

router.post("/", (req, res) => {
  const object = req.body;
  try {
    objectService.create(object);
    res.status(200).json({ message: "Basket created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create basket" });
  }
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    res.status(200).json(objectService.getById(id));
  } catch {
    res.status(404).json({ error: "Object not found" });
  }
});

router.delete("/:id", (req, res) => {
  const basketId =parseInt(req.params.id, 10);
  try {
      objectService.remove(basketId);
      res.status(200).json({ message: "Basket deleted successfully" });
    
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
