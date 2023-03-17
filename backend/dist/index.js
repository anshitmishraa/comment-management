const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/mongoose");
const comment = require("./routes/comment");

const app = express();
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

// Connect to the MongoDB database
connectDB();

const port = process.env.PORT || 5000;

// Register routes
app.use("/comments", comment);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});