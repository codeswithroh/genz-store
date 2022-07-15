const express = require("express");
const router = express.Router();
const { registerUser, getUser } = require("../controllers/userControllers");

router.route("/register").post(registerUser);
router.route("/user").get(getUser);

module.exports = router;
