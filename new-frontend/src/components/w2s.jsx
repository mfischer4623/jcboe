import React, { useState, useEffect } from 'react';
import Header from './header';
import Sidebar from './sidebar';
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
import { w2s } from '../actions/admin.actions';
import secureLocalStorage from "react-secure-storage";
import { AppContext } from '../context';
import {
  useNavigate
} from "react-router-dom";

const W2s = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [allattendata, setAllattendata] = useState([]);
  const [allattendataextac, setAllattendataexta] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);


  const [firstLoading, setFirstLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [searchPlaceholder, setSearchPlaceholder] = useState('Job Code');
  const [searchBy, setSearchBy] = useState('job_code');
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
      w2s(userid.EMPSSN).then((res) => {
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
    const endIndex = startIndex + perPage;

    setAllattendata(allattendataextac.slice(startIndex, endIndex));
    setFirstLoading(false);
    setPageNo(page);



  }
  const handleColumnClick = (type) => {
    let placeholder = '';
    switch (type) {
      case 'job_code':
        placeholder = 'Job Code';
        break;
      case 'type':
        placeholder = 'Absence Type';
        break;
      case 'year':
        placeholder = 'Year';
        break;

      default:
        placeholder = 'Job Code';
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
    if (searchBy == 'job_code') {
      const filteredData = allattendataextac.filter((item) =>
        item.HAJOB.toLowerCase().includes(searchValue.toLowerCase())
      );
      const totalPages = Math.ceil(filteredData.length / perPage);
      setTotalPage(totalPages);
      const startIndex = (1 - 1) * perPage;

      setAllattendata(filteredData.slice(startIndex, startIndex + perPage));
      setPageNo(1);


    }
    if (searchBy == 'type') {
      const filteredData = allattendataextac.filter((item) =>
        item.HAABS.toLowerCase().includes(searchValue.toLowerCase())
      );
      const totalPages = Math.ceil(filteredData.length / perPage);
      setTotalPage(totalPages);
      const startIndex = (1 - 1) * perPage;

      setAllattendata(filteredData.slice(startIndex, startIndex + perPage));
      setPageNo(1);


    }
    if (searchBy == 'year') {
      const filteredData = allattendataextac.filter((item) =>
        item.MEMBER.toLowerCase().includes(searchValue.toLowerCase())
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
    setSearchPlaceholder('Job Code');
    setSearchBy('job_code');
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
  const W2CLYRdat = (W2CLYR) => {
    let W2CLYRb =W2CLYR < 10 ? `200${W2CLYR}` : `20${W2CLYR}`;;
    
    return W2CLYRb;
  };
  return (
    <>
      <Header />
      <Sidebar />

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
                <h2>W2s</h2>
                <div class="head-right">
                  <span className='print-icon'><PrintIcon /></span>
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
                  <input type='text' placeholder='' className='input-srch' />
                  <button className='go-sec'>Go</button>
                </div>
              </div>

            </div>
            <div className='row'>
              {/* table section start from here */}
              <div class="table-main-sec">
                <table class="table table-sec">
                  <thead class="thead-before-sec thaed-colaps-sec">
                    <tr>
                      <th className='check-width'>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox />} label="" />
                        </FormGroup>
                      </th>
                      <th className='job-width check-date-width'>Tax </th>
                      <th className='abse-type-width federal-width'>Federal</th>
                      <th className='used-width fica-width'>FICA </th>
                      <th className='used-width medicare-width'>Medicare </th>
                      <th className='abse-type-width federal-width'>Federal</th>
                      <th className='used-width fica-width'>FICA </th>
                      <th className='used-width medicare-width'>Medicare </th>
                    </tr>
                  </thead>
                  <tbody class="tbody-light">
                    <tr>
                      <td class="check-width">

                      </td>
                      <td class="value-table">
                        <p>Year</p>
                      </td>
                      <td class="value-table">
                        <p>Wages  </p>
                      </td>
                      <td class="value-table">
                        <p>Wages </p>
                      </td>
                      <td class="value-table">
                        <p>Wages</p>
                      </td>
                      <td class="value-table">
                        <p>Withheld</p>
                      </td>
                      <td class="value-table">
                        <p>Withheld</p>
                      </td>
                      <td class="value-table">
                        <p>Withheld</p>
                      </td>


                    </tr>
                    {
                      firstLoading ? <tr ><td colSpan={8}><div className="spinner-border" role="status" style={{ width: "1rem", height: "1rem", marginLeft: "6px" }}></div></td></tr> : <>
                        {allattendata.length > 0 ?

                          allattendata.map((entry, index) => (

                            <tr>
                              <td class="check-width">

                              </td>
                              <td class="value-table">
                                <p>
                                {W2CLYRdat(entry.W2CLYR)}
                                </p>
                              </td>

                              <td class="value-table">
                                <p>
                               $ {entry.W2WAGE}
                                </p>
                              </td>
                              <td class="value-table">
                                <p>
                                $ {entry.W2FICW}
                                </p>
                              </td>
                              <td class="value-table">
                                <p>
                                $ {entry.W2FICM}
                                </p>
                              </td>
                              <td class="value-table">
                                <p>
                                $ {entry.W2FEDT}
                                </p>
                              </td>
                              <td class="value-table">
                                <p>
                                $ {entry.W2FTWH}
                                </p>
                              </td>
                              <td class="value-table">
                                <p>
                                $ {entry.W2FMWH}
                                </p>
                              </td>
                             


                            </tr>



                          ))
                          : <tr><td colSpan={8}>No Data Found</td></tr>}
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

export default W2s;
