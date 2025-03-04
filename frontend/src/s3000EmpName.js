import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, TablePagination, TableSortLabel, Paper, TextField, Toolbar,
    Typography
} from "@mui/material";
import "./employeeName.css";

const S3000EmpName = (props) => {
    const { setEmployeeNumber, employeeName, employeeNames } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("EMSSAN");
    const [filterLastName, setFilterLastName] = useState(employeeName || "");

    const navigate = useNavigate();

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

    const filteredEmployees = employeeNames.filter((emp) =>
        emp.EMLNAM?.toLowerCase().includes(filterLastName.toLowerCase())
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
                <h2>S3000 Employee Name Search</h2>
            </div>
            <br />

            <Toolbar>
                <Typography sx={{ fontSize: '20px', marginRight: '20px' }}>
                    <b>Filter Data: </b>
                </Typography>
                <TextField
                    label="Last Name"
                    variant="outlined"
                    size="small"
                    value={filterLastName}
                    onChange={(e) => setFilterLastName(e.target.value)}
                    style={{ marginRight: "10px", backgroundColor: '#F0E8E2' }}
                />
            </Toolbar>

            <TableContainer style={{ width: "60%" }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={4} sx={{ textAlign: 'center', fontSize: '23px' }}>
                                <b>Search Name: {employeeName}</b>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {["EMSSAN", "EMLNAM", "EMFNAM", "EMSTAT"].map((col) => (
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
                            .map((ess) => (
                                <TableRow
                                    key={ess.EMSSAN}
                                    hover
                                    onClick={() => employeeSelected(ess.EMSSAN)}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: "#865D36" }
                                    }}
                                >
                                    <TableCell><b>{ess.EMSSAN}</b></TableCell>
                                    <TableCell><b>{ess.EMLNAM}</b></TableCell>
                                    <TableCell><b>{ess.EMFNAM}</b></TableCell>
                                    <TableCell><b>{ess.EMSTAT}</b></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredEmployees.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
};

export default S3000EmpName;
