// place database schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// create place schema and type constrains
const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, require: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  // since every place has only one creatorand each creator is indicated by id from User schema.
  // This is how user and place build connection
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});
// export place schema as Place
module.exports = mongoose.model("Place", placeSchema);
