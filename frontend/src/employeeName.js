import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, TablePagination, TableSortLabel, Paper, TextField, MenuItem, Toolbar,
    Typography
} from "@mui/material";
import "./employeeName.css";

const EmployeeName = (props) => {
    const { loggedIn, email, setEmployeeNumber, employeeName, es, setEmployeeNames } = props;

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
        // (filterStatus ? emp.EMSTAT === filterStatus : true)
        (filterStatus === "All" || emp.EMSTAT === filterStatus)
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
            <Typography sx={{fontSize:'20px', marginRight:'20px'}}>
                  <b>Filter Data : {"   "} </b> 
                    </Typography>
                    <br></br>
                    <br></br>
                <TextField
                    label="Last Name"
                    variant="outlined"
                    size="small"
                    value={filterLastName}
                    onChange={(e) => setFilterLastName(e.target.value)}
                    style={{ marginRight: "10px" , backgroundColor:'#F0E8E2'}}
                />
                <TextField
                    label="First Name"
                    variant="outlined"
                    size="small"
                    value={filterFirstName}
                    onChange={(e) => setFilterFirstName(e.target.value)}
                    style={{ marginRight: "10px",  backgroundColor:'#F0E8E2' }}
                />
                <TextField
                    label="Status"
                    variant="outlined"
                    size="small"
                    select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ width: "150px",  backgroundColor:'#F0E8E2' }}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Y">Y</MenuItem>
                    <MenuItem value="N">N</MenuItem>
                </TextField>
            </Toolbar>

            <TableContainer style={{ width: "60%" }} component={Paper}>
                <Table>
                    <TableHead sx={{

                        backgroundColor: '#865d36',
                        color: 'white',// Use light blue color for alternative rows,

                    }}>
                        <TableRow sx={{ color: 'red' }}>
                            <TableCell colSpan={5} sx={{ color: 'white', fontSize:'23px',textAlign:'center',  '&:hover': { color: '#FFD700' }, }}><b>Search Name: {employeeName}</b></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                sx={{
                                    color: 'white',
                                    '&:hover': {
                                        color: '#FFD700', // Change text color on hover
                                    },
                                }}
                            >
                                <TableSortLabel
                                    sx={{ '&:hover': { color: '#FFD700' }, fontSize: '20px' }}
                                    active={orderBy === "EMSSAN"}
                                    direction={orderBy === "EMSSAN" ? order : "asc"}
                                    onClick={() => handleRequestSort("EMSSAN")}
                                >
                                    <b>Emp #</b>
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: 'white',
                                    '&:hover': { color: '#FFD700' },
                                    fontSize: '20px'
                                }}
                            >
                                <TableSortLabel
                                    sx={{
                                        color: 'white',
                                        '&:hover': { color: '#FFD700' },
                                        fontSize: '20px'
                                    }}
                                    active={orderBy === "EMLNAM"}
                                    direction={orderBy === "EMLNAM" ? order : "asc"}
                                    onClick={() => handleRequestSort("EMLNAM")}
                                >
                                    Last Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: 'white',
                                    width: "20px",
                                    '&:hover': { color: '#FFD700' },
                                    fontSize: '20px'
                                }}
                            >
                                <TableSortLabel
                                    sx={{
                                        color: 'white',
                                        '&:hover': { color: '#FFD700' },
                                        fontSize: '20px'
                                    }}
                                    active={orderBy === "EMFNAM"}
                                    direction={orderBy === "EMFNAM" ? order : "asc"}
                                    onClick={() => handleRequestSort("EMFNAM")}
                                >
                                    First Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: 'white',
                                    '&:hover': { color: '#FFD700' },
                                    fontSize: '20px'
                                }}
                            >
                                Location
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: 'white',
                                    '&:hover': { color: '#FFD700' },
                                    fontSize: '20px'
                                }}
                            >
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedEmployees
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((ess, index) => (
                                <TableRow className="hoverable-row" key={ess.EMSSAN} hover onClick={() => employeeSelected(ess.EMSSAN)} sx={{
                                    cursor: 'pointer',
                                    backgroundColor: index % 2 === 0 ? '#AC8968' : 'white',
                                    transition: 'background-color 0.3s',
                                    '&:hover':{
                                        backgroundColor: "#865D36",//this is not working
                                        cursor: "pointer"
                                }}}
                                >
                                    <TableCell>
                                        <a href="#" onClick={(e) => {
                                            e.preventDefault();
                                            employeeSelected(ess.EMSSAN);
                                        }}>
                                            <b>{ess.EMSSAN}</b>
                                        </a>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '16px' }} ><b>{ess.EMLNAM}</b></TableCell>
                                    <TableCell sx={{ fontSize: '16px' }} ><b>{ess.EMFNAM}</b></TableCell>
                                    <TableCell sx={{ fontSize: '16px' }} ><b>{ess.LCNAME}</b></TableCell>
                                    <TableCell sx={{ fontSize: '16px' }} ><b>{ess.EMSTAT}</b></TableCell>
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
