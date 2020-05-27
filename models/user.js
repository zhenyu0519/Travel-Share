// user database schema
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
// create use schema and type constrains
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  // since every user may create more than one place, so here places is array and each place is indicated by id from Place schema.
  // This is how user and place build connection
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
});
// use uniqueValidtor to validate if the email is unqiue
userSchema.plugin(uniqueValidator);
// export user schema as User
module.exports = mongoose.model("User", userSchema);
