import React,{useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

function 
createData(id,key, description) {
  return {
    id,
    key,
    description
  };
}

const rows = [
  createData(1, 'ACC', 'SCHOOL ACCIDENT'),
  createData(2, 'ACC/NP', 'SCHOOL ACCIDENT-NOT PAID'),
  createData(3, 'ACCDNT', 'SCHOOL ACCIDENT'),
  createData(4, 'ADMLVE', 'ADMINISTRATIVE LEAVE'),
  createData(5, 'BUS', 'PERSONAL BUSINESS'),
  createData(6, 'COURT', 'COURT DAY'),
  createData(7, 'COURTP', 'SUBPOENA-PERSONAL MATTERS'),
  createData(8, 'CREDIT','CREDIT DAYS'),
  createData(9,'DEATH', 'DEATH IMMEDIATE FAMILY'),
  createData(10,'EXCUS2', 'EXCUSED ABS UNION BUSINESS'),
  createData(11,'EXCUSE', 'EXCUSED ABSENCE'),
  createData(12,'FIELD', 'FIELD TRIP'),
  createData(13,'FIFTHS', "TEACHER'S FIFTHS"),
  createData(14,'FLEX', "FLEX CODE FOR SUPERVIORS"),
  createData(15,'FLOAT', "FLOATING DAYS"),
  createData(16,'FUNER', "FUNERAL DAY"),
  createData(17,'ILL', "PERSONAL ILLNESS"),
  createData(18,'JURY', "JURY DUTY"),
  createData(19,'LEAVE', "LEAVE - NOT PAID"),
  createData(20,'LEGAL', "LEGAL ABSENCE"),
  createData(21,'LUNCH', "LUNCH DUTY"),
  createData(22,'LVE', "LONG TERM LEAVE"),
  createData(23,'MLTARY', "MILITARY SERVICE"),
  createData(24,'PB', "PERSONAL BUSINESS-2262"),
  createData(25,'PB/ASA', "PERSONAL BUSINESS-ASA"),
  createData(26,'PB/ESA', "PERSONAL BUSINESS-ESA"),
  createData(27,'PB/NON', "PERSONAL BUSINESS-NON AF"),
  createData(28,'PB/NP', "PERSONAL BUSINESS-NOT PAID"),
  createData(29,'PB/PSA', "PERSONAL BUSINESS-PSA"),
  createData(30,'PB/SUP', "SUPTS PERSONAL BUSINESS"),
  createData(31,'PB/TA', "PERSONAL BUSINESS-AIDES"),
  createData(32,'PB/TAS', "PERSONEL BUS-TEACH ASSIST"),
  createData(33,'PBJCEA', "PERSONAL BUSINESS-TEACHER"),
  createData(34,'PBJCEN', "JCEA PB HIRED < 12 MONTHS"),
  createData(35,'PD40', "40 DAYS AT 1/2 PAY LV PLCY"),
  createData(36,'PD80', "80 DAYS AT 1/2 PAY LV PLCY"),
  createData(37,'PERMIS', "PERMISSIVE LEAVE"),
  createData(38,'PI', "PERSONAL ILLNESS-2262"),
  createData(39,"PI/ASA", "PERSONAL ILLNESS-ASA"),
  createData(40,'PB/ESA', "PERSONEL ILLNESS-ESA"),
  createData(41,'PI/FIF', "SICK DAYS FIFTHS (NO CASH)"),
  createData(42,"PI/FS", "PERSONAL ILLNESS -FOOD SER"),
  createData(43,"PI/NON", "PERSONAL ILLNESS- NON AF"),
  createData(44,"PI/NP", "PERSONAL ILLNESS-NOT PAID"),
  createData(45,"PI/PSA", "PERSONAL ILLNESS-PSA"),
  createData(46,"PI/SUP", "SUPTS PERSONAL ILLNESS"),
  createData(47,"PI/T", "PERSONAL ILLNESS-JCEA"),
  createData(48,"PI/TA", "PERSONAL ILLNESS-AIDES"),
  createData(49,"PI/TAS", "PERSONAL ILLNESS-ASSISTANT"),
  createData(50,"PIPOOL", "PERSONAL ILLNESS-POOL SUB"),
  createData(51,"PROF", "PROFESSIONAL DAY"),
  createData(52,"PROF1", "PROF DAY EMPLOYEE PRESENTS"),
  createData(53,"SABB", "SABBATICAL LEAVE"),
  createData(54,"STBUS", "SUPT STATE BUSINESS"),
  createData(55,"STRIKE", "STRIKE"),
  createData(56,"SUS/NP", "SUSPENDED - WITHOUT PAY"),
  createData(57,"SUSPEN", "SUSPENDED - WITH PAY"),
  createData(58,"TARDY", "TARDY"),
  createData(59,"TESTVA", "TEST VACATION"),
  createData(60,"VAC", "VACATION"),
  createData(61,"VAC1", "2262 VAC HIRED AFT 4/19/97"),
  createData(62,"VAC2", "PSA DIRECTORS VACATION"),
  createData(63,"VAC3", "NON AFF VACATION"),
  createData(64,"VAC4", "ESA VACATION"),
  createData(65,"VAC5", "NCASA VAC HIRE BEFORE FY00"),
  createData(66,"VAC50", "VACATION OVER 50 BALANCE"),
  createData(67,"VAC6", "NCASA VAC HIRED AFTER FY00"),
  createData(68,"VACSUP", "SUPTS VACATION"),
  createData(69,"WORK", "WORKSHOP DAY"),
  createData(70,"WORKED", "WORKED STRIKE"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'Code',
    numeric: false,
    disablePadding: true,
    label: 'Code',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Description',
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
    

    // const { loggedIn, email, alc, setAbsenceLeaveCodes } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            sx={{ fontWeight: 'bold' }}
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Absence Leave Codes
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function AbsenceLeaveCodes(props) {
  const { loggedIn, email, alc, setAbsenceLeaveCodes } = props
  console.log(alc,"this is alc data")
  const navigate = useNavigate();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const[rowData,setRowData] = React.useState(alc)

  useEffect(() => {
    if (!loggedIn) {
        localStorage.removeItem("user")
        props.setLoggedIn(false)
        navigate("/")
    }
    const fetchData = async () => {
        try {
            const response = await fetch(`https://as400.jcboe.org:8080/api/employees/ppay121s`);
            const resData = await response.json()
            setAbsenceLeaveCodes(resData)
        }
        catch (error) {
            console.log("error", error);
            navigate("/payrollTables")
        }
    }
    fetchData()
}, [])



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );
if (alc === null) {
        return <h1>Loading...</h1>
    }

  return (
    <Box sx={{ width: '70%', marginLeft:50, marginTop:10 }}>
      <Paper sx={{ width: '70%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 150 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                  style={{width:"10px"}}
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' , width:'50%'}}
                  >
                    {/* <TableCell padding="checkbox">
                    
                    </TableCell> */}
                    <TableCell
                      component="th"
                      id={labelId}
                      align="center"
                      scope="row"
                      padding="none"
                      sx={{width:'10%', fontWeight:'bold'}}
                    >
                      {row.key}
                    </TableCell>
                    <TableCell align="center"  sx={{ fontWeight:'bold'}}>{row.description}</TableCell>
                    {/* <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell> */}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                    // width:10
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
