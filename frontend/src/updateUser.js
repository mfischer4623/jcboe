// import React, { useState } from "react";
// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   TextField,
//   Typography,
//   Container,
//   Box,
//   Grid,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";


// const theme = createTheme();

// const UpdateUser = (props) => {
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const navigate = useNavigate();


//   const validateInputs = () => {
//     let isValid = true;
//     setEmailError("");
//     setPasswordError("");
//     setSuccessMessage("");

//     // Validate Email
//     if (!email) {
//       setEmailError("Please enter your email");
//       isValid = false;
//     } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
//       setEmailError("Please enter a valid email");
//       isValid = false;
//     }

//     // Validate Passwords
//     if (!newPassword || !confirmPassword) {
//       setPasswordError("Both password fields are required");
//       isValid = false;
//     } else if (newPassword !== confirmPassword) {
//       setPasswordError("Passwords do not match");
//       isValid = false;
//     } else if (newPassword.length < 8) {
//       setPasswordError("Password must be at least 8 characters long");
//       isValid = false;
//     }

//     return isValid;
//   };

//   const handleSubmit = async () => {
//     if (!validateInputs()) return;
//     fetch("https://as400.jcboe.org:3080/auth", {
//       method: "POST",
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, newPassword })
//     })
//     .then(r => r.json())
//     .then(r => {
//       if (r.message === 'success') {
//         localStorage.setItem("user", JSON.stringify({ email, token: r.token }));
//         // props.setLoggedIn(true);
//         props.setEmail(email);
//         // navigate("/main");
//       } else {
//         alert("Wrong email or password");
//       }
//     //   setIsLoading(false); // Stop the loader after login response
//     });
//   };


// //   const handleSubmit = async () => {
// //     if (!validateInputs()) return;

// //     try {
// //       const response = await fetch("http://localhost:3080/update-password", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ email, newPassword }),
// //       });

// //       const result = await response.json();

// //       if (result.success) {
// //         setSuccessMessage("Password updated successfully!");
// //       } else {
// //         setEmailError(result.message || "Error updating password");
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       setEmailError("Failed to connect to the server");
// //     }
// //   };

//   return (
//     <div style={{ backgroundColor: '#C6B2A3' }}>
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "#865d36" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             User Login Maintenance
//           </Typography>
//           <Box component="form" noValidate sx={{ mt: 1 }}>
//             <TextField
//               style={{ backgroundColor: "#D9CCC4" }}
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               onChange={(e) => setEmail(e.target.value)}
//               error={!!emailError}
//               helperText={emailError}
//             />
//             <TextField
//               style={{ backgroundColor: "#D9CCC4" }}
//               margin="normal"
//               required
//               fullWidth
//               name="newPassword"
//               label="New Password"
//               type="password"
//               id="newPassword"
//               onChange={(e) => setNewPassword(e.target.value)}
//             />
//             <TextField
//               style={{ backgroundColor: "#D9CCC4" }}
//               margin="normal"
//               required
//               fullWidth
//               name="confirmPassword"
//               label="Confirm Password"
//               type="password"
//               id="confirmPassword"
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               error={!!passwordError}
//               helperText={passwordError}
//             />
//             <Button
//               type="button"
//               fullWidth
//               variant="contained"
//               sx={{
//                 mt: 3,
//                 mb: 2,
//                 backgroundColor: "#865d36",
//                 color: "white",
//                 "&:hover": { backgroundColor: "black" },
//               }}
//               onClick={handleSubmit}
//             >
//               Update Password
//             </Button>
//             {successMessage && (
//               <Typography variant="body2" color="green" align="center">
//                 {successMessage}
//               </Typography>
//             )}
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//     </div>
//   );
// };

// export default UpdateUser;



import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const UpdateUser = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const theme = createTheme();

  // Reset error and success states
  const resetStates = () => {
    setEmailError("");
    setPasswordError("");
    setSuccessMessage("");
  };

  // Handle Update User
  const handleUpdate = async () => {
    resetStates();

    if (!email) {
      setEmailError("Please enter an email");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://as400.jcboe.org:3080/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message || "Password updated successfully");
      } else {
        setEmailError(data.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setEmailError("An error occurred while updating the user");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Delete User
  const handleDelete = async () => {
    resetStates();

    if (!email) {
      setEmailError("Please enter an email to delete");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://as400.jcboe.org:3080/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message || "User deleted successfully");
      } else {
        setEmailError(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setEmailError("An error occurred while deleting the user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Management
          </Typography>
          {isLoading && <CircularProgress sx={{ mt: 2 }} />}
          <Box sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={!!passwordError}
            />
            <TextField
              margin="normal"
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={handleUpdate}
            >
              Update User
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Delete User
            </Button>
          </Box>
          {successMessage && (
            <Typography color="success.main" variant="body2" mt={2}>
              {successMessage}
            </Typography>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UpdateUser;

