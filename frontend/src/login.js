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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

        <Button
          onClick={onButtonClick}
          fullWidth
          sx={{ mt: 3, mb: 2, backgroundColor: '#865d36', color: 'white' }}
        >
          Sign In
        </Button>

        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
