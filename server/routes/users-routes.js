// This file is to match each user route to correspond controller(rest api)
const express = require("express");
// input validation library
const { check } = require("express-validator");
// import user controller
const userControllers = require("../controller/user-controllers");

const router = express.Router();
// get all users
router.get("/", userControllers.getUsers);
// user sign up
router.post(
  "/signup",
  // input validation
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userControllers.signup
);
// user login
router.post("/login", userControllers.login);

module.exports = router;
