const express = require("express");
const router = express.Router();
const objectService = require("../service/comment_service");

router.use(express.json());

router.get("/unapproved/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    res.status(200).json(objectService.getUnapprovedByObjectId(id));
  } catch {
    res.status(404).json({ error: "Object not found" });
  }
})

router.get("/acceptedComments/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    res.status(200).json(objectService.getAcceptedByRentalId(id));
  } catch {
    res.status(404).json({ error: "Object not found" });
  }
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    res.status(200).json(objectService.getByRentalId(id));
  } catch {
    res.status(404).json({ error: "Object not found" });
  }
});

router.get("/", (req, res) => {
  res.json(objectService.getAll());
});

router.post("/", (req, res) => {
  const object = req.body;
  try {
    objectService.create(object);
    res.status(200).json({ message: "Comment created successfully" });
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

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const comm = req.body;
  try{
    res.status(200).json(objectService.update(id,comm))
  } catch {
    res.status(404).json({ error: "Object not found" });
  }
});

module.exports = router;
