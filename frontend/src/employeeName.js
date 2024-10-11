import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, TablePagination, TableSortLabel, Paper, TextField, MenuItem, Toolbar
} from "@mui/material";

const EmployeeName = (props) => {
    const { loggedIn, email, setEmployeeNumber, employeeName, es, setEmployeeNames } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("EMSSAN");

    const [filterLastName, setFilterLastName] = useState("");
    const [filterFirstName, setFilterFirstName] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

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
                setEmployeeNames(resData);
            } catch (error) {
                console.log("error", error);
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

    // Filter and sort employees
    const filteredEmployees = es?.filter((emp) => 
        emp.EMLNAM.toLowerCase().includes(filterLastName.toLowerCase()) &&
        emp.EMFNAM.toLowerCase().includes(filterFirstName.toLowerCase()) &&
        (filterStatus ? emp.EMSTAT === filterStatus : true)
    );

    const sortedEmployees = filteredEmployees?.sort((a, b) => {
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
                <TextField
                    label="Last Name"
                    variant="outlined"
                    size="small"
                    value={filterLastName}
                    onChange={(e) => setFilterLastName(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <TextField
                    label="First Name"
                    variant="outlined"
                    size="small"
                    value={filterFirstName}
                    onChange={(e) => setFilterFirstName(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <TextField
                    label="Status"
                    variant="outlined"
                    size="small"
                    select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ width: "150px" }}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                </TextField>
            </Toolbar>

            <TableContainer style={{width:"60%"}}component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={5}>Search Name: {employeeName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell >
                                <TableSortLabel
                                    active={orderBy === "EMSSAN"}
                                    direction={orderBy === "EMSSAN" ? order : "asc"}
                                    onClick={() => handleRequestSort("EMSSAN")}
                                >
                                    Emp #
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "EMLNAM"}
                                    direction={orderBy === "EMLNAM" ? order : "asc"}
                                    onClick={() => handleRequestSort("EMLNAM")}
                                >
                                    Last Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell style={{ width: "20px" }}>
                                <TableSortLabel
                                    active={orderBy === "EMFNAM"}
                                    direction={orderBy === "EMFNAM" ? order : "asc"}
                                    onClick={() => handleRequestSort("EMFNAM")}
                                >
                                    First Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedEmployees
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((ess) => (
                                <TableRow key={ess.EMSSAN} hover onClick={() => employeeSelected(ess.EMSSAN)} style={{ cursor: 'pointer' }}>
                                   <TableCell style={{ width: "100px" }}>
                                        <a href="#" onClick={(e) => {
                                            e.preventDefault();
                                            employeeSelected(ess.EMSSAN);
                                        }}>
                                            {ess.EMSSAN}
                                        </a>
                                    </TableCell>
                                    <TableCell >{ess.EMLNAM}</TableCell>
                                    <TableCell>{ess.EMFNAM}</TableCell>
                                    <TableCell>{ess.LCNAME}</TableCell>
                                    <TableCell>{ess.EMSTAT}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredEmployees?.length}
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
