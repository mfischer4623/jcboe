import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, TablePagination, Paper
} from "@mui/material";
import "./employeeName.css";

const S3000EmpName = (props) => {
    const { setS3000EmployeeNumber, s3000EmployeeNames } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // console.log("Received s3000EmployeeNames:", s3000EmployeeNames);

    const navigate = useNavigate();

    const employeeSelected = (key) => {
        setS3000EmployeeNumber(key);
        console.log("Fetched employee number:", key);
        navigate("/s3000showEmployee");
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <h2>S3000 Employee Name Search</h2>
            </div>
            <br />

            <TableContainer style={{ width: "80%" }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={4} sx={{ textAlign: 'center', fontSize: '23px' }}>
                                <b>Employee List</b>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {["Emp #", "Last Name", "First Name", "Status"].map((col) => (
                                <TableCell key={col} sx={{ fontSize: '20px' }}>
                                    {col}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {s3000EmployeeNames
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((employee) => (
                                <TableRow
                                    key={employee.emp_num}
                                    hover
                                    onClick={() => employeeSelected(employee.emp_num)}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: "#865D36" }
                                    }}
                                >
                                    <TableCell><b>{employee.emp_num}</b></TableCell>
                                    <TableCell><b>{employee.lastname}</b></TableCell>
                                    <TableCell><b>{employee.firstname}</b></TableCell>
                                    <TableCell><b>{employee.active}</b></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={s3000EmployeeNames.length}
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
