const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();
router.post("/signup", authController.signUp);

module.exports = router;
