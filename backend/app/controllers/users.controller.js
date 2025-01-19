const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const DB_FILE = path.join(__dirname, "../../../auth-server/database.json");

// ✅ Ensure database file exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }, null, 2));
}

// ✅ Read all users
exports.findAll = (req, res) => {
  fs.readFile(DB_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading database file:", err);
      return res.status(500).json({ error: "Error reading database file" });
    }
    try {
      const db = JSON.parse(data);
      res.json(db);
    } catch (parseError) {
      console.error("Error parsing database file:", parseError);
      return res.status(500).json({ error: "Invalid JSON format in database file" });
    }
  });
};

// ✅ Add a new user (with bcrypt password hashing)
exports.create = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password

    fs.readFile(DB_FILE, "utf8", (err, data) => {
      if (err) return res.status(500).json({ error: "Error reading database file" });

      let db = JSON.parse(data);

      if (db.users.some(user => user.email === email)) {
        return res.status(400).json({ error: "User with this email already exists" });
      }

      db.users.push({ email, password: hashedPassword });

      fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), (writeErr) => {
        if (writeErr) return res.status(500).json({ error: "Error saving user" });
        res.json({ success: true, user: { email } });
      });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Error processing request" });
  }
};

// ✅ Update a user by email (Hash new password only if provided)
exports.update = async (req, res) => {
  const { email } = req.params;
  const { password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  fs.readFile(DB_FILE, "utf8", async (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading database file" });

    try {
      let db = JSON.parse(data);
      const userIndex = db.users.findIndex(user => user.email === email);

      if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
      }

      // Hash new password only if provided
      if (password) {
        db.users[userIndex].password = await bcrypt.hash(password, 10);
      }

      fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), (writeErr) => {
        if (writeErr) return res.status(500).json({ error: "Error updating user" });
        res.json({ success: true, user: { email } });
      });
    } catch (parseError) {
      console.error("Error parsing database file:", parseError);
      return res.status(500).json({ error: "Invalid JSON format in database file" });
    }
  });
};

// ✅ Delete a user by email
exports.delete = (req, res) => {
  const { email } = req.params;

  fs.readFile(DB_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading database file" });

    try {
      let db = JSON.parse(data);
      const initialLength = db.users.length;
      db.users = db.users.filter(user => user.email !== email);

      if (db.users.length === initialLength) {
        return res.status(404).json({ error: "User not found" });
      }

      fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), (writeErr) => {
        if (writeErr) return res.status(500).json({ error: "Error deleting user" });
        res.json({ success: true });
      });
    } catch (parseError) {
      console.error("Error parsing database file:", parseError);
      return res.status(500).json({ error: "Invalid JSON format in database file" });
    }
  });
};
