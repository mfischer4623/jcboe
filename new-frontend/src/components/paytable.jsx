import React, { useState, useEffect } from 'react';
// import Header from './header';
// import Sidebar from './sidebar';
import PrintIcon from '@mui/icons-material/Print';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import filticon from '../assets/img/filter-icon-blue.png';
import { useSelector } from 'react-redux';
import { updateNullOfObjectValues } from '../helpers/helper';
import { paytablecode } from '../actions/admin.actions';
import secureLocalStorage from "react-secure-storage";
import { AppContext } from '../context';
import {
  useNavigate
} from "react-router-dom";


import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Paytable = () => {
   const [employeeData, setEmployeeData] = useState(null);
    const [allattendata, setAllattendata] = useState([]);
    const [allattendataextac, setAllattendataexta] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [perPage, setPerPage] = useState(10);
  
  
    const [firstLoading, setFirstLoading] = useState(true);
    const [loader, setLoader] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [searchPlaceholder, setSearchPlaceholder] = useState('Code');
    const [searchBy, setSearchBy] = useState('PHKEY');
    const [searchValue, setSearchValue] = useState('');
    let navigate = useNavigate();
    useEffect(() => {
     
        setFirstLoading(true);
        
        paytablecode().then((res) => {
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
        case 'PHKEY':
          placeholder = 'Code ';
          break;
        case 'check_date':
          placeholder = 'Check Date';
          break;
        case 'form':
          placeholder = 'Form';
          break;
  
        default:
          placeholder = 'Code';
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
      if (searchBy == 'PHKEY') {
        const filteredData = allattendataextac.filter((item) =>
          item.PHKEY.toLowerCase().includes(searchValue.toLowerCase())
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
      setSearchPlaceholder('Code');
      setSearchBy('PHKEY');
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
  
   
  return (
    <>  

      {/* <Header />
      <Sidebar /> */}

      <div className='main-inner-sec content-main'>
        {/* <div className='main-inner-heading'>
          <div className='col-md-12'>
            <div className='emp-main-serach'>
              <div className='emp-serach emp-data-head emp-another-sec'>
              
                    <h2>Vendor Name Search</h2>
              </div>
            </div>


          </div>
        </div> */}

        <div class=" emp-main-heading-emp all-simple-table-margin">
          <div class="main-heading-sec ">
            <div class="col-md-12">
              <div class="head-inner">
                <h2>Pay Table</h2>
                <div class="head-right">
                <button class="btn btn-submit btn-clear"  onClick={(e) => handleClearFilter()}>Clear Filter</button>
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
                     
                      <th className='job-width vendor-widh code-widh' >Code<span className='filt-icon'><img src={filticon} /></span></th>
                      <th className='abse-type-width desc-widh'>Description</th>

                    </tr>
                  </thead>
                  <tbody class="tbody-light">
                  
                  {
                      firstLoading ? <tr ><td colSpan={2}><div className="spinner-border" role="status" style={{ width: "1rem", height: "1rem", marginLeft: "6px" }}></div></td></tr> : <>
                        {allattendata.length > 0 ?

                          allattendata.map((entry, index) => (

                            <tr>
                              {/* <td class="check-width">
                                <FormGroup>
                                  <FormControlLabel control={<Checkbox />} label="" />
                                </FormGroup>
                              </td> */}
                              <td class="value-table">
                                <p>{(entry.PHKEY)} </p>
                              </td>
                              <td class="value-table">
                                <p>{(entry.PHDESC)} </p>
                              </td>

                              

                            </tr>
                          ))
                          : <tr><td colSpan={2}>No Data Found</td></tr>}
                      </>
                    }

                       






                  </tbody>
                </table>
              </div>
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

            </div>
          </div>
        </div>
        {/* table section end */}





      </div>
    
    </>
  )
}

export default Paytable;
