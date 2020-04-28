const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "jeff",
    email: "jeff@test.com",
    password: "testers",
  },
  {
    id: "u2",
    name: "luke",
    email: "luke@test.com",
    password: "testersluke",
  },
];

const getUsers = (req, res, next) => {
  res.json({ user: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError(
      "Invalid inputs passed, please check your input data",
      422
    );
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("user already existed", 422);
  }
  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find(
    (u) => u.email === email && u.password === password
  );
  if (!identifiedUser) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong",
      401
    );
  }

  res.json({ message: "logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
