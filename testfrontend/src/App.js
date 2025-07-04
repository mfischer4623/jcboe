import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import './App.css';
import Login from "./components/login";
import { AppContext } from './context';
import EmployeeSearch from "./components/employee-search";
import EmployeeData from "./components/employee-data";
import { useSelector } from 'react-redux';
import RequireAuth from './middleware/RequireAuth';
import RequireAdminAuth from './middleware/RequireAdminAuth';
import Attendance from "./components/attendance";
import AttendanceDetails from "./components/attendance-details";
import AdditionalTags from "./components/additional-tags";
import Certificates from "./components/certificates";
import Salaries from "./components/salaries";
import Voluntarydeductions from "./components/voluntary-deductions";
import Payroll from "./components/payroll";
import W2S from "./components/w2s";
import Pdfall from "./components/pdfall";
import Pdfattnedetails from "./components/pdfattnedetails";
import Payrollcheck from "./components/payrollcheck";
import Payrollcheckprint from "./components/printpayroll";
import Posearch from "./components/posearch";
import Podetails from "./components/po-details";
import Vendorsearch from "./components/vendor-search";
import Vendorsearchlist from "./components/vendor-search-list";
import Vendordetails from "./components/vendordetails";
import Checksearch from "./components/checksearch";
import Checksearchlist from "./components/checksearchlist";
import Absence from "./components/absence";
import Deduct from "./components/deduct";
import Paytable from "./components/paytable";
import Job from "./components/job";
import Addenda from "./components/addenda";
import Termination from "./components/termination";
import Pdfvendoename from "./components/pdfvendoename";
import Pdfvendordetails from "./components/pdfvendordetails";
import ShowPO from "./components/showPO";

import Pdfpo from "./components/pdfpo";
import PdfBank from "./components/pdfbank";

import PdfprintshowPO from "./components/pdfprintshowPO";
import AdminLayout from "./ui-components/AdminLayout";
import Printvoluntary from "./components/printvoluntary";
import Printprintw2s from "./components/printprintw2s";
import ShowW2Details from "./components/showW2Details";
import Printw2sdetails from "./components/printw2sdetails";
import Printadditionaltags from "./components/printadditionaltags";
import Printattendancedetails from "./components/printattendancedetails";
import Printslary from "./components/printslary";
import Printpayrollall from "./components/printpayrollall";
import Printcertificates from "./components/printcertificates";
import Adminlogin from "./components/adminlogin";
import Sidebaradmin from "./components/sidebaradmin";
import SuperadminLayout from "./ui-components/SuperadminLayout";
import Usermanagement from "./components/usermanagement";

function App() {

  var baseName = '/';
  var data = [];
  data.tabName = 'Learnbyrole';
  // data.imageUrl = process.env.REACT_APP_IMAGE_URL;
  data.backEndUrl = process.env.REACT_APP_BACKEND_URL + 'api/';
  data.imageEndUrl = process.env.REACT_APP_IMAGE_URL;
  data.nodeEndUrl = process.env.REACT_APP_BACKEND_SEC_URL + '/';

  const [storage, setStorage] = React.useState([
    data
  ]);

  const dispatchStorageEvent = (payload) => {
    setStorage(payload);

    return true;
  };
  const userdata = useSelector(state => state.userdata);

  return (
    <>
      <div className="App">
        <AppContext.Provider value={{ storage, dispatchStorageEvent }}>

          <BrowserRouter basename={baseName}>
            <Routes>
              <Route path="/" element={<Login />} />


              <Route path="/adminlogin" element={<Adminlogin />} />
              <Route element={<RequireAuth userdata={userdata} />} >
                <Route path="/sidebaradmin" element={<Sidebaradmin />} />



                <Route path="/employee-search" element={<EmployeeSearch />} />
                <Route path="/employeedata" element={<EmployeeData />} />
                <Route path="/posearch" element={<Posearch />} />
                <Route path="/podetails" element={<Podetails />} />
                <Route path="/vendorsearch" element={<Vendorsearch />} />
                <Route path="/vendorsearchlist" element={<Vendorsearchlist />} />
                <Route path="/vendordetails" element={<Vendordetails />} />
                <Route path="/checksearch" element={<Checksearch />} />

                <Route path="/printshowPO" element={<PdfprintshowPO />} />
                <Route path="/Pdfpo" element={<Pdfpo />} />
                <Route path="/printpayroll" element={<Payrollcheckprint />} />
                <Route path="/printemployee" element={<Pdfall />} />
                <Route path="/printattende" element={<Pdfattnedetails />} />
                <Route path="/printvendornamre" element={<Pdfvendoename />} />
                <Route path="/Pdfvendordeta" element={<Pdfvendordetails />} />
                <Route path="/printshowBank" element={<PdfBank />} />
                <Route path="/printvoluntary" element={<Printvoluntary />} />
                <Route path="/printprintw2s" element={<Printprintw2s />} />
                <Route path="/printw2sdetails" element={<Printw2sdetails />} />
                <Route path="/printadditionaltags" element={<Printadditionaltags />} />
                <Route path="/printattendancedetails" element={<Printattendancedetails />} />
                <Route path="/printslary" element={<Printslary />} />
                <Route path="/printpayrollall" element={<Printpayrollall />} />
                <Route path="/printcertificates" element={<Printcertificates />} />


                <Route element={<AdminLayout />}>
                  <Route path="/checksearchlist" element={<Checksearchlist />} />

                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/attendancedetails" element={<AttendanceDetails />} />
                  <Route path="/additionaltags" element={<AdditionalTags />} />
                  <Route path="/certificates" element={<Certificates />} />
                  <Route path="/salaries" element={<Salaries />} />
                  <Route path="/voluntarydeductions" element={<Voluntarydeductions />} />
                  <Route path="/payroll" element={<Payroll />} />
                  <Route path="/w2s" element={<W2S />} />

                  <Route path="/showPayrollCheck" element={<Payrollcheck />} />
                  <Route path="/showW2Details" element={<ShowW2Details />} />



                  <Route path="/absence" element={<Absence />} />
                  <Route path="/deduct" element={<Deduct />} />
                  <Route path="/paytable" element={<Paytable />} />
                  <Route path="/job" element={<Job />} />
                  <Route path="/addenda" element={<Addenda />} />
                  <Route path="/termination" element={<Termination />} />


                  <Route path="/showPO" element={<ShowPO />} />



                </Route>

              </Route>

              <Route element={<RequireAdminAuth userdata={userdata} />} >
                <Route element={<SuperadminLayout />}>
                  <Route path="/usermanagement" element={<Usermanagement />} />
                </Route>

              </Route>

            </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      </div>
    </>
  );
}

export default App;
