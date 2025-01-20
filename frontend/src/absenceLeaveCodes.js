import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination,
    TableRow, TableSortLabel, Toolbar, Typography, Paper
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

export default function AbsenceLeaveCodes(props) {
    const { loggedIn, setAbsenceLeaveCodes } = props;
    const navigate = useNavigate();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('key');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
            navigate("/");
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/ppay121s`);
                const resData = await response.json();
                console.log("API Response:", resData); // ✅ Debugging API response

                if (typeof setAbsenceLeaveCodes === "function") {
                    setAbsenceLeaveCodes(resData);
                }

                // ✅ Ensure row data is properly structured
                setRowData(Array.isArray(resData) ? resData.map((item, index) => ({
                    id: item.id || index, 
                    key: item.key || `Unknown-${index}`, 
                    description: item.description || "No Description"
                })) : []);

            } catch (error) {
                console.error("Error fetching data:", error);
                navigate("/payrollTables");
            }
        };

        fetchData();
    }, [loggedIn, navigate, setAbsenceLeaveCodes]);

    console.log("Row Data to Render:", rowData); // ✅ Debugging table data

    if (!rowData.length) {
        return <h2>Loading or No Data Found...</h2>; // ✅ Prevents blank table
    }

    return (
        <Box sx={{ width: '70%', marginLeft: 50, marginTop: 10 }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Toolbar>
                    <Typography variant="h6">Absence Leave Codes</Typography>
                </Toolbar>
                <TableContainer>
                    <Table sx={{ minWidth: 150 }} size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><b>Code</b></TableCell>
                                <TableCell align="center"><b>Description</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow key={row.id || row.key} hover sx={{ cursor: 'pointer' }}>
                                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>{row.key}</TableCell>
                                        <TableCell align="center">{row.description}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rowData.length} // ✅ Fix count issue
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
                />
            </Paper>
        </Box>
    );
}
