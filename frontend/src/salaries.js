import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, TablePagination, TableSortLabel, Paper, TextField, Toolbar,
    Typography, Button
} from "@mui/material";
import "./salaries.css";

const Salaries = (props) => {
    const { loggedIn, email, employeeNumber, empName, sd, setSalaries, showPrintView, setShowPrintView } = props;

    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("SCHYEAR");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
            navigate("/");
            return;
        }

        if (!employeeNumber) {
            console.error("Missing employeeNumber");
            navigate("/employeeSearch");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/salaries/${employeeNumber}`);
                const resData = await response.json();

                if (Array.isArray(resData)) {
                    setSalaries(resData);
                } else {
                    console.error("Unexpected data format:", resData);
                    setSalaries([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setSalaries([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [loggedIn, employeeNumber, setSalaries, navigate]);

    if (loading) {
        return <h1>Loading salaries...</h1>;
    }

    if (!sd || !Array.isArray(sd)) {
        return <h1>No salary data available</h1>;
    }

    return (
        <div className="mainContainer">
            <h2>Salaries</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>School Year</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Salary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sd.map((salary, index) => (
                            <TableRow key={index}>
                                <TableCell>{salary.SCHYEAR}</TableCell>
                                <TableCell>{salary.EMLOC}</TableCell>
                                <TableCell>${salary.SALARY}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Salaries;
