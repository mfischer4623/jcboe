const express = require("express");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// Load SSL certificate and key
const options = {
    key: fs.readFileSync("./wildcard_jcboe_org.key"),
    cert: fs.readFileSync("./wildcard_jcboe_org.crt"),
};

// Load secret key from environment variables
const SECRET_KEY = process.env.JWTSECRETKEY;
if (!SECRET_KEY) {
    console.error("ERROR: JWTSECRETKEY is not defined in .env file");
    process.exit(1); // Stop execution if key is missing
}

// ✅ Authentication Route (Login)
app.post("/auth", async (req, res) => {
    // Read the database file each time this endpoint is invoked.
    let usersData;
    try {
        usersData = JSON.parse(fs.readFileSync("./database.json", "utf-8"));
    } catch (error) {
        return res.status(500).json({ message: "Error reading user data." });
    }

    const { email, password } = req.body;
    const user = usersData.users.find(user => user.email === email);
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    // Generate JWT Token
    const token = jwt.sign({ email: user.email, admin: user.admin }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "success", token });
});

// ✅ JWT Token Verification Route
app.post("/verify", (req, res) => {
    const token = req.headers["jwt-token"];
    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });

        res.json({ message: "success", email: decoded.email, admin: decoded.admin });
    });
});

// Start HTTPS Server
https.createServer(options, app).listen(5000, () => {
    console.log("HTTPS Server running on port 5000");
});
