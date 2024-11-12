import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, TablePagination, Paper
} from "@mui/material";

const ShowW2s = (props) => {
    const { loggedIn, email, employeeNumber, ssn, w2s, setW2s, empName, setW2ID } = props;
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
            navigate("/");
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/pfrs860s/${ssn}`);
                const resData = await response.json();
                setW2s(resData);
            } catch (error) {
                console.log("error", error);
                navigate("/showEmployee");
            }
        };
        fetchData();
    }, []);

    if (w2s === null) {
        return <h1>Loading...</h1>;
    }

    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const w2Selected = (W2CLYR, W2ESTB) => {
        const w2ido = { SSN: ssn, YEAR: W2CLYR, ESTB: W2ESTB };
        setW2ID(w2ido);
        navigate("/showW2Details");
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
                <div>W2s</div>
            </div>
            <br />
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={7}>Employee Number: {employeeNumber}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={7}>Employee Name: {empName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Tax</TableCell>
                                <TableCell>Federal</TableCell>
                                <TableCell>FICA</TableCell>
                                <TableCell>Medicare</TableCell>
                                <TableCell>Federal</TableCell>
                                <TableCell>FICA</TableCell>
                                <TableCell>Medicare</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Year</TableCell>
                                <TableCell>Wages</TableCell>
                                <TableCell>Wages</TableCell>
                                <TableCell>Wages</TableCell>
                                <TableCell>Withheld</TableCell>
                                <TableCell>Withheld</TableCell>
                                <TableCell>Withheld</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {w2s.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((w2sd, i) => {
                                let W2CLYR = w2sd.W2CLYR < 10 ? `200${w2sd.W2CLYR}` : `20${w2sd.W2CLYR}`;
                                return (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <a href="#" onClick={() => w2Selected(w2sd.W2CLYR, w2sd.W2ESTB)}>
                                                {W2CLYR}
                                            </a>
                                        </TableCell>
                                        <TableCell>{dollarUS.format(w2sd.W2WAGE)}</TableCell>
                                        <TableCell>{dollarUS.format(w2sd.W2FICW)}</TableCell>
                                        <TableCell>{dollarUS.format(w2sd.W2FICM)}</TableCell>
                                        <TableCell>{dollarUS.format(w2sd.W2FEDT)}</TableCell>
                                        <TableCell>{dollarUS.format(w2sd.W2FTWH)}</TableCell>
                                        <TableCell>{dollarUS.format(w2sd.W2FMWH)}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={w2s.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <br />
            <div>Your email is {email}</div>
        </div>
    );
};

export default ShowW2s;
