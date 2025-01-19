import React, { useEffect, useState } from "react";

const API_USERS = "https://as400.jcboe.org:8080/api/users";

const MaintainUser = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editingEmail, setEditingEmail] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await fetch(API_USERS);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // ✅ Add or Update User
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email is required");
      return;
    }

    const userData = { email, password };

    try {
      const response = await fetch(
        editingEmail ? `${API_USERS}/${editingEmail}` : API_USERS,
        {
          method: editingEmail ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error updating user");
      }

      fetchUsers(); // Refresh users after update
      setEmail("");
      setPassword("");
      setEditingEmail(null);
    } catch (error) {
      console.error("Error updating users:", error);
      alert("Failed to update user.");
    }
  };

  // ✅ Edit User
  const handleEdit = (user) => {
    setEmail(user.email);
    setPassword(user.password || "");
    setEditingEmail(user.email);
  };

  // ✅ Delete User
  const handleDelete = async (email) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`${API_USERS}/${email}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error deleting user");
      }

      // ✅ Remove deleted user from state
      setUsers(users.filter(user => user.email !== email));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Maintain Users</h2>

      {/* User Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (optional)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{editingEmail ? "Update" : "Add"}</button>
      </form>

      {/* Users Table */}
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Password (Hashed)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.password || "No Password"}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintainUser;
