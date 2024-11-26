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
    const [expandTable, setExpandTable] = useState(false);

    const [filterSchoolYear, setFilterSchoolYear] = useState("");
    const [filterLocation, setFilterLocation] = useState("");
    const [filterJobTitle, setFilterJobTitle] = useState("");

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
            navigate("/");
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/salaries/${employeeNumber}`);
                const resData = await response.json();

                if (Array.isArray(resData)) {
                    setSalaries(resData);
                } else {
                    console.error("Unexpected data format:", resData);
                    setSalaries([]); // Default to an empty array if data is invalid
                }
            } catch (error) {
                console.log("Error fetching data:", error);
                setSalaries([]); // Default to an empty array in case of an error
                navigate("/showEmployee");
            }
        };

        fetchData();
    }, [loggedIn, employeeNumber, setSalaries, navigate]);

    const handleExpandTable = () => {
        setExpandTable(!expandTable);
    };

    const handlePrint = () => {
        setShowPrintView(true); // Show print view before printing
        setTimeout(() => {
            window.print();
            setShowPrintView(false); // Hide print view after printing
        }, 500);
        //  window.print();
    };

    if (!Array.isArray(sd)) {
        return <h1>Loading...</h1>; // Or display an appropriate message
    }


    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Filtered and Sorted Data
    const filteredSalaries = (Array.isArray(sd) ? sd : []).filter((sdd) =>
        String(sdd.SCHYEAR || "").toLowerCase().includes(filterSchoolYear.toLowerCase()) &&
        String(sdd.EMLOC || "").toLowerCase().includes(filterLocation.toLowerCase()) &&
        String(sdd.JDTITL || "").toLowerCase().includes(filterJobTitle.toLowerCase())
    );




    const sortedSalaries = filteredSalaries.sort((a, b) => {
        if (order === "asc") {
            return a[orderBy] < b[orderBy] ? -1 : 1;
        } else {
            return a[orderBy] > b[orderBy] ? -1 : 1;
        }
    });

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <h2>Salaries</h2>
            </div>
            <br />

            {/* Filters */}
            <Toolbar>
                <Typography sx={{ fontSize: '20px', marginRight: '20px' }}>
                    <b>Filter Data: </b>
                </Typography>
                <TextField
                    label="School Year"
                    variant="outlined"
                    size="small"
                    value={filterSchoolYear}
                    onChange={(e) => setFilterSchoolYear(e.target.value)}
                    style={{ marginRight: "10px", backgroundColor: '#F0E8E2' }}
                />
                <TextField
                    label="Location"
                    variant="outlined"
                    size="small"
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    style={{ marginRight: "10px", backgroundColor: '#F0E8E2' }}
                />
                <TextField
                    label="Job Title"
                    variant="outlined"
                    size="small"
                    value={filterJobTitle}
                    onChange={(e) => setFilterJobTitle(e.target.value)}
                    style={{ marginRight: "10px", backgroundColor: '#F0E8E2' }}
                />
                <Button
                    variant="contained"
                    onClick={handleExpandTable}
                    sx={{
                        backgroundColor: '#865d36',
                        color: 'white',
                        '&:hover': { backgroundColor: 'black' },
                        marginLeft: 'auto',
                        marginRight: '10px',
                    }}
                >
                    {expandTable ? "Collapse Table" : "Expand Table"}
                </Button>
                <Button
                    variant="contained"
                    onClick={handlePrint}
                    sx={{
                        backgroundColor: '#865d36',
                        color: 'white',
                        '&:hover': { backgroundColor: 'black' },
                    }}
                >
                    Print Table
                </Button>
            </Toolbar>
            {/* Table */}
            <TableContainer style={{ width: "70%", marginLeft: '15%' }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                sx={{
                                    textAlign: 'center',
                                    fontSize: '23px',
                                    backgroundColor: '#865d36',
                                    color: 'white',
                                }}
                                className="employee-header"
                            >
                                <div>
                                    <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                                        Employee Number: {employeeNumber}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                                        Employee Name: {empName}
                                    </Typography>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ backgroundColor: '#865d36', color: 'white' }}>
                            <TableCell sx={{ color: 'white' }}>
                                <TableSortLabel
                                    active={orderBy === "SCHYEAR"}
                                    direction={orderBy === "SCHYEAR" ? order : "asc"}
                                    onClick={() => handleRequestSort("SCHYEAR")}
                                    sx={{
                                        color: 'white',
                                        '& .MuiTableSortLabel-icon': { color: 'white !important' },
                                        '&:hover': { color: 'yellow' },
                                        '&.MuiTableSortLabel-active': { color: 'yellow' }
                                    }}
                                >
                                    <b>School Year</b>
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                <TableSortLabel
                                    active={orderBy === "EMLOC"}
                                    direction={orderBy === "EMLOC" ? order : "asc"}
                                    onClick={() => handleRequestSort("EMLOC")}
                                    sx={{
                                        color: 'white',
                                        '& .MuiTableSortLabel-icon': { color: 'white !important' },
                                        '&:hover': { color: 'yellow' },
                                        '&.MuiTableSortLabel-active': { color: 'yellow' }
                                    }}
                                >
                                    <b>Location</b>
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                <b>Job Code</b>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                <b>Pay Table</b>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                <b>Pay Grade</b>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                <b>Pay Step</b>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                <b>Salary</b>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                <TableSortLabel
                                    active={orderBy === "JDTITL"}
                                    direction={orderBy === "JDTITL" ? order : "asc"}
                                    onClick={() => handleRequestSort("JDTITL")}
                                    sx={{
                                        color: 'white',
                                        '& .MuiTableSortLabel-icon': { color: 'white !important' },
                                        '&:hover': { color: 'yellow' },
                                        '&.MuiTableSortLabel-active': { color: 'yellow' }
                                    }}
                                >
                                    <b>Job Title</b>
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedSalaries
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((sdd, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        backgroundColor: index % 2 === 0 ? '#F7F7F7' : 'white',
                                        '&:hover': { backgroundColor: '#F0E8E2' },
                                    }}
                                >
                                    <TableCell>{sdd.SCHYEAR}</TableCell>
                                    <TableCell>{sdd.EMLOC}</TableCell>
                                    <TableCell>{sdd.ASJD}</TableCell>
                                    <TableCell>{sdd.ASSTAB}</TableCell>
                                    <TableCell>{sdd.ASGRAD}</TableCell>
                                    <TableCell>{sdd.ASSTEP}</TableCell>
                                    <TableCell>{dollarUS.format(sdd.SALARY)}</TableCell>
                                    <TableCell>{sdd.JDTITL}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredSalaries.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            <br />
            <div>Your email is {email}</div>
        </div>
    );
};

export default Salaries;
