const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./mongoose.js');
const casual = require('casual');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

// Connect to the MongoDB database
connectDB();

// Define User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ip: { type: String, required: true, unique: true }
});

// Define Comment schema
const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

// Define User model
const User = mongoose.model('User', UserSchema);

// Define Comment model
const Comment = mongoose.model('Comment', CommentSchema);

// Middleware to create or retrieve user based on IP address
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
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
            console.error('Error creating user', err);
            res.sendStatus(500);
          });
      }
    })
    .catch((err) => {
      console.error('Error retrieving user', err);
      res.sendStatus(500);
    });
});

// Endpoint to create a new comment
app.post('/comments', (req, res) => {
  const { content } = req.body;
  const comment = new Comment({ content, author: req.user._id });
  comment.save()
    .then((newComment) => {
      res.json(newComment);
    })
    .catch((err) => {
      console.error('Error creating comment', err);
      res.sendStatus(500);
    });
});

// Endpoint to get all comments with their replies
app.get('/comments', (req, res) => {
  Comment.find({})
    .populate('author', 'name')
    .populate({
      path: 'replies',
      populate: {
        path: 'author',
        select: 'name'
      }
    })
    .sort('-created_at')
    .exec()
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      console.error('Error retrieving comments', err);
      res.sendStatus(500);
    });
});



// Endpoint to reply to a comment
app.post('/comments/:commentId/replies', (req, res) => {
  const { content } = req.body;
  const reply = new Comment({ content, author: req.user._id });
  reply.save()
    .then((newReply) => {
      Comment.findById(req.params.commentId)
        .then((comment) => {
          comment.replies.push(newReply._id);
          comment.save()
            .then(() => {
              res.json(newReply);
              reply.deleteOne(newReply._id)

            })
            .catch((err) => {
              console.error('Error adding reply to comment', err);
              res.sendStatus(500);
            });
        })
        .catch((err) => {
          console.error('Error finding comment', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error('Error creating reply', err);
      res.sendStatus(500);
    });

  
    
});



  

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
