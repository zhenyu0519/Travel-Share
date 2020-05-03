const HttpError = require("../util/http-error");
const { validationResult } = require("express-validator");
// to hash the password
const bcrypt = require("bcryptjs");
// import User schema
const User = require("../models/user");
// import jwt
const jwt = require("jsonwebtoken");

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
    return next(new HttpError("Signing up user failed!", 500));
  }

  // generate token
  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "jeffrey_secret_key",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError("Signing up user failed!", 500));
  }

  // response the new created user when sign up successfully
  res
    .status(201)
    .json({
      userId: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      token: token,
    });
};

// user login api
const login = async (req, res, next) => {
  const { email, password } = req.body;
  // find user by email
  let existingUser = await User.findOne({ email: email });
  try {
    // if user is not existing
    if (!existingUser) {
      return next(
        new HttpError("Invalid credentials, could not log you in.", 500)
      );
    }
  } catch (err) {
    return next(new HttpError("Find user failed", 500));
  }
  // check password is valid
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(
      new HttpError(
        "Can not login, please check your credentials and try again",
        500
      )
    );
  }

  // if the password is not valid throw error
  if (!isValidPassword) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 500)
    );
  }

  // generate token
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "jeffrey_secret_key",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError("Login up user failed!", 500));
  }

  // if login successfully then response with successful message
  res.json({
    userId: createdUser.id,
    email: createdUser.email,
    name: createdUser.name,
    token: token,
  });
};

// export user controllers
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
