const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Comment = require("../models/Comment");
const Reply = require("../models/Reply");
const casual = require("casual");

// Middleware to create or retrieve user based on IP address
router.use((req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  User.findOne({ ip })
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        const name = casual.full_name;
        User.create({ name, ip })
          .then((newUser) => {
            req.user = newUser;
            next();
          })
          .catch((err) => {
            res.status(500).json({ message: err.message });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// Endpoint to create a new comment
router.post("/", (req, res) => {
  const { content } = req.body;
  const comment = new Comment({ content, author: req.user._id });
  comment
    .save()
    .then((newComment) => {
      res.json(newComment);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// Endpoint to get all comments with their replies
router.get("/", (req, res) => {
  console.log("in");
  Comment.find({})
    .populate("author", "name")
    .populate({
      path: "replies",
      populate: {
        path: "author",
        select: "name",
      },
    })
    .sort("-created_at")
    .exec()
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// Endpoint to reply to a comment
router.post("/:commentId/replies", (req, res) => {
  const { content } = req.body;
  const reply = new Reply({ content, author: req.user._id });
  reply
    .save()
    .then((newReply) => {
      Comment.findById(req.params.commentId)
        .then((comment) => {
          comment.replies.push(newReply._id);
          comment
            .save()
            .then(() => {
              res.json(newReply);
            })
            .catch((err) => {
              res.status(500).json({ message: err.message });
            });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
