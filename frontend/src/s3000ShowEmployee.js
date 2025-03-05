import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Paper, CircularProgress, Button } from "@mui/material";
// import { useParams } from "react-router-dom";

const S3000ShowEmployee = ({ s3000EmployeeNumber }) => {
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!s3000EmployeeNumber) {
            setError("Employee number is missing.");
            setLoading(false);
            return;
        }

        const fetchEmployeeData = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/s3000EmpSrch/${s3000EmployeeNumber}`);
                if (!response.ok) throw new Error("Employee not found");
                const data = await response.json();
                setEmployeeData(data);
                console.log(employeeData)
                console.log(data)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Box textAlign="center" mb={2}>
                    <Typography variant="h5">Employee Details</Typography>
                </Box>
                {employeeData ? (
                    <>
                        <Typography><strong>Name:</strong> {employeeData.firstname} {employeeData.lastname}</Typography>
                        <Typography><strong>Address:</strong> {employeeData.address1} {employeeData.address2}</Typography>
                        <Typography><strong>City, State Zip:</strong> {employeeData.city}, {employeeData.state} {employeeData.zip}</Typography>
                        <Typography><strong>Location:</strong> {employeeData.location}</Typography>
                        <Typography><strong>Hire Date:</strong> {employeeData.hiredate}</Typography>
                        <Typography><strong>Last Salary Date:</strong> {employeeData.lastsaldte}</Typography>
                    </>
                ) : (
                    <Typography>No data available</Typography>
                )}
                <Box mt={3} display="flex" justifyContent="space-between">
                    <Button variant="contained" color="secondary" onClick={() => navigate("/s3000EmpSrch")}>
                        BACK
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => navigate("/s3000ShowPayments")}>
                        SHOW PAYMENTS
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default S3000ShowEmployee;
