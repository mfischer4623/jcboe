// import React, { useEffect, useState } from "react";

// const API_USERS = "https://as400.jcboe.org:8080/api/employees/users";

// const MaintainUser = () => {
//   const [users, setUsers] = useState([]); 
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [editingEmail, setEditingEmail] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // ✅ Fetch users from API
//   const fetchUsers = async () => {
//     try {
//       const response = await fetch(API_USERS);
//       if (!response.ok) throw new Error("Failed to fetch users");
//       const data = await response.json();
//       setUsers(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setError("Failed to load users. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Add or Update User
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email) {
//       alert("Email is required");
//       return;
//     }

//     const userData = { email, password };

//     try {
//       const response = await fetch(
//         editingEmail ? `${API_USERS}/${editingEmail}` : API_USERS,
//         {
//           method: editingEmail ? "PUT" : "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(userData),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Error updating user");
//       }

//       fetchUsers(); // ✅ Refresh users after update
//       setEmail("");
//       setPassword("");
//       setEditingEmail(null);
//     } catch (error) {
//       console.error("Error updating users:", error);
//       alert("Failed to update user.");
//     }
//   };

//   // ✅ Edit User
//   const handleEdit = (user) => {
//     setEmail(user.email);
//     setPassword(""); // Do not prefill password for security
//     setEditingEmail(user.email);
//   };

//   // ✅ Delete User
//   const handleDelete = async (email) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;

//     try {
//       const response = await fetch(`${API_USERS}/${email}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Error deleting user");
//       }

//       // ✅ Remove deleted user from state
//       setUsers(users.filter((user) => user.email !== email));
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       alert("Failed to delete user.");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Maintain Users</h2>

//       {/* Show loading/error messages */}
//       {loading && <p>Loading users...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* User Form */}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password (optional)"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">{editingEmail ? "Update" : "Add"}</button>
//       </form>

//       {/* Users Table */}
//       <table border="1" style={{ marginTop: "20px", width: "100%" }}>
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Password (Encrypted)</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length === 0 ? (
//             <tr>
//               <td colSpan="3">No users found.</td>
//             </tr>
//           ) : (
//             users.map((user) => (
//               <tr key={user.email}>
//                 <td>{user.email}</td>
//                 <td>{user.password ? "Encrypted" : "No Password"}</td>
//                 <td>
//                   <button onClick={() => handleEdit(user)}>Edit</button>
//                   <button onClick={() => handleDelete(user.email)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };
//  export default MaintainUser;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_USERS = "https://as400.jcboe.org:8080/api/employees/users";

const MaintainUser = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState("No"); // ✅ Added Admin field
  const [editingEmail, setEditingEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsersAndCheckAdmin();
  }, []);

  // ✅ Fetch users from API and check if logged-in user is an admin
  const fetchUsersAndCheckAdmin = async () => {
    try {
      console.log("🔍 Fetching users from API...");
      const response = await fetch(API_USERS);
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      console.log("✅ Users fetched successfully:", data);
      setUsers(Array.isArray(data) ? data : []);

      // ✅ Get the logged-in user from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log("📌 Logged-in user:", storedUser);

      if (!storedUser || !storedUser.email) {
        alert("❌ No logged-in user found. Redirecting to homepage...");
        navigate("/");
        return;
      }

      // ✅ Find the user in the API response
      const foundUser = data.find(
        (user) => user.email.toLowerCase() === storedUser.email.toLowerCase()
      );

      if (!foundUser) {
        alert("❌ You are not registered in the system. Redirecting...");
        navigate("/");
        return;
      }

      console.log("✅ Found user:", foundUser);

      // ✅ Check for admin field and redirect if not admin
      if (!("admin" in foundUser) || foundUser.admin.toLowerCase() !== "yes") {
        alert("❌ You are NOT an admin. Redirecting to homepage...");
        navigate("/");
        return;
      }

    } catch (error) {
      console.error("❌ Error fetching users:", error);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add or Update User
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email is required");
      return;
    }

    const userData = { email, password, admin }; // ✅ Include admin status

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

      fetchUsersAndCheckAdmin(); // ✅ Refresh users after update
      setEmail("");
      setPassword("");
      setAdmin("No");
      setEditingEmail(null);
    } catch (error) {
      console.error("Error updating users:", error);
      alert("Failed to update user.");
    }
  };

  // ✅ Edit User
  const handleEdit = (user) => {
    setEmail(user.email);
    setPassword(""); // Do not prefill password for security
    setAdmin(user.admin || "No"); // ✅ Prefill admin status
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
      setUsers(users.filter((user) => user.email !== email));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Maintain Users</h2>

      {/* Show loading/error messages */}
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

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
        <select value={admin} onChange={(e) => setAdmin(e.target.value)}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <button type="submit">{editingEmail ? "Update" : "Add"}</button>
      </form>

      {/* Users Table */}
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Password (Encrypted)</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4">No users found.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.password ? "Encrypted" : "No Password"}</td>
                <td>{user.admin ? user.admin : "No"}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.email)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MaintainUser;

