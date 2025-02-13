
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const DB_FILE = path.join(__dirname, "../../../auth-server/database.json");

// ✅ Ensure database file exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }, null, 2));
}

// ✅ Authenticate User (Login)

exports.authenticate = async (req, res) => {
  const { email, password } = req.body;
  console.log("🔍 Login attempt for:", email);

  fs.readFile(DB_FILE, "utf8", async (err, data) => {
      if (err) {
          console.error("❌ Error reading database file:", err);
          return res.status(500).json({ error: "Error reading database file" });
      }

      try {
          const db = JSON.parse(data);
          const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

          if (!user) {
              console.error("❌ User not found:", email);
              return res.status(401).json({ error: "Invalid email or password" });
          }

          console.log("✅ Found user:", user);

          if (!user.password) {
              console.error("❌ No password stored for user:", email);
              return res.status(401).json({ error: "Invalid email or password" });
          }

          console.log("🔍 Hashed password in database:", user.password);
          console.log("🔍 Password entered by user:", password);

          const match = await bcrypt.compare(password, user.password);
          console.log("🔍 Password match result:", match);

          if (!match) {
              console.error("❌ Incorrect password for:", email);
              return res.status(401).json({ error: "Invalid email or password" });
          }

          console.log("✅ Login successful:", email);

          res.json({ message: "success", token: "your-jwt-token", admin: user.admin });
      } catch (parseError) {
          console.error("❌ Error parsing database file:", parseError);
          return res.status(500).json({ error: "Invalid JSON format in database file" });
      }
  });
};


// ✅ Get all users
exports.findAll = (req, res) => {
  fs.readFile(DB_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading database file:", err);
      return res.status(500).json({ error: "Error reading database file" });
    }

    try {
      const db = JSON.parse(data);
      res.json(db.users);
    } catch (parseError) {
      console.error("Error parsing database file:", parseError);
      return res.status(500).json({ error: "Invalid JSON format in database file" });
    }
  });
};

// ✅ Create a new user (Hash password)
exports.create = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    fs.readFile(DB_FILE, "utf8", (err, data) => {
      if (err) return res.status(500).json({ error: "Error reading database file" });

      let db = JSON.parse(data);

      if (db.users.some((user) => user.email === email)) {
        return res.status(400).json({ error: "User already exists" });
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

// ✅ Update an existing user (Hash new password if provided)
// exports.update = async (req, res) => {
//   const { email } = req.params;
//   const { password } = req.body;

//   fs.readFile(DB_FILE, "utf8", async (err, data) => {
//     if (err) return res.status(500).json({ error: "Error reading database file" });

//     try {
//       let db = JSON.parse(data);
//       const userIndex = db.users.findIndex((user) => user.email === email);

//       if (userIndex === -1) {
//         return res.status(404).json({ error: "User not found" });
//       }

//       if (password) {
//         db.users[userIndex].password = await bcrypt.hash(password, 10);
//       }

//       fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), (writeErr) => {
//         if (writeErr) return res.status(500).json({ error: "Error updating user" });
//         res.json({ success: true, user: { email } });
//       });
//     } catch (parseError) {
//       console.error("Error parsing database file:", parseError);
//       return res.status(500).json({ error: "Invalid JSON format in database file" });
//     }
//   });
// };


exports.update = async (req, res) => {
  const { email } = req.params;
  const { password, admin } = req.body;

  console.log("Updating user:", email);

  fs.readFile(DB_FILE, "utf8", async (err, data) => {
    if (err) {
      console.error("Error reading database file:", err);
      return res.status(500).json({ error: "Error reading database file" });
    }

    try {
      let db = JSON.parse(data);
      const userIndex = db.users.findIndex(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );

      if (userIndex === -1) {
        console.error("User not found:", email);
        return res.status(404).json({ error: "User not found" });
      }

      if (password) {
        db.users[userIndex].password = await bcrypt.hash(password, 10);
      }

      if (admin !== undefined) {
        db.users[userIndex].admin = admin;
      }

      fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), (writeErr) => {
        if (writeErr) {
          console.error("Error updating user:", writeErr);
          return res.status(500).json({ error: "Error updating user" });
        }

        console.log("User updated successfully:", email, "Admin:", admin);
        res.json({ success: true, user: { email, admin } });
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
      db.users = db.users.filter((user) => user.email !== email);

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
