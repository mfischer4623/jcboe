import React, { useState, useEffect } from 'react';
// import Header from './header';
// import Sidebar from './sidebar';
import PrintIcon from '@mui/icons-material/Print';
import SearchIcon from '@mui/icons-material/Search';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import filticon from '../assets/img/filter-icon-blue.png';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useSelector } from 'react-redux';
import { updateNullOfObjectValues } from '../helpers/helper';
import { payroll } from '../actions/admin.actions';
import secureLocalStorage from "react-secure-storage";
import { AppContext } from '../context';
import {
  useNavigate
} from "react-router-dom";

const Payroll = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [allattendata, setAllattendata] = useState([]);
  const [allattendataextac, setAllattendataexta] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);


  const [firstLoading, setFirstLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [searchPlaceholder, setSearchPlaceholder] = useState('Check #');
  const [searchBy, setSearchBy] = useState('check_no');
  const [searchValue, setSearchValue] = useState('');
  let navigate = useNavigate();
  useEffect(() => {
    var userid = secureLocalStorage.getItem('employeeData');



    if (Object.keys(userid).length === 0) {


      navigate(`/employeedata`);

    } else {
      setFirstLoading(true);
      console.log(userid);
      setEmployeeData(userid);
      payroll(userid.EMSSAN).then((res) => {
        console.log('get-attendence res====>>>', res.data);
        if (res.data.length > 0) {
          const totalPages = Math.ceil(res.data.length / perPage);
          setTotalPage(totalPages);
          const startIndex = (pageNo - 1) * perPage;
          const endIndex = startIndex + perPage;
          setAllattendataexta(res.data);
          setAllattendata(res.data.slice(startIndex, endIndex));
        }


        setFirstLoading(false);

      }).catch(err => {
        setFirstLoading(false);
      })
        ;
    }

  }, []);
  const changePage = (page) => {

    if (page < 1) page = 1;
    if (page > totalPage) page = totalPage;
    setFirstLoading(true);
    const startIndex = (page - 1) * perPage;
    const endIndex = parseInt(startIndex) + parseInt(perPage);

    setAllattendata(allattendataextac.slice(startIndex, endIndex));
    setFirstLoading(false);
    setPageNo(page);



  }
  const handleColumnClick = (type) => {
    let placeholder = '';
    switch (type) {
      case 'check_no':
        placeholder = 'Check # ';
        break;
      case 'check_date':
        placeholder = 'Check Date';
        break;
      case 'form':
        placeholder = 'Form';
        break;

      default:
        placeholder = 'Check #';
        break;
    }
    setSearchPlaceholder(placeholder);
    setSearchBy(type);

  }
  const handleKeypress = e => {

    //it triggers by pressing the enter key
    if (e.which === 13) {
      e.preventDefault();
      gosubmit();
    }

  };
  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);

  }
  const gosubmit = (e) => {

    setFirstLoading(true);
    if (searchBy == 'check_no') {
      const filteredData = allattendataextac.filter((item) =>
        item.PCCK.toLowerCase().includes(searchValue.toLowerCase())
      );
      const totalPages = Math.ceil(filteredData.length / perPage);
      setTotalPage(totalPages);
      const startIndex = (1 - 1) * perPage;

      setAllattendata(filteredData.slice(startIndex, startIndex + perPage));
      setPageNo(1);


    }
    if (searchBy == 'check_date') {
      const filteredData = allattendataextac.filter((item) =>
        item.HRCKDT.toLowerCase().includes(searchValue.toLowerCase())
      );
      const totalPages = Math.ceil(filteredData.length / perPage);
      setTotalPage(totalPages);
      const startIndex = (1 - 1) * perPage;

      setAllattendata(filteredData.slice(startIndex, startIndex + perPage));
      setPageNo(1);


    }
    if (searchBy == 'form') {
      const filteredData = allattendataextac.filter((item) =>
        item.PCAMT.toLowerCase().includes(searchValue.toLowerCase())
      );
      const totalPages = Math.ceil(filteredData.length / perPage);
      setTotalPage(totalPages);
      const startIndex = (1 - 1) * perPage;

      setAllattendata(filteredData.slice(startIndex, startIndex + perPage));
      setPageNo(1);


    }

    setFirstLoading(false);




  }
  const handleClearFilter = () => {
    setSearchPlaceholder('Check #');
    setSearchBy('check_no');
    setSearchValue('');
    setFirstLoading(true);
    const totalPages = Math.ceil(allattendataextac.length / perPage);
    setTotalPage(totalPages);
    const startIndex = (1 - 1) * perPage;
    const endIndex = startIndex + perPage;

    setAllattendata(allattendataextac.slice(startIndex, endIndex));
    setPageNo(1);
    setFirstLoading(false);

  }

  const formatDate = (dateStringji) => {
     console.log('dateStringji', dateStringji);
    let HRCKDT = dateStringji;
    let dateString = HRCKDT ? HRCKDT.toString() : "";

    let month, day, year;
    if (dateString.length === 3) {
      month = "0" + dateString.substring(0, 1);
      day = dateString.substring(1, 3);
      year = "2000";
    } else if (dateString.length === 4) {
      month = dateString.substring(0, 2);
      day = dateString.substring(2, 4);
      year = "2000";
    } else if (dateString.length === 5) {
      month = dateString.substring(1, 3);
      day = dateString.substring(3, 5);
      year = "200" + dateString.substring(0, 1);
    } else if (dateString.length === 6) {
      month = dateString.substring(2, 4);
      day = dateString.substring(4, 6);
      year = dateString.substring(0, 2);
      year = year > "30" ? "19" + year : "20" + year;
    } else {
      month = "12";
      day = "31";
      year = "9999";
    }
    HRCKDT = `${month}/${day}/${year}`;
     return HRCKDT
  }
  let dollarUS = Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  const checkSelected = (PCSSN, PCRUN, CHECK, CHKDT) => {
    // ✅ Fix: Use let instead of const
    let ckido = {
        SSN: PCSSN,
        RUN: PCRUN,
        CHECK: CHECK,
        CHKDT: CHKDT
    };
    localStorage.setItem("allpoch", JSON.stringify(ckido));
 
    navigate("/showPayrollCheck");
};
  return (
    <>
      {/* <Header />
      <Sidebar /> */}

      <div className='main-inner-sec content-main'>
        <div className='main-inner-heading'>
          <div className='col-md-12'>
            <div className='emp-main-serach'>
              <div className='emp-serach emp-data-head emp-another-sec'>
                {employeeData != null &&
                  <>
                    <h2>{employeeData.EMLNAM}, {employeeData.EMFNAM} {employeeData.EMMNAM} </h2>
                    <h3>Emp Id:- <span> {employeeData.EMSSAN}</span></h3>
                  </>
                }
                {/* <div className='print-sec-inner'>
                  <span className='print-icon'><PrintIcon /></span>
                </div> */}
              </div>
            </div>


          </div>
        </div>

        <div class=" emp-main-heading-emp">
          <div class="main-heading-sec ">
            <div class="col-md-12">
              <div class="head-inner">
                <h2>Payroll</h2>
                <div class="head-right">
                  {/* <span className='print-icon'><PrintIcon /></span> */}
                  <button class="btn btn-submit btn-clear" onClick={(e) => handleClearFilter()}>Clear Filter</button>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* table section start */}
        <div className="emp-table-sec">
          <div className='form-table-sec emp-table-inner'>
            <div className='row'>

              <div className='col-md-12 emp-serch-main' >
                <div className='search-sec'>
                  <input type='text' className='input-srch' placeholder={searchPlaceholder} onChange={handleSearchInput} value={searchValue} onKeyPress={handleKeypress} />
                  <button className='go-sec' onClick={(e) => gosubmit()}>Go</button>
                </div>
              </div>

            </div>
            <div className='row'>
              {/* table section start from here */}
              <div class="table-main-sec">
                <table class="table table-sec">
                  <thead class="thead-before-sec thaed-colaps-sec">
                    <tr>
                      {/* <th className='check-width'>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox />} label="" />
                        </FormGroup>
                      </th> */}
                      <th className='job-width check-date-width' onClick={() => handleColumnClick('check_date')}>Check Date <span className='filt-icon'><img src={filticon} /></span></th>
                      <th className='abse-type-width check-width-hash' onClick={() => handleColumnClick('check_no')}>Check # <span className='filt-icon'><img src={filticon} /></span></th>
                      <th className='used-width form-width' onClick={() => handleColumnClick('form')}>Form <span className='filt-icon'><img src={filticon} /></span> </th>
                      <th className='used-width check-amt-width'>Check Amt </th>
                      <th className='used-width check-amt-width action-width-payroll'>Action </th>
                    </tr>
                  </thead>
                  <tbody class="tbody-light">
                    {
                      firstLoading ? <tr ><td colSpan={5}><div className="spinner-border" role="status" style={{ width: "1rem", height: "1rem", marginLeft: "6px" }}></div></td></tr> : <>
                        {allattendata.length > 0 ?

                          allattendata.map((entry, index) => (

                            <tr>
                              {/* <td class="check-width">
                                <FormGroup>
                                  <FormControlLabel control={<Checkbox />} label="" />
                                </FormGroup>
                              </td> */}
                              <td class="value-table">
                                <p>{formatDate(entry.HRCKDT)} </p>
                              </td>
                              <td class="value-table">
                                <p>  {entry.PCCK} </p>
                              </td>
                              <td class="value-table">
                                <p>{entry.HRFRM2} </p>
                              </td>
                              <td class="value-table">
                                <p>{dollarUS.format(entry.PCAMT)}</p>
                              </td>
                              <td class="value-table pay-visi-sec">
                               <VisibilityIcon 
                               
                                onClick={(e) => { e.preventDefault(); checkSelected(entry.PCSSN, entry.PCRUN, entry.PCCK, formatDate(entry.HRCKDT)); }}
                                />
                              </td>

                              

                            </tr>
                          ))
                          : <tr><td colSpan={5}>No Data Found</td></tr>}
                      </>
                    }






                  </tbody>
                </table>
              </div>
              {/* table section end from here */}

              {/* pagination section start here */}
              {totalPage > 1 ? <>
                <div className='pagination-sec'>
                  <div className='page-left'>
                    <p><span><NavigateBeforeIcon onClick={(e) => changePage(pageNo - 1)} /></span><p><span className='page-name'>Page</span> <input type="text" value={pageNo} onChange={(e) => {
                      !isNaN(parseInt(e.target.value)) && parseInt(e.target.value) > 0 ? changePage(parseInt(e.target.value)) : changePage(1)
                    }} /> of {totalPage}</p><span><NavigateNextIcon onClick={(e) => changePage(pageNo + 1)} /></span></p>
                  </div>
                </div>
              </> : ''
              }

              {/* pagination section end here */}

            </div>
          </div>
        </div>
        {/* table section end */}





      </div>

    </>
  )
}

export default Payroll;
