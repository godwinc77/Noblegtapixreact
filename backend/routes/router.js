const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const JWT_SECRET =
  "hcnxjshdnhvgsvfrsfchrisjkkckkd12se45hjgbahjdfjfmckdkkcmdedddxsd";
const jwt = require("jsonwebtoken");

const generateToken = (username) => {
  const payload = { username };
  const options = { expiresIn: "1h" };
  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
};

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      username,
      password: hashedPassword, // Store the hashed password in the database
    };

    // Use the pool.query method to execute the SQL query
    pool.query("INSERT INTO users SET ?", newUser, (err, result) => {
      if (err) {
        console.error("Error registering user: ", err);
        return res.status(500).json({ error: "Error registering user" });
      } else {
        return res
          .status(201)
          .json({ message: "User registered successfully" });
      }
    });
  } catch (error) {
    console.error("Error hashing password: ", error);
    return res.status(500).json({ error: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Use the pool.query method to check if the user exists and retrieve the hashed password
    pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, rows) => {
        if (err) {
          console.error("Error retrieving user data: ", err);
          return res.status(500).json({ error: "Error retrieving user data" });
        }

        if (rows.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        const hashedPassword = rows[0].password;

        // Compare the provided password with the hashed password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid password" });
        }

        // If the password is valid, generate a JWT token
        const token = generateToken(rows[0].username);
        console.log("Generated token:", token);

        // Return the JWT token in the response
        return res.status(200).json({ message: "Login successful", token });
      }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/userData", async (req, res) => {
  const { token } = req.body;
  console.log(token);

  // Ensure that the token is provided
  if (!token) {
    return res
      .status(403)
      .json({ status: "error", data: "Token not provided" });
  }

  try {
    // Verify the token and get the decoded user data
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      if (err.name === "JsonWebTokenError" && err.message === "jwt malformed") {
        return res
          .status(401)
          .json({ status: "error", data: "Invalid token format" });
      }
      throw err;
    }

    console.log(decoded);
    const { username: decodedUsername } = decoded;

    // Ensure the decoded username is provided and matches the token
    if (!decodedUsername || decodedUsername !== decoded.username) {
      return res
        .status(400)
        .json({ status: "error", data: "Invalid username provided" });
    }

    // Fetch user data from the database based on the decoded username
    const query = "SELECT * FROM users WHERE username = ?";
    pool.query(query, [decodedUsername], async (error, result) => {
      if (error) {
        console.error("Error fetching user data:", error);
        return res
          .status(500)
          .json({ status: "error", data: "Error fetching user data" });
      }

      if (result.length === 0) {
        return res
          .status(404)
          .json({ status: "error", data: "User data not found" });
      }

      const userData = result[0];
      const log = { user: decodedUsername };

      res.send({
        status: "ok",
        data: { userData, log, username: decodedUsername },
      });
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ status: "error", data: "Token expired" });
    } else {
      console.error(error);
      return res
        .status(500)
        .json({ status: "error", data: "Internal server error" });
    }
  }
});

module.exports = router;
