var fs = require('fs');
var https = require('https');
var privateKey = fs.readFileSync('./wildcard_jcboe_org.key', 'utf8');
var certificate = fs.readFileSync('./wildcard_jcboe_org.crt', 'utf8');

const bcrypt = require("bcrypt");
var cors = require('cors');
const jwt = require("jsonwebtoken");
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync("./database.json");
var db = low(adapter);
require('dotenv').config();

// Initialize Express app
var credentials = { key: privateKey, cert: certificate };
var express = require('express');
const app = express();

// Define a JWT secret key. This should be isolated using environment variables for security
const jwtSecretKey = process.env.JWTSECRETKEY;

// Set up CORS and JSON middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic home route for the API
app.get("/", (_req, res) => {
    res.send("Auth API.\nPlease use POST /auth & POST /verify for authentication.");
});

// Authentication endpoint - Login only (no user creation)
app.post("/auth", async (req, res) => {
    const { email, password } = req.body;

    // Look up the user in the database
    const user = db.get("users").find({ email }).value();

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const loginData = {
        email,
        signInTime: Date.now(),
    };

    const token = jwt.sign(loginData, jwtSecretKey);
    res.status(200).json({ message: "success", token });
});

// Verify JWT token
app.post('/verify', (req, res) => {
    const tokenHeaderKey = "jwt-token";
    const authToken = req.headers[tokenHeaderKey];

    try {
        const verified = jwt.verify(authToken, jwtSecretKey);
        if (verified) {
            return res.status(200).json({ status: "logged in", message: "success" });
        } else {
            return res.status(401).json({ status: "invalid auth", message: "error" });
        }
    } catch (error) {
        return res.status(401).json({ status: "invalid auth", message: "error" });
    }
});

// HTTPS server setup
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(3080);

console.log(`Server is running on port 3080.`);
