import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Button } from "@mui/material";

const S3000ShowPayments = () => {
    const { s3000EmployeeNumber } = useParams();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        if (!dateString || dateString.length !== 8) return "Invalid Date";
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        return `${month}/${day}/${year}`;
    };

    const formatCurrency = (amount) => {
        if (isNaN(amount)) return "Invalid Amount";
        return parseFloat(amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/s3000ShowPayments/${s3000EmployeeNumber}`);

                if (!response.ok) throw new Error("No payments found");
                const data = await response.json();
                setPayments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [s3000EmployeeNumber]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Box textAlign="center" mb={2}>
                    <Typography variant="h5">Payment Details</Typography>
                </Box>

                {payments.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Check #</strong></TableCell>
                                    <TableCell><strong>Date</strong></TableCell>
                                    <TableCell><strong>Gross Wages</strong></TableCell>
                                    <TableCell><strong>Net Pay</strong></TableCell>
                                    <TableCell><strong>Status</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {payments.map((payment, index) => (
                                    <TableRow key={`${payment.chknum}-${payment.chkdate}-${index}`}>
                                        <TableCell>{payment.chknum}</TableCell>
                                        <TableCell>{formatDate(payment.chkdate)}</TableCell>
                                        <TableCell>${formatCurrency(payment.gwages)}</TableCell>
                                        <TableCell>${formatCurrency(payment.newwages)}</TableCell>
                                        <TableCell>{payment.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography>No payments available</Typography>
                )}

                <Box mt={3} textAlign="center">
                    <Button variant="contained" color="secondary" onClick={() => navigate("/s3000EmpSrch")}>
                        BACK
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default S3000ShowPayments;
