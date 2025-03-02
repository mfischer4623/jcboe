import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button, Paper } from "@mui/material";

const S3000EmpSrch = () => {
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [employeeData, setEmployeeData] = useState(null);
    const [employees, setEmployees] = useState([]);

    // Fetch employee by number
    const onSearchByNumber = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/employees/${employeeNumber}`);
            if (!response.ok) throw new Error("Employee not found");
            const data = await response.json();
            setEmployeeData(data);
        } catch (error) {
            console.error("Error fetching employee:", error);
            alert("Employee not found");
        }
    };

    // Fetch employees by last name
    const onSearchByName = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/employees?name=${employeeName}`);
            if (!response.ok) throw new Error("No employees found");
            const data = await response.json();
            setEmployees(data);
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
                        onChange={(e) => setEmployeeNumber(e.target.value)}
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
                        onChange={(e) => setEmployeeName(e.target.value)}
                    />
                    <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={onSearchByName}>
                        Search by Last Name
                    </Button>
                </Box>

                {/* Display Employee Data */}
                {employeeData && (
                    <Box mt={2} p={2} bgcolor="lightgray">
                        <Typography variant="h6">Employee Details</Typography>
                        <Typography>Emp Num: {employeeData.emp_num}</Typography>
                        <Typography>Name: {employeeData.firstname} {employeeData.lastname}</Typography>
                        <Typography>Department: {employeeData.dept}</Typography>
                        <Typography>Phone: {employeeData.phone}</Typography>
                    </Box>
                )}

                {/* Display Multiple Employees Found */}
                {employees.length > 0 && (
                    <Box mt={2}>
                        <Typography variant="h6">Matching Employees</Typography>
                        {employees.map((emp) => (
                            <Box key={emp.emp_num} p={1} bgcolor="lightgray" mb={1}>
                                {emp.firstname} {emp.lastname} (Emp Num: {emp.emp_num})
                            </Box>
                        ))}
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default S3000EmpSrch;
