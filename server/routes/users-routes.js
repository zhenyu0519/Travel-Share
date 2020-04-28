const express = require("express");

const userControllers = require("../controller/user-controllers");

const router = express.Router();

router.get("/", userControllers.getUsers);

router.post("/signup", userControllers.signup);

router.post("/login", userControllers.login);

module.exports = router;
