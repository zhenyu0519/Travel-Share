const HttpError = require("../util/http-error");
const { validationResult } = require("express-validator");
// to hash the password
const bcrypt = require("bcryptjs");
// import User schema
const User = require("../models/user");

// get users api
const getUsers = async (req, res, next) => {
  let users;
  try {
    // get user info without password
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Fetching user failed!", 500));
  }
  // response with user info and convert document id from _id to id
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

// user sign up api
const signup = async (req, res, next) => {
  // validate input data, this correspond to the check in user route file
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your input data", 422)
    );
  }
  // get request params
  const { name, email, password } = req.body;
  // check if the signup user existing in database by email
  try {
    let existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return next(new HttpError("User already existed!", 422));
    }
  } catch (err) {
    return next(new HttpError("Find user failed!", 500));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError("Can not create user, please try again!", 500));
  }

  // created new user base on User schema
  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    hashedPassword,
    places: [],
  });
  // save the created user to database
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up user failed!", 500);
    return next(error);
  }
  // response the new created user when sign up successfully
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

// user login api
const login = async (req, res, next) => {
  const { email, password } = req.body;
  // find user by email
  let existingUser = await User.findOne({ email: email });
  try {
    // if user is not existing or password is not correct then return error
    if (!existingUser || existingUser.password !== password) {
      return next(
        new HttpError("Invalid credentials, could not log you in.", 500)
      );
    }
  } catch (err) {
    return next(new HttpError("Find user failed", 500));
  }
  // if login successfully then response with successful message
  res.json({
    message: "logged in!",
    user: existingUser.toObject({ getters: true }),
  });
};

// export user controllers
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
