import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, TablePagination, TableSortLabel, Paper, TextField, MenuItem, Toolbar,
    Typography
} from "@mui/material";
import "./employeeName.css";

const EmployeeName = (props) => {
    const { loggedIn, email, setEmployeeNumber, employeeName, es, setEmployeeNames } = props; // ✅ Ensure `es` is an array

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("EMSSAN");

    const [filterLastName, setFilterLastName] = useState("");
    const [filterFirstName, setFilterFirstName] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
            navigate("/");
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/?name=${employeeName}`);
                const resData = await response.json();
                // setEmployeeNames(Array.isArray(resData) ? resData : []); // ✅ Ensure resData is an array
                setEmployeeNames(resData)
            } catch (error) {
                console.error("Error fetching employees:", error);
                navigate("/employeeSearch");
            }
        };

        fetchData();
    }, [loggedIn, employeeName, setEmployeeNames, navigate]);

    const employeeSelected = (key) => {
        setEmployeeNumber(key);
        navigate("/showEmployee");
    };

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

    // ✅ Ensure `filteredEmployees` is always an array
    const filteredEmployees = (Array.isArray(es) ? es : []).filter((emp) =>
        emp.EMLNAM?.toLowerCase().includes(filterLastName.toLowerCase()) &&
        emp.EMFNAM?.toLowerCase().includes(filterFirstName.toLowerCase()) &&
        (filterStatus === "All" || emp.EMSTAT === filterStatus)
    );

    const sortedEmployees = filteredEmployees.sort((a, b) => {
        if (order === "asc") {
            return a[orderBy] < b[orderBy] ? -1 : 1;
        } else {
            return a[orderBy] > b[orderBy] ? -1 : 1;
        }
    });

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <h2>Employee Name Search</h2>
            </div>
            <br />

            <Toolbar>
                <Typography sx={{ fontSize: '20px', marginRight: '20px' }}>
                    <b>Filter Data: {" "}</b>
                </Typography>
                <br />
                <br />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    size="small"
                    value={filterLastName}
                    onChange={(e) => setFilterLastName(e.target.value)}
                    style={{ marginRight: "10px", backgroundColor: '#F0E8E2' }}
                />
                <TextField
                    label="First Name"
                    variant="outlined"
                    size="small"
                    value={filterFirstName}
                    onChange={(e) => setFilterFirstName(e.target.value)}
                    style={{ marginRight: "10px", backgroundColor: '#F0E8E2' }}
                />
                <TextField
                    label="Status"
                    variant="outlined"
                    size="small"
                    select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ width: "150px", backgroundColor: '#F0E8E2' }}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Y">Y</MenuItem>
                    <MenuItem value="N">N</MenuItem>
                </TextField>
            </Toolbar>

            <TableContainer style={{ width: "60%" }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={5} sx={{ textAlign: 'center', fontSize: '23px' }}>
                                <b>Search Name: {employeeName}</b>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {["EMSSAN", "EMLNAM", "EMFNAM", "LCNAME", "EMSTAT"].map((col) => (
                                <TableCell key={col} sx={{ fontSize: '20px' }}>
                                    <TableSortLabel
                                        active={orderBy === col}
                                        direction={orderBy === col ? order : "asc"}
                                        onClick={() => handleRequestSort(col)}
                                    >
                                        {col === "EMSSAN" ? "Emp #" : col.replace("EM", "")}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedEmployees
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((ess, index) => (
                                <TableRow
                                    key={ess.EMSSAN}
                                    hover
                                    onClick={() => employeeSelected(ess.EMSSAN)}
                                    sx={{
                                        cursor: 'pointer',
                                        backgroundColor: index % 2 === 0 ? '#AC8968' : 'white',
                                        '&:hover': { backgroundColor: "#865D36" }
                                    }}
                                >
                                    <TableCell>
                                        <a href="#" onClick={(e) => {
                                            e.preventDefault();
                                            employeeSelected(ess.EMSSAN);
                                        }}>
                                            <b>{ess.EMSSAN}</b>
                                        </a>
                                    </TableCell>
                                    <TableCell><b>{ess.EMLNAM}</b></TableCell>
                                    <TableCell><b>{ess.EMFNAM}</b></TableCell>
                                    <TableCell><b>{ess.LCNAME}</b></TableCell>
                                    <TableCell><b>{ess.EMSTAT}</b></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredEmployees.length} // ✅ Ensure `count` is always a valid integer
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

export default EmployeeName;
