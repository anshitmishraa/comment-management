const mongoose = require("mongoose");

// Define Reply schema
const ReplySchema = new mongoose.Schema({
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

// Define Reply model
const Reply = mongoose.model("Reply", ReplySchema);

module.exports = Reply;