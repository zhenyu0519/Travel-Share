const express = require("express");

const placeControllers = require("../controller/places-controllers");

const router = express.Router();

router.get("/:pid", placeControllers.getPlaceById);

router.get("/user/:uid", placeControllers.getPlacesByUserId);

router.post("/", placeControllers.createPlace);

router.patch("/:pid", placeControllers.updatePlace);

router.delete("/:pid", placeControllers.deletePlace);

module.exports = router;
