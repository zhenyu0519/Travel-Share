const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyC95kkh6BlL7EFIMNEx_5wwHprLMNItt8g";

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;
  if (!data || data.status === "ZERO_RESULT") {
    const error = new HttpError("Could not find location address.", 422);
    throw error;
  }

  const coordinates = data.results[0].geometry.location;
  return coordinates;
}

module.exports = getCoordsForAddress;
