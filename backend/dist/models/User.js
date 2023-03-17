const mongoose = require("mongoose");

// Define User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ip: { type: String, required: true, unique: true }
});

// Define User model
const User = mongoose.model("User", UserSchema);

module.exports = User;