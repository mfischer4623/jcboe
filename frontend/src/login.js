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

const Login = ({ setLoggedIn, setEmail }) => {
  const [email, setLocalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

    fetch("https://as400.jcboe.org:3080/auth", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'success') {
        localStorage.setItem("user", JSON.stringify({ email, token: data.token }));
        setLoggedIn(true);  // ✅ Updating loggedIn in App.js
        setEmail(email);
        navigate("/employeeSearch");
      } else {
        setEmailError("Invalid email or password");
        setLoggedIn(false);  // ✅ Ensure failed login sets loggedIn to false
      }
    })
    .catch(error => {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
      setLoggedIn(false);  // ✅ Ensure failed login sets loggedIn to false
    });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ backgroundColor: '#C6B2A3' }}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#C6B2A3' }}>
        <Avatar sx={{ m: 1, bgcolor: '#865d36' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5"> Login </Typography>

        <TextField
          error={!!emailError}
          helperText={emailError}
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          value={email}
          onChange={(e) => setLocalEmail(e.target.value)}
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
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
