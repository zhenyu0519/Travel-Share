const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./util/http-error");
const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// this will parse any income request body to json format
app.use(bodyParser.json());

// control the cross origin resource sharing (cors)
app.use((req, res, next) => {
  // let response header have these values attached
  // allow to control which domain should have access, where the browser should allow this, here we open to any domain
  res.setHeader("Access-Control-Allow-Origin", "*");
  // allow to control which header should have access
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );
  // allow to control which methods should have access
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// our own custom routes
app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

// if the router is unknow, throw error
app.use((req, res, next) => {
  const error = new HttpError("Can not find this route!", 404);
  throw error;
});

// this handle error middleware will excute after previous excute
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

// if connect to database is successful then we start the server
mongoose
  .connect(
    `mongodb+srv://Jeffrey:${process.env.DATA_BASE_PASS}@cluster0-lpr0w.mongodb.net/places?retryWrites=true&w=majority`,
    // these three options to remove deprecation warnings
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("=== Database Connected! ===");
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
