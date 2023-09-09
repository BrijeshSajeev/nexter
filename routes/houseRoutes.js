const express = require("express");
const houseController = require("../controller/houseController");
const authController = require("../controller/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, houseController.getAllHouses)
  .post(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    // eslint-disable-next-line prettier/prettier
    houseController.addHouse
  );

router
  .route("/:id")
  .get(houseController.getHouse)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "manager", "user"),
    // eslint-disable-next-line prettier/prettier
    houseController.updateHouse
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "manager", "user"),
    // eslint-disable-next-line prettier/prettier
    houseController.deleteHouse
  );
module.exports = router;
