import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs"; // ✅ Import bcrypt for frontend password comparison
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

const API_USERS = "https://as400.jcboe.org:8080/api/users";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // ✅ Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_USERS);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
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

    setIsLoading(true); // ✅ Show loader while logging in
    checkAccountExists(email, password);
  };

  // ✅ Compare entered password with hashed password
  const checkAccountExists = async (email, enteredPassword) => {
    const user = users.find(u => u.email === email);

    if (!user) {
      alert(`No account found for ${email}. Contact your administrator.`);
      setIsLoading(false);
      return;
    }

    // ✅ Compare entered password with hashed password
    const passwordMatches = await bcrypt.compare(enteredPassword, user.password);

    if (!passwordMatches) {
      alert("Incorrect password.");
      setIsLoading(false);
      return;
    }

    logIn(email);
  };

  // ✅ Login user
  const logIn = async (email) => {
    try {
      localStorage.setItem("user", JSON.stringify({ email }));
      setTimeout(() => {
        props.setLoggedIn(true);
        props.setEmail(email);
        navigate("/main");
      }, 0);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mainContainer" style={{ backgroundColor: '#C6B2A3' }}>
      {isLoading && <Loader />} {/* ✅ Show loader when logging in */}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: -8, marginLeft: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h1" component="h1" gutterBottom sx={{ color: 'black', fontWeight: 'bold', fontSize: '2.5rem', letterSpacing: '0.1em' }}>
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
