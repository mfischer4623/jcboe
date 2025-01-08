import React, { useEffect, useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Toolbar,
    Typography,
    Button,
    Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShowAttendance = (props) => {
    const { loggedIn, email, employeeNumber, ad, setAttendanceData, empName, setShowPrintView, showPrintView } = props;

    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("HAJOB");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterJobCode, setFilterJobCode] = useState("");
    const [filterAbsenceCode, setFilterAbsenceCode] = useState("");
    const [expanded, setExpanded] = useState(false); // State for expand/collapse

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
            navigate("/");
        }

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://as400.jcboe.org:8080/api/employees/attendance/${employeeNumber}`
                );
                const resData = await response.json();
                setAttendanceData(resData);
            } catch (error) {
                console.log("error", error);
                navigate("/showEmployee");
            }
        };
        fetchData();
    }, [loggedIn, navigate, employeeNumber, setAttendanceData]);

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

    const handleToggleExpand = () => {
        if (expanded) {
            setRowsPerPage(5);
            setExpanded(false);
        } else {
            setRowsPerPage(ad.length); // Show all rows
            setExpanded(true);
        }
    };

    const handlePrint = () => {
        setShowPrintView(true); // Show print view before printing
        setTimeout(() => {
            window.print();
            setShowPrintView(false); // Hide print view after printing
        }, 1000);
        //  window.print();
    };

    const filteredAndSortedAttendance = ad
        ?.filter((entry) => {
            return (
                (filterJobCode === "" || entry.HAJOB.toString().includes(filterJobCode)) &&
                (filterAbsenceCode === "" || entry.HAABS.toString().includes(filterAbsenceCode))
            );
        })
        .sort((a, b) => {
            if (orderBy === "HAJOB") {
                return order === "asc" ? a.HAJOB.localeCompare(b.HAJOB) : b.HAJOB.localeCompare(a.HAJOB);
            }
            if (orderBy === "HAABS") {
                return order === "asc" ? a.HAABS.localeCompare(b.HAABS) : b.HAABS.localeCompare(a.HAABS);
            }
            return order === "asc" ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
        });

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <h2>Attendance</h2>
            </div>
            <Toolbar>
                <Typography sx={{ fontSize: "20px", marginRight: "20px" }}>
                    <b>Filter Data:</b>
                </Typography>
                <TextField
                    label="Job Code"
                    variant="outlined"
                    size="small"
                    value={filterJobCode}
                    onChange={(e) => setFilterJobCode(e.target.value)}
                    style={{ marginRight: "10px", backgroundColor: "#F0E8E2" }}
                />
                <TextField
                    label="Absence Code"
                    variant="outlined"
                    size="small"
                    value={filterAbsenceCode}
                    onChange={(e) => setFilterAbsenceCode(e.target.value)}
                    style={{ backgroundColor: "#F0E8E2", marginRight: "2%" }}
                />
                <Box sx={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
                    <Button
                        sx={{
                            backgroundColor: "#865d36", color: 'white',
                            '&:hover': { backgroundColor: 'black' }
                        }}
                        variant="contained"
                        color="primary"
                        onClick={handleToggleExpand}
                    >
                        {expanded ? "Collapse" : "Expand"}
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: "#865d36",
                            color: 'white',
                            '&:hover': { backgroundColor: 'black' }
                        }}
                        variant="contained"
                        color="secondary"
                        onClick={handlePrint}
                    >
                        Print
                    </Button>
                </Box>
            </Toolbar>

            <TableContainer component={Paper} style={{ marginTop: "20px", width: showPrintView ? "100%" : "60%", marginLeft: showPrintView ? "0%" : "10%" }}>
                {/* <TableContainer style={{ width:showPrintView? "100%" :'70%', marginLeft:showPrintView?"0%": "15%" }} component={Paper}> */}

                <Table>
                    <TableHead sx={{ backgroundColor: "#865d36", color: "white" }}>
                        <TableRow>
                            <TableCell
                                sx={{
                                    color: "white",
                                    fontSize: "20px",
                                    textAlign: "center",
                                    "&:hover": { color: "#FFD700" },
                                }}
                                sortDirection={orderBy === "HAJOB" ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === "HAJOB"}
                                    direction={orderBy === "HAJOB" ? order : "asc"}
                                    onClick={() => handleRequestSort("HAJOB")}
                                >
                                    Job Code
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: "white",
                                    fontSize: "20px",
                                    textAlign: "center",
                                    "&:hover": { color: "#FFD700" },
                                }}
                                sortDirection={orderBy === "HAABS" ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === "HAABS"}
                                    direction={orderBy === "HAABS" ? order : "asc"}
                                    onClick={() => handleRequestSort("HAABS")}
                                >
                                    Absence Code
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: "white", fontSize: "20px", textAlign: "center" }}>
                                Begin Balance
                            </TableCell>
                            <TableCell sx={{ color: "white", fontSize: "20px", textAlign: "center" }}>
                                Fiscal Earned
                            </TableCell>
                            <TableCell sx={{ color: "white", fontSize: "20px", textAlign: "center" }}>
                                Fiscal Used
                            </TableCell>
                            <TableCell sx={{ color: "white", fontSize: "20px", textAlign: "center" }}>
                                Balance Available
                            </TableCell>
                            <TableCell sx={{ color: "white", fontSize: "20px", textAlign: "center" }}>
                                School Year                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredAndSortedAttendance
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((entry, i) => {
                                console.log(entry, "this is the entry")
                                return (
                                    <TableRow key={i}>
                                        <TableCell>{entry.HAJOB}</TableCell>
                                        <TableCell>{entry.HAABS}</TableCell>
                                        <TableCell>{entry.HAFBBL}</TableCell>
                                        <TableCell>{entry.HAFERN}</TableCell>
                                        <TableCell>{entry.HAFUSE}</TableCell>
                                        <TableCell>{entry.HABAL}</TableCell>
                                        <TableCell>{entry.MEMBER}</TableCell> 
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredAndSortedAttendance?.length || 0}
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

export default ShowAttendance;
