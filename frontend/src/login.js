import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Loader from './loader'; // Import Loader component

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onButtonClick = () => {
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!password) {
      setPasswordError("Please enter a password");
      return;
    }

    setIsLoading(true);

    fetch("https://as400.jcboe.org:3080/auth", {  // ✅ Send plain-text password to backend
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })  // ✅ No hashing in frontend
    })
    .then(r => r.json())
    .then(r => {
      if (r.message === 'success') {
        localStorage.setItem("user", JSON.stringify({ email, token: r.token }));
        props.setLoggedIn(true);
        props.setEmail(email);
        navigate("/main");
      } else {
        alert("Wrong email or password");
      }
    })
    .catch(error => {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    })
    .finally(() => setIsLoading(false));
  };


 
  
  
  return (
    <Container component="main" maxWidth="xs" style={{backgroundColor:'#C6B2A3'}}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor:'#C6B2A3' }}>
        <Avatar sx={{ m: 1, bgcolor: '#865d36' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <TextField
          error={!!emailError}
          helperText={emailError}
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />

        <TextField
          error={!!passwordError}
          helperText={passwordError}
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}

        <Button
          onClick={onButtonClick}
          fullWidth
          sx={{ mt: 3, mb: 2, backgroundColor: '#865d36', color: 'white' }}
        >
          Sign In
        </Button>

        {/* <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid> */}
      </Box>
    </Container>
  );
};

export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   TextField,
//   Box,
//   Typography,
//   Container
// } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// const Login = (props) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const onButtonClick = async () => {
//     setEmailError("");
//     setPasswordError("");

//     if (!email) {
//       setEmailError("Please enter your email");
//       return;
//     }

//     if (!password) {
//       setPasswordError("Please enter a password");
//       return;
//     }

//     try {
//       // ✅ Step 1: Fetch all users before attempting login
//       const usersResponse = await fetch("https://as400.jcboe.org:8080/api/employees/users");
//       const usersData = await usersResponse.json();

//       if (!usersResponse.ok) {
//         throw new Error("Failed to fetch users");
//       }

//       // ✅ Step 2: Check if entered email exists
//       const user = usersData.find((u) => u.email.toLowerCase() === email.toLowerCase());

//       if (!user) {
//         alert("❌ You are not allowed to log in. Your email is not registered.");
//         return;
//       }

//       // ✅ Step 3: If user exists, proceed with login
//       setIsLoading(true);

//       const response = await fetch("https://as400.jcboe.org:3080/auth", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const result = await response.json();
//       if (result.message === "success") {
//         localStorage.setItem(
//           "user",
//           JSON.stringify({ email: result.email, admin: result.admin, token: result.token })
//         );
//         props.setLoggedIn(true);
//         props.setEmail(result.email);
//         navigate("/main");
//       } else {
//         alert("❌ Invalid email or password");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("❌ Login failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs" style={{ backgroundColor: '#C6B2A3' }}>
//       <CssBaseline />
//       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#C6B2A3' }}>
//         <Avatar sx={{ m: 1, bgcolor: '#865d36' }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Login
//         </Typography>

//         <TextField
//           error={!!emailError}
//           helperText={emailError}
//           margin="normal"
//           required
//           fullWidth
//           label="Email Address"
//           autoComplete="email"
//           onChange={(e) => setEmail(e.target.value)}
//           autoFocus
//         />

//         <TextField
//           error={!!passwordError}
//           helperText={passwordError}
//           margin="normal"
//           required
//           fullWidth
//           label="Password"
//           type="password"
//           autoComplete="current-password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <Button
//           onClick={onButtonClick}
//           fullWidth
//           sx={{ mt: 3, mb: 2, backgroundColor: '#865d36', color: 'white' }}
//         >
//           Sign In
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   TextField,
//   Box,
//   Typography,
//   Container
// } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// const API_USERS = "https://as400.jcboe.org:8080/api/employees/users";
// const API_AUTH = "https://as400.jcboe.org:3080/auth";

// const Login = (props) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();

//   const onButtonClick = async () => {
//     setEmailError("");
//     setPasswordError("");

//     if (!email) {
//       setEmailError("Please enter your email");
//       return;
//     }

//     if (!password) {
//       setPasswordError("Please enter a password");
//       return;
//     }

//     try {
//       // ✅ Step 1: Fetch all users before attempting login
//       const usersResponse = await fetch(API_USERS);
//       const usersData = await usersResponse.json();

//       if (!usersResponse.ok) {
//         throw new Error("Failed to fetch users");
//       }

//       console.log("✅ Users fetched:", usersData);

//       // ✅ Step 2: Find the user object that matches the entered email
//       const foundUser = usersData.find((user) => user.email.toLowerCase() === email.toLowerCase());

//       if (!foundUser) {
//         alert("❌ Not authorized. Contact your administrator.");
//         return;
//       }

//       // ✅ Step 3: Display the user object in an alert
//       alert(`User found: ${JSON.stringify(foundUser, null, 2)}`);

//       // ✅ Step 4: Proceed with login
//       setIsLoading(true);

//       const response = await fetch(API_AUTH, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const result = await response.json();
//       if (result.message === "success") {
//         localStorage.setItem(
//           "user",
//           JSON.stringify({ email: result.email, admin: result.admin, token: result.token })
//         );
//         props.setLoggedIn(true);
//         props.setEmail(result.email);
//         navigate("/main");
//       } else {
//         alert("❌ Invalid email or password");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("❌ Login failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs" style={{ backgroundColor: '#C6B2A3' }}>
//       <CssBaseline />
//       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#C6B2A3' }}>
//         <Avatar sx={{ m: 1, bgcolor: '#865d36' }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Login
//         </Typography>

//         <TextField
//           error={!!emailError}
//           helperText={emailError}
//           margin="normal"
//           required
//           fullWidth
//           label="Email Address"
//           autoComplete="email"
//           onChange={(e) => setEmail(e.target.value)}
//           autoFocus
//         />

//         <TextField
//           error={!!passwordError}
//           helperText={passwordError}
//           margin="normal"
//           required
//           fullWidth
//           label="Password"
//           type="password"
//           autoComplete="current-password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <Button
//           onClick={onButtonClick}
//           fullWidth
//           sx={{ mt: 3, mb: 2, backgroundColor: '#865d36', color: 'white' }}
//         >
//           Sign In
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Login;
