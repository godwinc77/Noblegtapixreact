const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { upload } = require("../routes/storageroute");

//Home Background Images

router.post("/upload-image", upload.single("image"), (req, res) => {
  console.log(req.file);
  const imagePath = req.file.path;
  const fs = require("fs");
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error("Error reading image file:", err);
      return res
        .status(500)
        .json({ status: "error", data: "Error reading image file" });
    }

    fs.unlink(imagePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error("Error removing temporary image file:", unlinkErr);
      }
    });

    const sql = "INSERT INTO images(image) VALUES (?)";
    pool.query(sql, [data], (dbErr, result) => {
      if (dbErr) {
        console.error("Error saving image to database:", dbErr);
        return res
          .status(500)
          .json({ status: "error", data: "Error saving image to database" });
      }

      const imageId = result.insertId;
      console.log(imageId);

      const imageUrl = `http://localhost:4000/images/${imageId}`;
      console.log(imageUrl);

      console.log("Image saved to database successfully!");

      res.status(200).json({ status: "ok", data: imageUrl });
    });
  });
});

router.get("/get-image", async (req, res) => {
  try {
    const query = "SELECT id FROM images";

    pool.query(query, (err, result) => {
      if (err) {
        console.error("Error fetching images from database:", err);
        return res.status(500).json({
          status: "error",
          data: "Error fetching images from database",
        });
      }

      const imageIds = result.map((row) => row.id);
      res.status(200).json({ status: "ok", data: imageIds });
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ status: "error", data: "Internal server error" });
  }
});
router.get("/images/:id", (req, res) => {
  const imageId = req.params.id;
  const query = "SELECT image FROM images WHERE id = ?";
  pool.query(query, [imageId], (err, result) => {
    if (err) {
      console.error("Error fetching image from database:", err);
      return res
        .status(500)
        .json({ status: "error", data: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ status: "error", data: "Image not found" });
    }

    const imageBuffer = result[0].image;

    res.set("Content-Type", "image/jpeg");

    res.send(imageBuffer);
  });
});

const resetAutoIncrement = () => {
  const query = "ALTER TABLE images AUTO_INCREMENT = 0";
  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error resetting auto-increment:", err);
      return;
    }

    console.log("Auto-increment reset successfully.");
  });
};

router.delete("/delete-image/:imageId", (req, res) => {
  const imageId = req.params.imageId;
  const deleteQuery = "DELETE FROM images WHERE id = ?";

  pool.query(deleteQuery, [imageId], (err, result) => {
    if (err) {
      console.error("Error deleting image:", err);
      return res.status(500).json({ message: "Failed to delete image" });
    }

    resetAutoIncrement();

    return res.json({ message: "Image deleted successfully" });
  });
});

router.post("/reset-database", async (req, res) => {
  try {
    const truncateQuery = "TRUNCATE TABLE images";
    pool.query(truncateQuery, (err, result) => {
      if (err) {
        console.error("Error truncating table:", err);
        return res.status(500).json({ message: "Failed to reset database" });
      }
      return res.json({ message: "Database reset successful" });
    });
  } catch (error) {
    console.error("Error resetting database:", error);
    return res.status(500).json({ message: "Failed to reset database" });
  }
});

//GALLERY BACKGROUND

router.post(
  "/gallery-background-upoad-image",
  upload.single("image"),
  (req, res) => {
    console.log(req.file);
    const imagePath = req.file.path;
    const fs = require("fs");
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error("Error reading image file:", err);
        return res
          .status(500)
          .json({ status: "error", data: "Error reading image file" });
      }

      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error removing temporary image file:", unlinkErr);
        }
      });

      const sql =
        "INSERT INTO gallery_background_image (gallery_background) VALUES (?)";
      pool.query(sql, [data], (dbErr, result) => {
        if (dbErr) {
          console.error("Error saving image to database:", dbErr);
          return res
            .status(500)
            .json({ status: "error", data: "Error saving image to database" });
        }

        const imageId = result.insertId;
        console.log(imageId);

        const imageUrl = `http://localhost:4000/images/${imageId}`;
        console.log(imageUrl);

        console.log("Image saved to database successfully!");

        res.status(200).json({ status: "ok", data: imageUrl });
      });
    });
  }
);

