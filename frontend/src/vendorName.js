import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, TablePagination, TableSortLabel, Paper, TextField, Toolbar,
    Typography
} from "@mui/material";

const VendorName = (props) => {
    const { loggedIn, email, setVendorNumber, vendorName, vens, setVendorNames } = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("VNNO");

    const [filterVendorNumber, setFilterVendorNumber] = useState("");
    const [filterVendorName, setFilterVendorName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
            navigate("/");
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/ppur301s/?name=${vendorName}`);
                const resData = await response.json();
                setVendorNames(resData);
            } catch (error) {
                console.log("error", error);
                navigate("/vendorSearch");
            }
        };
        fetchData();
    }, [loggedIn, vendorName, setVendorNames, navigate]);

    const vendorSelected = (key) => {
        setVendorNumber(key);
        navigate("/showVendor");
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

    // Filter and sort vendors
    const filteredVendors = vens?.filter((ven) =>
        ven.VNNO.toString().toLowerCase().includes(filterVendorNumber.toLowerCase()) &&
        ven.VNNAME.toLowerCase().includes(filterVendorName.toLowerCase())
    );
    

    const sortedVendors = filteredVendors?.sort((a, b) => {
        if (order === "asc") {
            return a[orderBy] < b[orderBy] ? -1 : 1;
        } else {
            return a[orderBy] > b[orderBy] ? -1 : 1;
        }
    });

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <h2>Vendor Name Search</h2>
            </div>
            <br />

            <Toolbar>
                <Typography sx={{ fontSize: '20px', marginRight: '20px' }}>
                    <b>Filter Data: </b>
                </Typography>
                <TextField
                    label="Vendor #"
                    variant="outlined"
                    size="small"
                    value={filterVendorNumber}
                    onChange={(e) => setFilterVendorNumber(e.target.value)}
                    style={{ marginRight: "10px", backgroundColor: '#F0E8E2' }}
                />
                <TextField
                    label="Vendor Name"
                    variant="outlined"
                    size="small"
                    value={filterVendorName}
                    onChange={(e) => setFilterVendorName(e.target.value)}
                    style={{ marginRight: "10px", backgroundColor: '#F0E8E2' }}
                />
            </Toolbar>

            <TableContainer style={{ width: "70%", marginLeft:'10%' }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={4} sx={{ textAlign: 'center', fontSize: '23px', backgroundColor: '#865d36', color: 'white' }}>
                                <b>Search Name: {vendorName}</b>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{  backgroundColor: '#865d36', color: 'white' }}>
                                <TableSortLabel
                                    active={orderBy === "VNNO"}
                                    direction={orderBy === "VNNO" ? order : "asc"}
                                    onClick={() => handleRequestSort("VNNO")}
                                    sx={{ fontSize: '20px', color: 'white', '&:hover': { color: '#FFD700' } }}
                                >
                                    <b>Vendor #</b>
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{  backgroundColor: '#865d36', color: 'white' }}>
                                <TableSortLabel
                                    active={orderBy === "VNNAME"}
                                    direction={orderBy === "VNNAME" ? order : "asc"}
                                    onClick={() => handleRequestSort("VNNAME")}
                                    sx={{ fontSize: '20px', color: 'white', '&:hover': { color: '#FFD700' } }}
                                >
                                    <b>Vendor Name</b>
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{  fontSize: '20px', backgroundColor: '#865d36', color: 'white' }}>
                                <b>Address</b>
                            </TableCell>
                            <TableCell sx={{  fontSize: '20px', backgroundColor: '#865d36', color: 'white' }}>
                                <b>City, State Zip</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedVendors
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((ven, index) => (
                                <TableRow
                                    key={ven.VNNO}
                                    hover
                                    onClick={() => vendorSelected(ven.VNNO)}
                                    sx={{
                                        cursor: 'pointer',
                                        backgroundColor: index % 2 === 0 ? '#AC8968' : 'white',
                                        transition: 'background-color 0.3s',
                                        '&:hover': { backgroundColor: '#865D36' }
                                    }}
                                >
                                    <TableCell sx={{ padding: '6px 16px' }}>
                                        <a href="#" onClick={(e) => {
                                            e.preventDefault();
                                            vendorSelected(ven.VNNO);
                                        }}>
                                            <b>{ven.VNNO}</b>
                                        </a>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '16px', padding: '6px 16px' }}><b>{ven.VNNAME}</b></TableCell>
                                    <TableCell sx={{ fontSize: '16px', padding: '6px 16px' }}><b>{ven.VNADDR}</b></TableCell>
                                    <TableCell sx={{ fontSize: '16px', padding: '6px 16px' }}>
                                        <b>{ven.VNCITY}, {ven.VNST} {ven.VNZIP}</b>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredVendors?.length}
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

export default VendorName;
