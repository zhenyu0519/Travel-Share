const HttpError = require("../util/http-error");
const { validationResult } = require("express-validator");
// import the address to coordinate converter
const getCoordsForAddress = require("../util/location");
// import Place controller
const Place = require("../models/place");
// import User controller
const User = require("../models/user");
// import mongoose
const mongoose = require("mongoose");
// import file style
const fs = require("fs");

// get place by place id api
const getPlaceById = async (req, res, next) => {
  // get place id from url
  const placeId = req.params.pid;
  let place;
  try {
    // find place in database by placeId
    place = await Place.findById(placeId);
    if (!place) {
      return next(
        new HttpError("Can not find the place for provided id!", 404)
      );
    }
  } catch (err) {
    return next(new HttpError("Can not find a place!", 500));
  }
  res.json({ place: place.toObject({ getters: true }) });
};

// get places by user id api
const getPlacesByUserId = async (req, res, next) => {
  // get user id
  const userId = req.params.uid;
  // let places;
  let userWithPlaces;
  try {
    // get user with places, places is from other table here we use populate to fecth it
    // places = await Place.find({ creator: userId });
    userWithPlaces = await User.findById(userId).populate("places");
  } catch (err) {
    return next(new HttpError("Fetching Places failed!", 500));
  }
  // if (!places || places.length === 0) {
  if (!userWithPlaces || userWithPlaces.length === 0) {
    return next(
      new HttpError("Can not find the places by provided user id!", 404)
    );
  }
  res.json({
    places: userWithPlaces.places.map((place) => {
      return place.toObject({ getters: true });
    }),
    creator: userWithPlaces.name,
  });
};

// create a new place api
const createPlace = async (req, res, next) => {
  // validate input based on place route check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // thorw is not working async function, change to next here
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }
  // get params from request
  const { title, description, address, creator } = req.body;
  // convert location address to coordinates
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }
  // created place based on place schema
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path,
    creator,
  });
  // find if the creator from request is existing database otherwise the creator is wrong
  let user;
  try {
    user = await User.findById(creator);
    if (!user) {
      return next(new HttpError("Can not find user for provided id!", 404));
    }
  } catch (err) {
    return next(new HttpError("Finding User failed!", 500));
  }

  // when created a new place, insert the creator to place table and in the meanwhile,
  // also need to insert the new place to the user table,
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPlace.save({ session: session });
    user.places.push(createdPlace);
    await user.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    return next(new HttpError("Creating place failed, please try again!", 500));
  }
  res.status(201).json({ createdPlace });
};

// update place api
const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your input data!", 422)
    );
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  // find place from database
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(new HttpError("Can not find place!", 500));
  }

  // check if the place creater is logined user
  if (place.creator.toString() !== req.userData.userId) {
    throw next(new HttpError("You are not allowed to edit this place", 401));
  }

  // update title and description
  place.title = title;
  place.description = description;

  // save the updated data
  try {
    await place.save();
  } catch (err) {
    return next(new HttpError("Can not update place!", 500));
  }
  res.status(200).json({ place: place.toObject({ getters: true }) });
};

// delete place api
const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  let placeWithCreator;
  try {
    placeWithCreator = await Place.findById(placeId).populate("creator");
    if (!placeWithCreator) {
      return next(new HttpError("Could not find place for this id!", 404));
    }
  } catch (err) {
    return next(new HttpError("Could not find place with creator!", 500));
  }

  if (placeWithCreator.creator.id !== req.userData.userId) {
    throw next(new HttpError("You are not allowed to edit this place", 401));
  }

  const imagePath = placeWithCreator.image;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await placeWithCreator.remove({ session: session });
    placeWithCreator.creator.places.pull(placeWithCreator);
    await placeWithCreator.creator.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    return next(new HttpError("could not delete place", 500));
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Deleted the place" });
};

// export places controllers
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
