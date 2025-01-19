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
  Container,
  CircularProgress
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Loader from './loader'; // Import Loader component

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loader

  localStorage.removeItem("user");
  props.setLoggedIn(false);

  const navigate = useNavigate();

  const onButtonClick = () => {
    setEmailError("");
    setPasswordError("");

    if (email === "") {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if (password === "") {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 8) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    setIsLoading(true); // Start the loader

    checkAccountExists((accountExists) => {
      if (accountExists) {
        logIn();
      } else if (window.confirm(`An account does not exist with this email address: ${email}. Do you want to create a new account?`)) {
        logIn();
      } else {
        setIsLoading(false); // Stop the loader if user cancels
      }
    });
  };

  const checkAccountExists = (callback) => {
    fetch("https://as400.jcboe.org:3080/check-account", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    .then(r => r.json())
    .then(r => {
      callback(r?.userExists);
    });
  };

  const logIn = () => {
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
      setIsLoading(false); // Stop the loader after login response
    });
  };

  return (
    <div className="mainContainer" style={{ backgroundColor: '#C6B2A3' }}>
      {isLoading && <Loader />} {/* Show loader when isLoading is true */}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: -8,
            marginLeft: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom 
            sx={{ color: 'black', fontWeight: 'bold', fontSize: '2.5rem', letterSpacing: '0.1em' }}
          >
          Legacy Data
          </Typography>
          
          <Avatar sx={{ m: 1, bgcolor: '#865d36' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <TextField
            style={{ backgroundColor: '#D9CCC4' }}
            error={!!emailError}
            helperText={emailError}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />

          <TextField
            style={{ backgroundColor: '#D9CCC4' }}
            error={!!passwordError}
            helperText={passwordError}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

          <Button
            type="submit"
            onClick={onButtonClick}
            fullWidth
            sx={{ mt: 3, mb: 2, backgroundColor: '#865d36', color: 'white', '&:hover': { backgroundColor: 'black' } }}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" style={{ color: 'white' }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" style={{ color: 'white' }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
