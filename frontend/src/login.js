// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   Link,
//   Grid,
//   Box,
//   Typography,
//   Container
// } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Loader from './loader'; // Import Loader component

// const Login = (props) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();

//   const onButtonClick = () => {
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

//     setIsLoading(true);

//     fetch("https://as400.jcboe.org:3080/auth", {  // ✅ Send plain-text password to backend
//       method: "POST",
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password })  // ✅ No hashing in frontend
//     })
//     .then(r => r.json())
//     .then(r => {
//       if (r.message === 'success') {
//         localStorage.setItem("user", JSON.stringify({ email, token: r.token }));
//         props.setLoggedIn(true);
//         props.setEmail(email);
//         navigate("/main");
//       } else {
//         alert("Wrong email or password");
//       }
//     })
//     .catch(error => {
//       console.error("Login error:", error);
//       alert("Login failed. Please try again.");
//     })
//     .finally(() => setIsLoading(false));
//   };


 
  
  
//   return (
//     <Container component="main" maxWidth="xs" style={{backgroundColor:'#C6B2A3'}}>
//       <CssBaseline />
//       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor:'#C6B2A3' }}>
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

//         {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}

//         <Button
//           onClick={onButtonClick}
//           fullWidth
//           sx={{ mt: 3, mb: 2, backgroundColor: '#865d36', color: 'white' }}
//         >
//           Sign In
//         </Button>

//         {/* <Grid container>
//           <Grid item xs>
//             <Link href="#" variant="body2">Forgot password?</Link>
//           </Grid>
//           <Grid item>
//             <Link href="#" variant="body2">{"Don't have an account? Sign Up"}</Link>
//           </Grid>
//         </Grid> */}
//       </Box>
//     </Container>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const API_USERS = "https://as400.jcboe.org:8080/api/employees/users";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false); // ✅ New state to track email validity

  const navigate = useNavigate();

  // ✅ Check if the entered email exists in API
  const checkEmailInAPI = async (enteredEmail) => {
    if (!enteredEmail) {
      setIsEmailValid(false);
      return;
    }

    try {
      const response = await fetch(API_USERS);
      if (!response.ok) throw new Error("Failed to fetch users");

      const users = await response.json();
      const userExists = users.some(user => user.email.toLowerCase() === enteredEmail.toLowerCase());

      if (userExists) {
        alert("✅ Email is present in the system.");
        setIsEmailValid(true); // ✅ Enable Sign In button
      } else {
        alert("❌ Email is NOT present in the system.");
        setIsEmailValid(false); // ✅ Disable Sign In button
      }
    } catch (error) {
      console.error("Error checking email:", error);
      alert("❌ Failed to check email. Please try again.");
      setIsEmailValid(false);
    }
  };

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

    fetch("https://as400.jcboe.org:3080/auth", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
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
    <Container component="main" maxWidth="xs" style={{ backgroundColor: '#C6B2A3' }}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#C6B2A3' }}>
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
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            checkEmailInAPI(e.target.value);  // ✅ Check email immediately when entered
          }}
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

        <Button
          onClick={onButtonClick}
          fullWidth
          sx={{ mt: 3, mb: 2, backgroundColor:!isEmailValid? 'grey': '#865d36', color: 'white' }}
          disabled={!isEmailValid} // ✅ Disable if email is not valid
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
