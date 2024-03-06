const express = require("express");
const router = express.Router();
const objectService = require("../service/order_service");

router.use(express.json());

router.get("/filteredOrders", (req, res) => {
  const { dateFrom, dateTo, priceFrom, priceTo, rentalId } = req.query;
  const id = parseInt(rentalId);
  res.json(objectService.getFilteredOrders(id, dateFrom, dateTo, priceFrom, priceTo));
});

router.get("/sortedAsc", (req, res) => {
  const { sortingParam, rentalId} = req.query;
  res.json(objectService.getSortedAsc(sortingParam, rentalId));
});

router.get("/sortedDesc", (req, res) => {
  const { sortingParam, rentalId} = req.query;
  res.json(objectService.getSortedDesc(sortingParam, rentalId));
});

router.get("/userOrders/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  try{
    res.json(objectService.getByUser(id));
  }
  catch(error){
    res.status(500).json({ error: "Failed to find user orders"});
  }
})
router.post("/", (req, res) => {
  const object = req.body;
  try {
    console.log("controller");
    objectService.create(object);
    console.log("controller");
    res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
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

router.get("/rentalOrders/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    res.status(200).json(objectService.getOrdersByRentalId(id));
  } catch {
    res.status(404).json({ error: "Object not found" });
  }
});

router.delete("/:id", (req, res) => {
  const id =parseInt(req.params.id, 10);
  console.log("id", id);
  try {
      objectService.remove(id);
      res.status(200).json({ message: "Order canceled successfully" });
    
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", (req,res) => {
  const id = parseInt(req.params.id, 10);
  const order = req.body;
  try{
    res.status(200).json(objectService.update(id,order))
  } catch{
    res.status(404).json({error: "Order didn't updated"})
  }
})


module.exports = router;
