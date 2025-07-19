import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Button, Typography } from "@mui/material";

const S3000DisplayPayment = () => {
    const { chknum, chkdate } = useParams();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/s3000displaypayment/${chknum}/${chkdate}`);

                if (!response.ok) throw new Error("No payment details found");
                const data = await response.json();
                setPayments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentDetails();
    }, [chknum, chkdate]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Typography variant="h5" textAlign="center">Payment Details for Check #{chknum} - {chkdate}</Typography>
                
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Employee #</strong></TableCell>
                                <TableCell><strong>Last Name</strong></TableCell>
                                <TableCell><strong>First Name</strong></TableCell>
                                <TableCell><strong>Gross Wages</strong></TableCell>
                                <TableCell><strong>Net Pay</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payments.map((payment, index) => (
                                <TableRow key={index}>
                                    <TableCell>{payment.employeenum}</TableCell>
                                    <TableCell>{payment.lname}</TableCell>
                                    <TableCell>{payment.fname}</TableCell>
                                    <TableCell>${payment.gwages}</TableCell>
                                    <TableCell>${payment.newwages}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button variant="contained" color="secondary" onClick={() => navigate(-1)} sx={{ mt: 3 }}>
                    BACK
                </Button>
            </Paper>
        </Container>
    );
};

export default S3000DisplayPayment;