router.get("/gallery-background-get-image", async (req, res) => {
  try {
    const query = "SELECT id FROM gallery_background_image";

    pool.query(query, (err, result) => {
      if (err) {
        console.error("Error fetching images from database:", err);
        return res.status(500).json({
          status: "error",
          data: "Error fetching images from database",
        });
      }

      const imageIds = result.map((row) => row.id);
      res.status(200).json({ status: "ok", data: imageIds });
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ status: "error", data: "Internal server error" });
  }
});
router.get("/gallery-background-images/:id", (req, res) => {
  const imageId = req.params.id;
  const query =
    "SELECT gallery_background FROM gallery_background_image WHERE id = ?";
  pool.query(query, [imageId], (err, result) => {
    if (err) {
      console.error("Error fetching image from database:", err);
      return res
        .status(500)
        .json({ status: "error", data: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ status: "error", data: "Image not found" });
    }

    const imageBuffer = result[0].gallery_background; // Correct field name

    res.set("Content-Type", "image/jpeg");

    res.send(imageBuffer);
  });
});

//PORTFOLIO BACKGROUND
router.post(
  "/portfolio-background-upoad-image",
  upload.single("image"),
  (req, res) => {
    console.log(req.file);
    const imagePath = req.file.path;
    const fs = require("fs");
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error("Error reading image file:", err);
        return res
          .status(500)
          .json({ status: "error", data: "Error reading image file" });
      }

      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error removing temporary image file:", unlinkErr);
        }
      });

      const sql =
        "INSERT INTO portfolio_background_image (portfolio_background) VALUES (?)";
      pool.query(sql, [data], (dbErr, result) => {
        if (dbErr) {
          console.error("Error saving image to database:", dbErr);
          return res
            .status(500)
            .json({ status: "error", data: "Error saving image to database" });
        }

        const imageId = result.insertId;
        console.log(imageId);

        const imageUrl = `http://localhost:4000/images/${imageId}`;
        console.log(imageUrl);

        console.log("Image saved to database successfully!");

        res.status(200).json({ status: "ok", data: imageUrl });
      });
    });
  }
);

router.get("/portfolio-background-get-image", async (req, res) => {
  try {
    const query = "SELECT id FROM portfolio_background_image";

    pool.query(query, (err, result) => {
      if (err) {
        console.error("Error fetching images from database:", err);
        return res.status(500).json({
          status: "error",
          data: "Error fetching images from database",
        });
      }

      const imageIds = result.map((row) => row.id);
      res.status(200).json({ status: "ok", data: imageIds });
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ status: "error", data: "Internal server error" });
  }
});
router.get("/portfolio-background-images/:id", (req, res) => {
  const imageId = req.params.id;
  const query =
    "SELECT portfolio_background FROM portfolio_background_image WHERE id = ?";
  pool.query(query, [imageId], (err, result) => {
    if (err) {
      console.error("Error fetching image from database:", err);
      return res
        .status(500)
        .json({ status: "error", data: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ status: "error", data: "Image not found" });
    }

    const imageBuffer = result[0].portfolio_background; // Correct field name

    res.set("Content-Type", "image/jpeg");

    res.send(imageBuffer);
  });
});

//SERVICE BACKGROUND
router.post(
  "/service-background-upoad-image",
  upload.single("image"),
  (req, res) => {
    console.log(req.file);
    const imagePath = req.file.path;
    const fs = require("fs");
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error("Error reading image file:", err);
        return res
          .status(500)
          .json({ status: "error", data: "Error reading image file" });
      }

      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error removing temporary image file:", unlinkErr);
        }
      });

      const sql =
        "INSERT INTO service_background_image (service_background) VALUES (?)";
      pool.query(sql, [data], (dbErr, result) => {
        if (dbErr) {
          console.error("Error saving image to database:", dbErr);
          return res
            .status(500)
            .json({ status: "error", data: "Error saving image to database" });
        }

        const imageId = result.insertId;
        console.log(imageId);

        const imageUrl = `http://localhost:4000/images/${imageId}`;
        console.log(imageUrl);

        console.log("Image saved to database successfully!");

        res.status(200).json({ status: "ok", data: imageUrl });
      });
    });
  }
);

router.get("/service-background-get-image", async (req, res) => {
  try {
    const query = "SELECT id FROM service_background_image";

    pool.query(query, (err, result) => {
      if (err) {
        console.error("Error fetching images from database:", err);
        return res.status(500).json({
          status: "error",
          data: "Error fetching images from database",
        });
      }

      const imageIds = result.map((row) => row.id);
      res.status(200).json({ status: "ok", data: imageIds });
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ status: "error", data: "Internal server error" });
  }
});
router.get("/service-background-images/:id", (req, res) => {
  const imageId = req.params.id;
  const query =
    "SELECT service_background FROM service_background_image WHERE id = ?";
  pool.query(query, [imageId], (err, result) => {
    if (err) {
      console.error("Error fetching image from database:", err);
      return res
        .status(500)
        .json({ status: "error", data: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ status: "error", data: "Image not found" });
    }

    const imageBuffer = result[0].service_background; // Correct field name

    res.set("Content-Type", "image/jpeg");

    res.send(imageBuffer);
  });
});

module.exports = router;
