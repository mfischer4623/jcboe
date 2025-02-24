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
    const { loggedIn, email, employeeNumber, adl = [], setAttendanceData, empName, setShowPrintView } = props;

    const navigate = useNavigate();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("HAJOB");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterJobCode, setFilterJobCode] = useState("");
    const [filterAbsenceCode, setFilterAbsenceCode] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [attendanceData, setLocalAttendanceData] = useState([]); // ✅ Local state

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            navigate("/");
            return;
        }

        // ✅ Validate employeeNumber before making the API request
        if (!employeeNumber || employeeNumber === "undefined") {
            console.error("Invalid employee number:", employeeNumber);
            navigate("/showEmployee");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://as400.jcboe.org:8080/api/employees/attendance/${employeeNumber}`
                );

                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status}`);
                }

                const resData = await response.json();
                console.log("Fetched Attendance Data:", resData); // ✅ Debugging
                setLocalAttendanceData(resData);
                if (typeof setAttendanceData === "function") {
                    setAttendanceData(resData);
                }
            } catch (error) {
                console.error("Error fetching attendance data:", error);
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
            setRowsPerPage(attendanceData.length);
            setExpanded(true);
        }
    };

    const handlePrint = () => {
        setShowPrintView(true);
        setTimeout(() => {
            window.print();
            setShowPrintView(false);
        }, 1000);
    };

    const filteredAndSortedAttendance = (Array.isArray(attendanceData) ? attendanceData : [])
        .filter((entry) => {
            return (
                (filterJobCode === "" || (entry.HAJOB && entry.HAJOB.toString().includes(filterJobCode))) &&
                (filterAbsenceCode === "" || (entry.HAABS && entry.HAABS.toString().includes(filterAbsenceCode)))
            );
        })
        .sort((a, b) => {
            const aValue = a[orderBy] || ""; // Ensure a valid string
            const bValue = b[orderBy] || ""; // Ensure a valid string

            if (orderBy === "HAJOB" || orderBy === "HAABS") {
                return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }

            return order === "asc" ? (a[orderBy] || 0) - (b[orderBy] || 0) : (b[orderBy] || 0) - (a[orderBy] || 0);
        });

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <h2>Attendance</h2>
                <h4>Employee Name: {empName}</h4>
                <h4>Employee Number: {employeeNumber}</h4>
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

            <TableContainer component={Paper} style={{ marginTop: "20px", width: "60%", marginLeft: "10%" }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#865d36", color: "white" }}>
                        <TableRow>
                            {["HAJOB", "HAABS", "HAFBBL", "HAFERN", "HAFUSE", "HABAL", "MEMBER"].map((col) => (
                                <TableCell key={col} sx={{ fontSize: "20px", textAlign: "center" }}>
                                    <TableSortLabel
                                        active={orderBy === col}
                                        direction={orderBy === col ? order : "asc"}
                                        onClick={() => handleRequestSort(col)}
                                    >
                                        {col}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredAndSortedAttendance.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell>{entry.HAJOB}</TableCell>
                                <TableCell>{entry.HAABS}</TableCell>
                                <TableCell>{entry.HAFBBL}</TableCell>
                                <TableCell>{entry.HAFERN}</TableCell>
                                <TableCell>{entry.HAFUSE}</TableCell>
                                <TableCell>{entry.HABAL}</TableCell>
                                <TableCell>{entry.MEMBER}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredAndSortedAttendance.length}
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
