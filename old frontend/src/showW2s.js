import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, TablePagination, Paper, Button
} from "@mui/material";
import "./showW2s.css";

const ShowW2s = (props) => {
    const { loggedIn, email, employeeNumber, ssn, w2s, setW2s, empName, setW2ID, w2ID, setShowPrintView, showPrintView } = props;
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
            navigate("/");
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/pfrs860s/${ssn}`);
                const resData = await response.json();
                // Ensure that resData is an array before setting it to w2s
                setW2s(Array.isArray(resData) ? resData : []);
            } catch (error) {
                console.log("error", error);
                navigate("/showEmployee");
            }
        };
        fetchData();
    }, []);

    if (!Array.isArray(w2s)) {
        return <h1>Loading...</h1>;
    }

    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const w2Selected = (W2CLYR, W2ESTB) => {
        const w2ido = { SSN: ssn, YEAR: W2CLYR, ESTB: W2ESTB };
        setW2ID(w2ido);
        navigate("/showW2Details");
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handlePrint = () => {
        setShowPrintView(true); // Show print view before printing
        setTimeout(() => {
            window.print();
            setShowPrintView(false); // Hide print view after printing
            // setExpanded(false);
        }, 500);
    };

    return (
        <div className="mainContainer">
            {/* Print-only heading */}
            <div className="print-heading">
                Employee Number: {employeeNumber} <br />
                Employee Name: {empName}
            </div>
            <div className="titleContainer">
                <h2>W2s</h2>
                <h4>Employee Name: {empName}</h4>
                <h4>Employee Number: {employeeNumber}</h4>
            </div>
            <br />
            <Paper >
                <style>
                    {`
                    .headerCell {
                        color: white;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .rowCell {
                        color: #FFD700;
                    }
                    .headerRow {
                        background-color: #865d36;
                    }
                `}
                </style>
                <TableContainer>
                    <Table>
                        <TableHead>
                            {/* <TableRow className="header-row headerRow">
                                <TableCell className="headerCell" sx={{ "&:hover": { color: "yellow" } }} colSpan={7}>Employee Number: {employeeNumber}</TableCell>
                            </TableRow>
                            <TableRow className="header-row" style={{ backgroundColor: "#865d36" }}>
                                <TableCell className="headerCell" sx={{ "&:hover": { color: "yellow" } }} colSpan={7}>Employee Name: {empName}</TableCell>
                            </TableRow> */}
                            <TableRow style={{ backgroundColor: "#865d36" }}>
                                <TableCell className="headerCell" sx={{ "&:hover": { color: "yellow" } }}>Tax</TableCell>
                                <TableCell className="headerCell" sx={{ "&:hover": { color: "yellow" } }}>Federal</TableCell>
                                <TableCell className="headerCell" sx={{ "&:hover": { color: "yellow" } }}>FICA</TableCell>
                                <TableCell className="headerCell" sx={{ "&:hover": { color: "yellow" } }}>Medicare</TableCell>
                                <TableCell className="headerCell" sx={{ "&:hover": { color: "yellow" } }}>Federal</TableCell>
                                <TableCell className="headerCell" sx={{ "&:hover": { color: "yellow" } }}>FICA</TableCell>
                                <TableCell className="headerCell" sx={{ "&:hover": { color: "yellow" } }}>Medicare</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Year</TableCell>
                                <TableCell>Wages</TableCell>
                                <TableCell>Wages</TableCell>
                                <TableCell>Wages</TableCell>
                                <TableCell>Withheld</TableCell>
                                <TableCell>Withheld</TableCell>
                                <TableCell>Withheld</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {w2s.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((w2sd, i) => {
                                let W2CLYR = w2sd.W2CLYR < 10 ? `200${w2sd.W2CLYR}` : `20${w2sd.W2CLYR}`;
                                return (
                                    <TableRow key={i} className="table-row">
                                        <TableCell>
                                            <a href="#" onClick={() => w2Selected(w2sd.W2CLYR, w2sd.W2ESTB)}>
                                                {W2CLYR}
                                            </a>
                                        </TableCell>
                                        <TableCell>{dollarUS.format(w2sd.W2WAGE)}</TableCell>
                                        <TableCell>{dollarUS.format(w2sd.W2FICW)}</TableCell>
                                        <TableCell>{dollarUS.format(w2sd.W2FICM)}</TableCell>
                                        <TableCell>{dollarUS.format(w2sd.W2FEDT)}</TableCell>
                                        <TableCell>{dollarUS.format(w2sd.W2FTWH)}</TableCell>
                                        <TableCell>{dollarUS.format(w2sd.W2FMWH)}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={w2s.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <br />
            <Button sx={{ backgroundColor: 'rgb(134, 93, 54)', '&:hover': { backgroundColor: 'black' } }} className="print-button" variant="contained" color="primary" onClick={handlePrint}>
                Print
            </Button>
            <br />
            <div>Your email is {email}</div>
        </div>
    );
};

export default ShowW2s;