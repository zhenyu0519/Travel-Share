// This file is to convert the address to location coordinates and return it
const axios = require("axios");
const HttpError = require("./http-error");
// import dotenv to hide senstive info
const dotenv = require("dotenv");
dotenv.config();

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.GOOGLE_MAP_API}`
  );

  const data = response.data;
  if (!data || data.status === "ZERO_RESULT") {
    const error = new HttpError("Can not find location address!", 422);
    throw error;
  }

  const coordinates = data.results[0].geometry.location;
  return coordinates;
}

module.exports = getCoordsForAddress;
