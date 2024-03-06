const express = require("express");
const router = express.Router();
const userService = require("../service/user_service");

router.get("/sortedAsc", (req, res) => {
  const sortingParam = req.query.sortingParam;
  res.json(userService.getSortedAsc(sortingParam));
});

router.get("/sortedDesc", (req, res) => {
  const sortingParam = req.query.sortingParam;
  res.json(userService.getSortedDesc(sortingParam));
});

router.get("/filter", (req, res) => {
  const { userRole, nameType } = req.query;
  res.json(userService.getFilteredObjects(userRole, nameType));
});

router.get("/allCustomers/:id", (req, res) => {
  const id = req.user.id;
  try {
    res.status(200).json(userService.getCustomersByManagerId(id));
  } catch (error) {
    res.status(404).json({ error: "Users not found" });
  }
});

router.get("/allUsers", (req, res) => {
  try {
    res.status(200).json(userService.getAll());
  } catch (error) {
    res.status(404).json({ error: "Users not found" });
  }
});

router.get("/orders", (req, res) => {
  const id = req.user.id;
  console.log("id:", id);
  try {
    res.status(200).json(userService.getOrdersByUserId(id));
  } catch (error) {
    res.status(404).json({ error: "Orders not found" });
  }
});

router.get("/availableManagers", (req, res) => {
  try {
    res.status(200).json(userService.getAvailableManagers());
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});


router.get("/suspisiousCustomers", (req, res) => {
  try {
    res.status(200).json(userService.getSuspisiousCustomers());
  } catch (error) {
    res.status(404).json({ error: "Users not found" });
  }
});

router.get("/", (req, res) => {
  const id = parseInt(req.user.id, 10);
  try {
    res.status(200).json(userService.getById(id));
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
});

router.put("/menagerUpdate", (req, res) => {
  const updatedManager = req.body;
  try{
      res.status(200).json(userService.update(updatedManager.id, updatedManager));
    } 
  catch {
      res.status(404).json({ error: "Manager not found to update" });
    }
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { profile } = req.body;
  try{
    res.status(200).json(userService.update(id,profile))
  } catch{
    res.status(404).json({error: "Order didn't updated"})
  }
})




router.put("/", (req, res) => {
  const id = parseInt(req.user.id, 10);
  console.log("id"+id);
  try {
    const user = userService.getById(id);
    cons
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
      if (req.body.rentalObject) {
        user.rentalObject = req.body.rentalObject;
      }
      if (req.body.pointsNumber) {
        user.pointsNumber = req.body.pointsNumber;
      }
      if (req.body.rentals) {
        user.rentals = req.body.rentals;
      }
      if (req.body.blocked) {
        user.blocked = req.body.blocked;
      }
      if (req.body.rejectedNum) {
        user.rejectedNum = req.body.rejectedNum;
      }
      if (req.body.customerType) {
        user.customerType = req.body.customerType;
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
