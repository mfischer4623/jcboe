const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load user data from database.json
const usersData = JSON.parse(fs.readFileSync("./database.json", "utf-8"));

app.post("/auth", async (req, res) => {
    const { email, password } = req.body;
    
    // Find user
    const user = usersData.users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "success", email, admin: user.admin });
});

app.listen(5000, () => console.log("Server running on port 5000"));
