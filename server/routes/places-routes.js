// This file is to match each places route to correspond controller(rest api)
const express = require("express");
const { check } = require("express-validator");
// import place controller
const placeControllers = require("../controller/places-controllers");

const router = express.Router();
// get place by place id
router.get("/:pid", placeControllers.getPlaceById);
// get place by user id
router.get("/user/:uid", placeControllers.getPlacesByUserId);
// create place
router.post(
  "/",
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
