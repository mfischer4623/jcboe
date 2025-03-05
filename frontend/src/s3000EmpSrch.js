import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const S3000EmpSrch = (props) => {
    const { setS3000EmployeeNames, setS3000EmployeeNumber, setS3000EmployeeName } = props;
    const [employeeNumber, setLocalEmployeeNumber] = useState('');
    const [employeeName, setLocalEmployeeName] = useState([]);
    const navigate = useNavigate();

    // Fetch employee by number
    const onSearchByNumber = async () => {
        try {
            const response = await fetch(`https://as400.jcboe.org:8080/api/employees/s3000EmpSrch/${employeeNumber}`);
            if (!response.ok) throw new Error("Employee not found");
            const data = await response.json();
            setS3000EmployeeNumber(data.emp_num);
            console.log("Fetched employee number:", data.emp_num);
            navigate("/s3000showEmployee");
        } catch (error) {
            console.error("Error fetching employee:", error);
            alert("Employee not found");
        }
    };

    // Fetch employees by last name
    const onSearchByName = async () => {
        try {
            const response = await fetch(`https://as400.jcboe.org:8080/api/employees/s3000EmpSrch?name=${employeeName}`);
            if (!response.ok) throw new Error("No employees found");
            const data = await response.json();
            setS3000EmployeeNames(data);
            setS3000EmployeeName(employeeName)
            if (data.length > 0) {
                navigate("/s3000EmpName");
            } else {
                alert("No employees found with that last name.");
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
            alert("No employees found");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Box textAlign="center" mb={2}>
                    <Typography variant="h5">S3000 Employee Search</Typography>
                </Box>

                {/* Search by Employee Number */}
                <Box mb={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Employee Number"
                        value={employeeNumber}
                        onChange={(e) => setLocalEmployeeNumber(e.target.value)}
                    />
                    <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={onSearchByNumber}>
                        Search by Employee Number
                    </Button>
                </Box>

                {/* Search by Employee Last Name */}
                <Box mb={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Employee Last Name"
                        value={employeeName}
                        onChange={(e) => setLocalEmployeeName(e.target.value)}
                    />
                    <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={onSearchByName}>
                        Search by Last Name
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default S3000EmpSrch;
