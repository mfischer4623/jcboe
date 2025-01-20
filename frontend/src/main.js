import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';

const Main = (props) => {
    const { loggedIn, email } = props;
    const navigate = useNavigate();

    const onButtonClick = () => {
        if (loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
        } else { 
            navigate("/login");
        }
    };

    localStorage.setItem("navMenu", "menu1");

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ flexGrow: 1, mt: 4 }}>
                <Grid container spacing={3} justifyContent="center">
                    
                    {/* Card Section */}
                    <Grid item xs={12} sm={8}>
                        <Card sx={{ maxWidth: 500, mx: "auto" }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Hello <Avatar sx={{ display: "inline", ml: 1 }} />
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <b>You have reached your website...</b><br />
                                    To continue accessing your website, <br />
                                    click on Employee Dashboard below!
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to="/employeeSearch" style={{ textDecoration: "none" }}>
                                    <Button variant="contained" color="primary" size="small">
                                        Employee Dashboard
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>

                    {/* Alert Section */}
                    <Grid item xs={12} sm={8}>
                        <Alert variant="filled" severity="success">
                            Login Attempt Successful!!!
                        </Alert>
                    </Grid>

                </Grid>
            </Box>
        </Container>
    );
};

export default Main;
