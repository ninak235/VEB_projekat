const express = require("express");
const router = express.Router();
const objectService = require("../service/rental_object_service");

router.use(express.json());

router.get("/", (req, res) => {
  res.json(objectService.getAll());
});

router.get("/sortedCars", (req, res) => {
  res.json(objectService.getSortedCars());
});

router.get("/sortedAsc", (req, res) => {
  const sortingParam = req.query.sortingParam;
  res.json(objectService.getSortedAsc(sortingParam));
});

router.get("/sortedDesc", (req, res) => {
  const sortingParam = req.query.sortingParam;
  res.json(objectService.getSortedDesc(sortingParam));
});

router.get("/available", (req, res) => {
  const { dateFrom, dateTo, priceFrom, priceTo } = req.query;
  res.json(objectService.getAvailable(dateFrom, dateTo, priceFrom, priceTo));
});

router.get("/search", (req, res) => {
  const { name, vehichleType, locationName, grade } = req.query;
  res.json(
    objectService.getSearchedObjects(name, vehichleType, locationName, grade)
  );
});

router.get("/filter", (req, res) => {
  const { transmissionType, fuelType } = req.query;
  res.json(objectService.getFilteredObjects(transmissionType, fuelType));
});

router.post("/", (req, res) => {
  const object = req.body;
  try {
    res.status(200).json(objectService.create(object));
  } catch (error) {
    res.status(500).json({ error: "Failed to create rental object" });
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

router.put("/vehicleUpdated/:idV/:idC", (req, res) => {
  const vehicleId = parseInt(req.params.idV, 10);
  const carId = parseInt(req.params.idC, 10);
  const updatedData = req.body;
  try {
    res.status(200).json(objectService.vehicleUpdated(vehicleId, carId, updatedData));
  } catch {
    res.status(404).json({ error: "Vehicle didn't update" });
  }
});

router.put("/vehicleAdded/:id", (req,res) => {
  const id = parseInt(req.params.id, 10);
  const vehicle = req.body;
  try{
    res.status(200).json(objectService.vehicleAdded(id,vehicle))
  } catch{
    res.status(404).json({error: "Vehicle didn't added"})
  }
})

router.put("/addedGrade/:id", (req,res) => {
  console.log(" usao");
  const id = parseInt(req.params.id, 10);
  const grade = req.body.grade;
  console.log("grade u controlleru:", grade);
  try{
    res.status(200).json(objectService.gradeAdded(id,grade))
  } catch{
    res.status(404).json({error: "Object hasn't been found"})
  }
})

router.delete("/vehicle/:idV/:idC", (req, res) => {
  const vehicleId =parseInt(req.params.idV, 10);
  const carId = parseInt(req.params.idC,10);
  try {
      objectService.removeVehicle(vehicleId, carId);
      res.status(200).json({ message: "Vehicle deleted successfully" });
    }
  catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
