const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const portfolioupload = require("../backend/routes/portfolioupload");
const galleryupload = require("../backend/routes/galleryupload");
const router = require("../backend/routes/router");
const uploadIMG = require("../backend/routes/uploadIMG");

const pool = require("./config/db");
require("dotenv/config");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const app = express();

// Middleware
app.use(express.json({ limit: "100mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Routes
app.use("/", router);
app.use("/", uploadIMG);
app.use("/", galleryupload);
app.use("/", portfolioupload);

// Connect to MySQL
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
  } else {
    console.log("Connected to MySQL database!");
    connection.release();
  }
});

// Set up the server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
