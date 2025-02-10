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


// import React, { useState, useEffect } from "react";
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
//   const [users, setUsers] = useState([]); // Store all users from GET API

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // ✅ Fetch all users on component mount
//   const fetchUsers = async () => {
//     try {
//       const response = await fetch(API_USERS);
//       if (!response.ok) throw new Error("Failed to fetch users");

//       const data = await response.json();
//       setUsers(data); // Store API response
//       console.log("✅ Users fetched:", data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   // ✅ Check if email exists when user types
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     const foundUser = users.find((user) => user.email.toLowerCase() === e.target.value.toLowerCase());
// //console.log("hello1")
//     if (foundUser) {
//     //  console.log("hello2")
//      // alert(`✅ Email found in database:\nEmail: ${foundUser.email}\nAdmin: ${foundUser.admin || "No Admin Info"}`);
//     } else if (e.target.value) {
//       //console.log("hello3")

//     //  alert("❌ Email not found in database. Please contact your administrator.");
//     }
//   };

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
//       // ✅ Verify email is present in GET API before login
//       const foundUser = users.find(
//         (user) => 
//           user.email.toLowerCase() === email.toLowerCase() 
         
//       );

//       if (!foundUser) {
//         alert("❌ User not found. Invalid email or password.\n Contact your administrator");
//         return;
//       }

//       alert(`User found:\nEmail: ${foundUser.email}`);

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
//           JSON.stringify({ email: result.email, admin: foundUser.admin, token: result.token })
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
//           onChange={handleEmailChange}
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
