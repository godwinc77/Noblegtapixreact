const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { upload } = require("../routes/storageroute");

//STUDIO UPLOADS

router.post("/studio-upload-image", upload.single("image"), (req, res) => {
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

    const sql = "INSERT INTO studio (images) VALUES (?)";
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

router.get("/studio-get-image", async (req, res) => {
  try {
    const query = "SELECT id FROM studio";

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
router.get("/studioimages/:id", (req, res) => {
  const imageId = req.params.id;
  const query = "SELECT images FROM studio WHERE id = ?";
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

    const imageBuffer = result[0].images;

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

router.delete("/studio-delete-image/:imageId", (req, res) => {
  const imageId = req.params.imageId;
  const deleteQuery = "DELETE FROM studio WHERE id = ?";

  pool.query(deleteQuery, [imageId], (err, result) => {
    if (err) {
      console.error("Error deleting image:", err);
      return res.status(500).json({ message: "Failed to delete image" });
    }

    resetAutoIncrement();

    return res.json({ message: "Image deleted successfully" });
  });
});

// OUTDOOR UPLOADS

router.post("/outdoor-upload-image", upload.single("image"), (req, res) => {
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

    const sql = "INSERT INTO outdoor (images) VALUES (?)";
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

router.get("/outdoor-get-image", async (req, res) => {
  try {
    const query = "SELECT id FROM outdoor";

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
router.get("/outdoorimages/:id", (req, res) => {
  const imageId = req.params.id;
  const query = "SELECT images FROM outdoor WHERE id = ?";
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

    const imageBuffer = result[0].images;

    res.set("Content-Type", "image/jpeg");

    res.send(imageBuffer);
  });
});

router.delete("/outdoor-delete-image/:imageId", (req, res) => {
  const imageId = req.params.imageId;
  const deleteQuery = "DELETE FROM outdoor WHERE id = ?";

  pool.query(deleteQuery, [imageId], (err, result) => {
    if (err) {
      console.error("Error deleting image:", err);
      return res.status(500).json({ message: "Failed to delete image" });
    }

    resetAutoIncrement();

    return res.json({ message: "Image deleted successfully" });
  });
});

// PRODUCT UPLOADS

router.post("/product-upload-image", upload.single("image"), (req, res) => {
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

    const sql = "INSERT INTO product (images) VALUES (?)";
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

router.get("/product-get-image", async (req, res) => {
  try {
    const query = "SELECT id FROM product";

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
router.get("/productimages/:id", (req, res) => {
  const imageId = req.params.id;
  const query = "SELECT images FROM product WHERE id = ?";
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

    const imageBuffer = result[0].images;

    res.set("Content-Type", "image/jpeg");

    res.send(imageBuffer);
  });
});

router.delete("/product-delete-image/:imageId", (req, res) => {
  const imageId = req.params.imageId;
  const deleteQuery = "DELETE FROM product WHERE id = ?";

  pool.query(deleteQuery, [imageId], (err, result) => {
    if (err) {
      console.error("Error deleting image:", err);
      return res.status(500).json({ message: "Failed to delete image" });
    }

    resetAutoIncrement();

    return res.json({ message: "Image deleted successfully" });
  });
});

// MAKEUP UPLOADS

router.post("/makeup-upload-image", upload.single("image"), (req, res) => {
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

    const sql = "INSERT INTO makeup (images) VALUES (?)";
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

router.get("/makeup-get-image", async (req, res) => {
  try {
    const query = "SELECT id FROM makeup";

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
router.get("/makeupimages/:id", (req, res) => {
  const imageId = req.params.id;
  const query = "SELECT images FROM makeup WHERE id = ?";
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

    const imageBuffer = result[0].images;

    res.set("Content-Type", "image/jpeg");

    res.send(imageBuffer);
  });
});

router.delete("/makeup-delete-image/:imageId", (req, res) => {
  const imageId = req.params.imageId;
  const deleteQuery = "DELETE FROM makeup WHERE id = ?";

  pool.query(deleteQuery, [imageId], (err, result) => {
    if (err) {
      console.error("Error deleting image:", err);
      return res.status(500).json({ message: "Failed to delete image" });
    }

    resetAutoIncrement();

    return res.json({ message: "Image deleted successfully" });
  });
});

module.exports = router;
