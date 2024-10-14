import React from "react"
import { useNavigate,Link } from "react-router-dom";
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
    const { loggedIn, email } = props
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

    const Item = styled(Paper)(({ theme }) => ({
        // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return (
        <Container component="main" maxWidth="xs">
               <Box sx={{ flexGrow: 1 }}>

  <Grid xs>
  <Card sx={{ maxWidth: 500 }}>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Hello  <Avatar/>
        </Typography>
        <Typography variant="body1" color="text.secondary">
        <b> You have reached ur website... <br/>
         To continue accessing ur website..<br/>
         click on Employee dashboard below! </b><br/>
        </Typography>
      </CardContent>
      <CardActions>
      <Link to="/employeeSearch">
        <Button size="small">Employee Dashboard</Button>
        </Link>
      </CardActions>
    </Card>
  </Grid>
  <Grid item xs>
  <Alert variant="filled" severity="success">
  Login Attempt Successfull!!!
</Alert>
  </Grid> 

</Box>
        </Container>
    )
}

export default Main