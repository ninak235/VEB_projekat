const express = require("express");
const router = express.Router();
const vechicleService = require("../service/vehicle_service");

router.use(express.json());

router.get("/", (req, res) => {
  res.json(vechicleService.getAll());
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    res.status(200).json(vechicleService.getById(id));
  } catch {
    res.status(404).json({ error: "Object not found" });
  }
});

router.post("/:id", (req, res) => {
  const vehicle = req.body;
  const id = parseInt(req.params.id, 10);
  try {
    vechicleService.create(vehicle, id);
    res.status(200).json({ message: "Vehicle created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create vehicle" });
  }
});

router.put("/:idV/:idC", (req, res) => {
  const vehicleId = parseInt(req.params.idV, 10);
  const carId = parseInt(req.params.idC, 10);
  const updatedData = req.body;
  const updatedVehicle = vechicleService.update(vehicleId, updatedData, carId);

  if (!updatedVehicle) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  res.json(updatedVehicle);
});

router.delete("/:idV/:idC", (req, res) => {
    const vehicleId =parseInt(req.params.idV, 10);
    const carId = parseInt(req.params.idC,10);
    try {
      var vehicle = vechicleService.getById(vehicleId);

      if(vehicle)
      {
        vechicleService.remove(vehicleId, carId);
        res.status(200).json({ message: "Vehicle deleted successfully" });
      }else {
        res.status(404).json({ error: "Vehicle not found" });
      }
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  });


router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    var vehicle = vechicleService.getById(vehicleId);

    if (vehicle) {
      vechicleService.remove(vehicleId, carId);
      res.status(200).json({ message: "Vehicle deleyed successfully" });
    } else {
      res.status(404).json({ error: "Vehicle not found" });
    }
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/orderedVehicles/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  console.log("cao1");
  try {
    res.status(200).json(vechicleService.getOrderedVehiclesByRentalId(id));
  } catch {
    res.status(404).json({ error: "Object not found" });
  }
});



module.exports = router;
