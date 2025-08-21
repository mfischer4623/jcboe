import React from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardActions, Button, Typography, Box, Container } from "@mui/material";

const Home = (props) => {
    const { loggedIn, email } = props;
    const navigate = useNavigate();

    const onButtonClick = () => {
        if (loggedIn) {
            localStorage.removeItem("user")
            props.setLoggedIn(false)
        } else { 
            navigate("/login")
        }
    }

    localStorage.setItem("navMenu", "menu1")

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card sx={{ 
                bgcolor: '#A69080',    // Background color
                borderRadius: 3,         // Rounded corners
                boxShadow: 3,            // Box shadow
                border: '2px solid black' // Border
            }}>
                <CardContent>
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                        {/* <Typography variant="h4" component="div"> */}
                        <Typography
            variant="h4"
            component="div"
            style={{
                color: 'Black',
                fontWeight: '900',
               // textDecoration: 'underline',
                padding: '10px',
            }}>
                        Legacy Data
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                        {/* <Typography variant="h6"> */}
                        <Typography
            variant="h4"
            component="div"
            style={{
                color: 'Black',
                fontWeight: '900',
               // textDecoration: 'underline',
                padding: '10px',
            }}>
                            Please {loggedIn ? "Log Out" : "Log In"}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                        // variant="contained"
                        // color={loggedIn ? "secondary" : "primary"}
                        sx={{backgroundColor:'#865d36',color:'white', border:'black', '&:hover': {
                            backgroundColor: 'black'}}}
                        onClick= {onButtonClick}
                    >
                        {loggedIn ? "Log out" : "Log in"}
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
};

export default Home;
