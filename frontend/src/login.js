import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
    localStorage.removeItem("user")
    props.setLoggedIn(false)

    const navigate = useNavigate();
        
    const onButtonClick = () => {
        
        console.log(email + "is the email");
        // Set initial error values to empty
        setEmailError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }

        // Check if email has an account associated with it
        checkAccountExists(accountExists => {
            // If yes, log in 
            if (accountExists)
                logIn()
            else
            // Else, ask user if they want to create a new account and if yes, then log in
                if (window.confirm("An account does not exist with this email address: " + email + ". Do you want to create a new account?")) {
                    logIn()
                }
        })        
  

    }

    // Call the server API to check if the given email ID already exists
    const checkAccountExists = (callback) => {
        fetch("https://as400.jcboe.org:3080/check-account", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email})
        })
        .then(r => r.json())
        .then(r => {
            callback(r?.userExists)
        })
    }

    // Log in a user using email and password
    const logIn = () => {
        fetch("https://as400.jcboe.org:3080/auth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email, password})
        })
        .then(r => r.json())
        .then(r => {
            if ('success' === r.message) {
                localStorage.setItem("user", JSON.stringify({email, token: r.token}))
                props.setLoggedIn(true)
                props.setEmail(email)
                navigate("/main")
            } else {
                window.alert("Wrong email or password")
            }
        })
    }
    

    return (
<div className={"mainContainer"} style={{ backgroundColor:'#C6B2A3'}}>

<Container component="main" maxWidth="xs">

  <CssBaseline />
  <Box
    sx={{
     marginTop:-8,
     marginLeft:3,
   
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
     <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom 
            sx={{ 
              color: 'black', 
              fontWeight: 'bold', 
              fontSize: '2.5rem', 
              letterSpacing: '0.1em' 
            }}
          >
            AS/400 Data
          </Typography>
          
    <Avatar sx={{ m: 1, bgcolor: '#865d36' }}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Login
    </Typography>
      <TextField
      style={{backgroundColor:'#D9CCC4'}}
      error={emailError ?  true: false}
      helperText={emailError}
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        onChange={(event) => {
            setEmail(event.target.value);
            console.log(email)
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#3E362E', // Change this to your desired color
              },
            },
            '& label.Mui-focused': {
              color: '#3E362E', // Change the label color on focus (optional)
            },
          }}
          
        
        autoFocus
      />
      <TextField
       style={{backgroundColor:'#D9CCC4'}}
      error={passwordError ?  true: false}
      helperText={passwordError}
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        onChange={(event) => {
            setPassword(event.target.value);
            console.log(password)
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#3E362E', // Change this to your desired color
              },
            },
            '& label.Mui-focused': {
              color: '#3E362E', // Change the label color on focus (optional)
            },
          }}
          
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        onClick={
           onButtonClick
          }
        fullWidth
        // variant="contained"
        sx={{ mt: 3, mb: 2 , backgroundColor:  '#865d36',  color:'white', '&:hover': {
          backgroundColor: 'black'}}}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2" style={{color:'white'}}>
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2"  style={{color:'white'}}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
</Container>
</div>
    )
}

export default Login