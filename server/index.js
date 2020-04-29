const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");
const mongoose = require("mongoose");

const app = express();

// this will parse any income request body to json format
app.use(bodyParser.json());

// our own custom routes
app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

//
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// this handle error middleware will apply for middleware in front of it
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
    "mongodb+srv://Jeffrey:362908227colin@cluster0-lpr0w.mongodb.net/places?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("=== Database Connected! ===");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
