import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Main from './main';
import EmployeeSearch from './employeeSearch';
import EmployeeName from './employeeName';
import ShowEmployee from './showEmployee';
import ShowAttendance from './showAttendance';
import ShowAttendanceDetail from './showAttendanceDetail';
import MiscData from './miscData';
import Certificates from './certificates';
import Salaries from './salaries';
import ShowVolDeductions from './showVolDeductions';
import ShowPayroll from './showPayroll';
import ShowPayrollCheck from './showPayrollCheck';
import Tags from './tags';
import PayrollTables from './payrollTables';
import AbsenceLeaveCodes from './absenceLeaveCodes';
import DeductionsContributionsCodes from './deductionsContributionsCodes';
import PayTableCodes from './payTableCodes';
import JobCodes from './jobCodes';
import AddendaCodes from './addendaCodes';
import TerminationCodes from './terminationCodes';
import ShowW2s from './showW2s';
import ShowW2Details from './showW2Details';
import PurchaseOrderSearch from './purchaseOrderSearch';
import ShowPurchaseOrder from './showPurchaseOrder';
import VendorSearch from './vendorSearch';
import VendorName from './vendorName';
import ShowVendor from './showVendor';
import CheckSearch from './checkSearch';
import ShowCheck from './showCheck';
import ShowPO from './showPO';
import MaintainUser from "./maintainUser";

import Sidebar from './navcomponents/Sidebar';

import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeNames, setEmployeeNames] = useState([]);
  const [ed, setEmployeeData] = useState(null);
  const [ssn, setSsn] = useState(null);
  const [showPrintView, setShowPrintView] = useState(false);
  const [empName, setEmpName] = useState("");
  const [ad, setAttendanceData] = useState([]);
  const [adl, setAttendanceDataDetail] = useState([]);
  const [sd, setSalaries] = useState([]);
  const [vd, setVolDeductions] = useState([]);
  const [alc, setAbsenceLeaveCodes] = useState([]);
  const [cd, setCertificates] = useState([]);
  const [md, setMiscData] = useState([]);
  const [payrollData, setPayrollData] = useState([]);
  const [payrollCheck, setPayrollCheck] = useState([]);
  const [checkID, setCheckID] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      setLoggedIn(false);
      return;
    }

    fetch("https://as400.jcboe.org:3080/verify", {
      method: "POST",
      headers: { 'jwt-token': user.token }
    })
      .then(r => r.json())
      .then(r => {
        setLoggedIn('success' === r.message);
        setEmail(user.email || "");
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/main" element={<Main loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} />} />
          <Route path="/maintainUser" element={<MaintainUser />} />

          <Route path="/employeeSearch" element={
            <EmployeeSearch
              loggedIn={loggedIn}
              email={email}
              employeeNumber={employeeNumber}
              setEmployeeNumber={setEmployeeNumber}
              employeeName={employeeName}
              setEmployeeName={setEmployeeName}
              setEmployeeNames={setEmployeeNames}
              setLoggedIn={setLoggedIn}
              setEmail={setEmail}
            />
          } />

          <Route path="/employeeName" element={
            <EmployeeName
              loggedIn={loggedIn}
              email={email}
              setEmployeeNumber={setEmployeeNumber}
              employeeName={employeeName}
              es={employeeNames}
              setEmployeeNames={setEmployeeNames}
            />
          } />

          <Route path="/showEmployee" element={
            <ShowEmployee
              loggedIn={loggedIn}
              email={email}
              employeeNumber={employeeNumber}
              setEmployeeData={setEmployeeData}
              ed={ed}
              setEmpName={setEmpName}
              setSsn={setSsn}
              setShowPrintView={setShowPrintView}
              showPrintView={showPrintView}
            />
          } />

          <Route path="/showAttendance" element={
            <ShowAttendance
              loggedIn={loggedIn}
              email={email}
              employeeNumber={employeeNumber}
              ad={ad}
              setAttendanceData={setAttendanceData}
            />
          } />

          <Route path="/showAttendanceDetail" element={
            <ShowAttendanceDetail
              loggedIn={loggedIn}
              email={email}
              employeeNumber={employeeNumber}
              adl={adl}
              setAttendanceDataDetail={setAttendanceDataDetail}
            />
          } />

          <Route path="/showPayroll" element={
            <ShowPayroll
              loggedIn={loggedIn}
              email={email}
              employeeNumber={employeeNumber}
              pd={payrollData}
              setPayrollData={setPayrollData}
              setCheckID={setCheckID}
              empName={empName}
            />
          } />

          <Route path="/showPayrollCheck" element={
            <ShowPayrollCheck
              loggedIn={loggedIn}
              email={email}
              checkID={checkID}
              payrollCheck={payrollCheck}
              setPayrollCheck={setPayrollCheck}
            />
          } />

          <Route path="/miscData" element={
            <MiscData
              loggedIn={loggedIn}
              email={email}
              employeeNumber={employeeNumber}
              empName={empName}
              md={md}
              setMiscData={setMiscData}
            />
          } />

          <Route path="/certificates" element={
            <Certificates
              loggedIn={loggedIn}
              email={email}
              employeeNumber={employeeNumber}
              empName={empName}
              cd={cd}
              setCertificates={setCertificates}
            />
          } />

          <Route path="/salaries" element={
            <Salaries
              loggedIn={loggedIn}
              email={email}
              employeeNumber={employeeNumber}
              empName={empName}
              sd={sd}
              setSalaries={setSalaries}
            />
          } />

          <Route path="/showVolDeductions" element={
            <ShowVolDeductions
              loggedIn={loggedIn}
              email={email}
              employeeNumber={employeeNumber}
              empName={empName}
              vd={vd}
              setVolDeductions={setVolDeductions}
            />
          } />

          <Route path="/absenceLeaveCodes" element={
            <AbsenceLeaveCodes loggedIn={loggedIn} email={email} alc={alc} setAbsenceLeaveCodes={setAbsenceLeaveCodes} />
          } />

          <Route path="/deductionsContributionsCodes" element={<DeductionsContributionsCodes loggedIn={loggedIn} email={email} />} />
          <Route path="/payTableCodes" element={<PayTableCodes loggedIn={loggedIn} email={email} />} />
          <Route path="/jobCodes" element={<JobCodes loggedIn={loggedIn} email={email} />} />
          <Route path="/addendaCodes" element={<AddendaCodes loggedIn={loggedIn} email={email} />} />
          <Route path="/terminationCodes" element={<TerminationCodes loggedIn={loggedIn} email={email} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
