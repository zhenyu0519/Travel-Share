// This file is to match each places route to correspond controller(rest api)
const express = require("express");
const { check } = require("express-validator");
// import place controller
const placeControllers = require("../controller/places-controllers");
const fileUpload = require("../middleware/file-upload");
// import checkAuth middleware
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
// get place by place id
router.get("/:pid", placeControllers.getPlaceById);
// get place by user id
router.get("/user/:uid", placeControllers.getPlacesByUserId);

// add middleware to check token for below request
router.use(checkAuth);

// create place
router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
    check("creator").not().isEmpty(),
  ],
  placeControllers.createPlace
);
// update place by place id
router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placeControllers.updatePlace
);
// delete place by place id
router.delete("/:pid", placeControllers.deletePlace);

module.exports = router;
