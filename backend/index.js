const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/mongoose");
const comment = require("./src/routes/comment");

const app = express();
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

// Connect to the MongoDB database
connectDB();

const port = process.env.PORT || 5000;

// routes for api call
app.get('/', (req, res)=>{
    res.send("Hello world.");
})

// Register routes
app.use("/comments", comment);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
