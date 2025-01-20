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
import DeductionsContritbutionsCodes from './deductionsContributionsCodes';
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
import MaintainUser from "./maintainUser"; // ✅ Ensure MaintainUser is correctly imported

import Sidebar from './navcomponents/Sidebar';

import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");  // ✅ Added employeeNumber state
  const [employeeName, setEmployeeName] = useState("");      // ✅ Added employeeName state
  const [employeeNames, setEmployeeNames] = useState([]);    // ✅ Added employeeNames array

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
          <Route path="/main" element={<Main loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/maintainUser" element={<MaintainUser />} />  {/* ✅ Fix: Ensure MaintainUser is accessible */}

          {/* ✅ Fix: Pass setEmployeeName and setEmployeeNumber */}
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
              employeeName={employeeName} 
              setEmployeeNames={setEmployeeNames} 
              employeeNames={employeeNames} 
            />
          } />

          <Route path="/showEmployee" element={<ShowEmployee loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/showAttendance" element={<ShowAttendance loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/showAttendanceDetail" element={<ShowAttendanceDetail loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/miscData" element={<MiscData loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/certificates" element={<Certificates loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/salaries" element={<Salaries loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/showVolDeductions" element={<ShowVolDeductions loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/tags" element={<Tags loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/showPayroll" element={<ShowPayroll loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/showPayrollCheck" element={<ShowPayrollCheck loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/payrollTables" element={<PayrollTables loggedIn={loggedIn} setLoggedIn={setLoggedIn} email={email} />} />
          <Route path="/absenceLeaveCodes" element={<AbsenceLeaveCodes loggedIn={loggedIn} setLoggedIn={setLoggedIn} email={email} />} />
          <Route path="/deductionsContributionsCodes" element={<DeductionsContritbutionsCodes loggedIn={loggedIn} setLoggedIn={setLoggedIn} email={email} />} />
          <Route path="/payTableCodes" element={<PayTableCodes loggedIn={loggedIn} setLoggedIn={setLoggedIn} email={email} />} />
          <Route path="/jobCodes" element={<JobCodes loggedIn={loggedIn} setLoggedIn={setLoggedIn} email={email} />} />
          <Route path="/addendaCodes" element={<AddendaCodes loggedIn={loggedIn} setLoggedIn={setLoggedIn} email={email} />} />
          <Route path="/terminationCodes" element={<TerminationCodes loggedIn={loggedIn} setLoggedIn={setLoggedIn} email={email} />} />
          <Route path="/showW2s" element={<ShowW2s loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/showW2Details" element={<ShowW2Details loggedIn={loggedIn} email={email} setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/purchaseOrderSearch" element={<PurchaseOrderSearch loggedIn={loggedIn} email={email} />} />
          <Route path="/showPurchaseOrder" element={<ShowPurchaseOrder loggedIn={loggedIn} email={email} />} />
          <Route path="/vendorSearch" element={<VendorSearch loggedIn={loggedIn} email={email} />} />
          <Route path="/vendorName" element={<VendorName loggedIn={loggedIn} email={email} />} />
          <Route path="/showVendor" element={<ShowVendor loggedIn={loggedIn} email={email} />} />
          <Route path="/checkSearch" element={<CheckSearch loggedIn={loggedIn} email={email} />} />
          <Route path="/showCheck" element={<ShowCheck loggedIn={loggedIn} email={email} />} />
          <Route path="/showPO" element={<ShowPO loggedIn={loggedIn} email={email} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
