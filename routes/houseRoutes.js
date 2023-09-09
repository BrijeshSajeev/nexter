const express = require("express");
const HouseController = require("../controller/houseController");

const router = express.Router();

router
  .route("/")
  .get(HouseController.getAllHouses)
  .post(HouseController.addHouse);

router
  .route("/:id")
  .get(HouseController.getHouse)
  .patch(HouseController.updateHouse)
  .delete(HouseController.deleteHouse);
module.exports = router;
