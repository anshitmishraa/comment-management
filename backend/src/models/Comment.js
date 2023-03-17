const mongoose = require("mongoose");

// Define Comment schema
const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
});

// Define Comment model
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
