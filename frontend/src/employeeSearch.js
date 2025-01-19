import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';

const EmployeeSearch = (props) => {
    const { loggedIn, email, employeeNumber, employeeName, setEmployeeNumber, setEmployeeName, setEmployeeNames } = props;
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
            navigate("/");
        }
    }, [loggedIn, navigate, props]);

    const onENButtonClick = async () => {
        let resData = null;
        try {
            const response = await fetch(`https://as400.jcboe.org:8080/api/employees/${employeeNumber}`);
            resData = await response.json();
            if (resData.EMSSAN === employeeNumber) {
                navigate("/showEmployee");
            } else {
                window.alert(`Wrong Employee Number ` + employeeNumber);
            }
        } catch (error) {
            console.log(error);
            window.alert(`Wrong Employee Number ` + employeeNumber);
        }
    };

    const onENameButtonClick = async () => {
        let resData = null;
        try {
            const response = await fetch(`https://as400.jcboe.org:8080/api/employees/?name=${employeeName}`);
            resData = await response.json();
            setEmployeeNames(resData);
            if (resData.length > 0 && employeeName !== '') {
                navigate("/employeeName");
            } else {
                window.alert(`No employees found with name ` + employeeName);
            }
        } catch (error) {
            console.log("error", error);
            navigate("/employeeSearch");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Box textAlign="center" mb={2}>
                    <Typography variant="h5" component="div" gutterBottom>
                       Legacy Data
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        Employee Search
                    </Typography>
                </Box>

                <Box mb={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Employee Last Name"
                        value={employeeName}
                        onChange={ev => setEmployeeName(ev.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                       // color="primary"
                        sx={{ marginTop: 2, backgroundColor:  '#865d36', '&:hover': {
                            backgroundColor: 'black', // Custom hover color
                        }}}
                        onClick={onENameButtonClick}
                    >
                        Employee Name Search
                    </Button>
                </Box>

                <Box mb={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Employee Number"
                        value={employeeNumber}
                        onChange={ev => setEmployeeNumber(ev.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2, backgroundColor:  '#865d36',  '&:hover': {
                            backgroundColor: 'black', // Custom hover color
                        } }}
                        onClick={onENButtonClick}
                    >
                        Choose Employee
                    </Button>
                </Box>

                <Typography variant="body2" color="textSecondary">
                    Your email is {email}
                </Typography>
            </Paper>
        </Container>
    );
};

export default EmployeeSearch;
