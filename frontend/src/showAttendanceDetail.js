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
  MenuItem,
  Typography,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShowAttendance = (props) => {
  const { loggedIn, email, employeeNumber, adl, setAttendanceDataDetail, empName } = props;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("TMLDAT");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterLocation, setFilterLocation] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterAbsenceCode, setFilterAbsenceCode] = useState(""); // New filter state

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
          `https://as400.jcboe.org:8080/api/employees/attendancedetail/${employeeNumber}`
        );
        const resData = await response.json();
        setAttendanceDataDetail(resData);
      } catch (error) {
        console.log("error", error);
        navigate("/showAttendance");
      }
    };
    fetchData();
  }, [loggedIn, navigate, employeeNumber, setAttendanceDataDetail]);

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

  if (adl === null) {
    return <h1>Loading...</h1>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${month}/${day}/${year}`;
  };

  const sortedAttendance = adl
    ?.filter((adll) => {
      return (
        (filterLocation === "" || adll.TMLLOC.includes(filterLocation)) &&
        (filterDate === "" || adll.TMLDAT.includes(filterDate)) &&
        (filterAbsenceCode === "" || adll.TMLABS.includes(filterAbsenceCode))
      );
    })
    .sort((a, b) => {
      if (orderBy === "TMLDAT") {
        return order === "asc" ? a.TMLDAT.localeCompare(b.TMLDAT) : b.TMLDAT.localeCompare(a.TMLDAT);
      }
      return order === "asc" ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
    });

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <h2>Attendance Details</h2>
      </div>
      <br />

      <Toolbar>
        <Typography sx={{ fontSize: "20px", marginRight: "20px" }}>
          <b>Filter Data : {"   "}</b>
        </Typography>

        <TextField
          label="Location"
          variant="outlined"
          size="small"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          style={{ marginRight: "10px", backgroundColor: "#F0E8E2" }}
        />
        <TextField
          label="Absence Date"
          variant="outlined"
          size="small"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          style={{ marginRight: "10px", backgroundColor: "#F0E8E2" }}
        />
        <TextField
          label="Absence Code" // New filter field
          variant="outlined"
          size="small"
          value={filterAbsenceCode}
          onChange={(e) => setFilterAbsenceCode(e.target.value)}
          style={{ backgroundColor: "#F0E8E2" }}
        />
      </Toolbar>

      <TableContainer component={Paper} style={{ marginTop: "20px", width: "50%" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#865d36", color: "white" }}>
            <TableRow>
              <TableCell colSpan={4} sx={{ color: "white", fontSize: "20px", textAlign: "center","&:hover": { color: "#FFD700" }  }}>
                <b>Employee: {empName}</b>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{ color: "white" }}
                sortDirection={orderBy === "TMLLOC" ? order : false}
              >
                <TableSortLabel
                 sx={{"&:hover": { color: "#FFD700" } }}
                  active={orderBy === "TMLLOC"}
                  direction={orderBy === "TMLLOC" ? order : "asc"}
                  onClick={() => handleRequestSort("TMLLOC")}
                >
                 <b>Location Code</b> 
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{ color: "white"}}
                sortDirection={orderBy === "TMLDAT" ? order : false}
              >
                <TableSortLabel
                 sx={{"&:hover": { color: "#FFD700" } }}
                  active={orderBy === "TMLDAT"}
                  direction={orderBy === "TMLDAT" ? order : "asc"}
                  onClick={() => handleRequestSort("TMLDAT")}
                >
                 <b>Absence Date</b> 
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "white",  '&:hover': { color: '#FFD700' } }}><b>Absence Code</b></TableCell>
              <TableCell sx={{ color: "white", "&:hover": { color: "#FFD700" } }}><b>Units</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedAttendance
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((adll, i) => (
                <TableRow key={i} hover>
                  <TableCell><b>{adll.TMLLOC}</b></TableCell>
                  <TableCell><b>{formatDate(adll.TMLDAT)}</b></TableCell>
                  <TableCell><b>{adll.TMLABS}</b></TableCell>
                  <TableCell><b>{adll.TMLQTY}</b></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedAttendance.length}
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
