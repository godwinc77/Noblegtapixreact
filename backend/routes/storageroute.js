const multer = require("multer");
const express = require("express");
const path = require("path");
const router = express.Router();

// Multer middleware with storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Destination Directory:", "../frontend/src/images");
    cb(null, "../frontend/src/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    console.log("Generated Filename:", uniqueSuffix + file.originalname);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage });

router.use(
  "/images",
  express.static(path.join(__dirname, "../frontend/src/images"))
);

module.exports = { upload, router };
