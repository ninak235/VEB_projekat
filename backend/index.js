const express = require("express");
const cors = require("cors");
const userController = require("./controller/user_controller");
const rentalObjController = require("./controller/rental_object_controller");
const locationController = require("./controller/location_controller");
const authController = require("./controller/auth_controller");
const uploadFilesController = require("./controller/upload_file_controller");
const authMiddleWare = require("./middleware/auth");
const vehicleController = require("./controller/vehicle_controller");
const orderController = require("./controller/order_controller");
const basketController = require("./controller/basket_controller");
const commentController = require("./controller/comment_controller");

require("dotenv").config();

const app = express();

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(
  "/users",
  authMiddleWare(["Customer", "Manager", "Administrator"]),
  userController
);
app.use("/rentalObjects", rentalObjController);
app.use("/auth", authController);
app.use("/locations", locationController);
app.use("/images", uploadFilesController);
app.use("/vehicles", vehicleController);
app.use("/orders", orderController);
app.use("/baskets", basketController);
app.use("/comments", commentController);
app.listen(3000, () => console.log("Server running!"));
