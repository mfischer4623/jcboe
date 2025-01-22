import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Main from "./main";
import EmployeeSearch from "./employeeSearch";
import ShowEmployee from "./showEmployee";
import ShowW2s from "./showW2s";
import ShowW2Details from "./showW2Details";
import ShowPayroll from "./showPayroll";
import ShowPayrollCheck from "./showPayrollCheck";
import ShowAttendance from "./showAttendance";
import ShowAttendanceDetail from "./showAttendanceDetail";
import Salaries from "./salaries";
import ShowVolDeductions from "./showVolDeductions";
import Certificates from "./certificates";
import MiscData from "./miscData";
// import Tags from "./tags";
// import PayrollTables from "./payrollTables";
import AbsenceLeaveCodes from "./absenceLeaveCodes";
import DeductionsContributionsCodes from "./deductionsContributionsCodes";
import PayTableCodes from "./payTableCodes";
import JobCodes from "./jobCodes";
import AddendaCodes from "./addendaCodes";
import TerminationCodes from "./terminationCodes";
import Sidebar from "./navcomponents/Sidebar";
import MaintainUser from "./maintainUser";
import EmployeeName from "./employeeName";  // Import the appropriate component
import PurchaseOrderSearch from "./purchaseOrderSearch";
import VendorSearch from "./vendorSearch";
import VendorName from "./vendorName";
import ShowVendor from "./showVendor";
import ShowPO from "./showPO";
import ShowPurchaseOrder from "./showPurchaseOrder";
import CheckSearch from "./checkSearch"

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [empName, setEmpName] = useState("");
  const [es, setEmployeeNames] = useState([]);
  const [employeeName, setEmployeeName] = useState("")
  const [w2ID, setW2ID] = useState({}); // ✅ W2 ID State
  const [showPrintView, setShowPrintView] = useState(false);
  const [pd, setPayrollData] = useState([]);
  const [pcd, setPayrollCheckData] = useState([]);
  const [pcddd, setPayrollDeductionData] = useState([]);
  const [cid, setCheckID] = useState({});
  const [alc, setAbsenceLeaveCodes] = useState([]);
  const [employeeData, setEmployeeData] = useState(null);
  const [ssn, setSsn] = useState("");
  const [attendanceDataDetail, setAttendanceDataDetail] = useState([]);
  const [miscData, setMiscData] = useState([]);
  const [certificatesData, setCertificates] = useState([]);
  const [salariesData, setSalaries] = useState([]);
  const [volDeductionsData, setVolDeductions] = useState([]);
  const [w2sData, setW2s] = useState([]);
  const [w2d, setW2Details] = useState([])
  const [PODOC, setPODOC] = useState("");
  const [PONUM, setPONUM] = useState("");
  const [vendorNumber, setVendorNumber] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorNames, setVendorNames] = useState([]);
  const [vendorData, setVendorData] = useState(null);
  const [poFromVendor, setPoFromVendor] = useState([]);
  const [pod, setShowPurchaseOrder] = useState([]);

  const [aphbnk, setAphbnk]=useState("")
  const [aphbac, setAphbac]=useState("")
  const [aphfrm, setAphfrm]=useState("")
  const [aphchk, setAphchk]=useState("")
  const [aphven, setAphven]=useState("")

  const [dcc, setDeductionsContributionsCodes] = useState([]);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      setLoggedIn(false);
      return;
    }

    fetch("https://as400.jcboe.org:3080/verify", {
      method: "POST",
      headers: { "jwt-token": user.token },
    })
      .then((r) => r.json())
      .then((r) => {
        setLoggedIn("success" === r.message);
        setEmail(user.email || "");
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <Routes>

          <Route path="/maintainUser" element={<MaintainUser />} />

          {/* ✅ Authentication & Main Pages */}
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/main" element={<Main loggedIn={loggedIn} />} />

          {/* ✅ Employee Routes */}
          <Route path="/employeeSearch" element={
            <EmployeeSearch loggedIn={loggedIn} email={email} employeeNumber={employeeNumber}
              employeeName={employeeName}
              setEmployeeNumber={setEmployeeNumber} empName={empName} setEmployeeName={setEmployeeName}
              setEmployeeNames={setEmployeeNames} // ✅ Pass it as a prop
            />
          } />

          <Route path="/employeeName" element={
            <EmployeeName loggedIn={loggedIn} email={email} setEmployeeNumber={setEmployeeNumber} employeeName={employeeName} es={es}
              setEmployeeNames={setEmployeeNames} />
          } />

          <Route path="/showEmployee" element={
            <ShowEmployee loggedIn={loggedIn} email={email} employeeNumber={employeeNumber}
              setLoggedIn={setLoggedIn} setEmail={setEmail} empName={empName} setEmpName={setEmpName}
              setEmployeeData={setEmployeeData} ed={employeeData}
              setSsn={setSsn} // ✅ Ensure this is passed
            />
          } />

          {/* ✅ W2 Routes */}
          <Route path="/showW2s" element={
            <ShowW2s loggedIn={loggedIn} email={email} employeeNumber={employeeNumber}
              empName={empName}
              ssn={ssn}  // ✅ Ensure SSN is passed
              w2s={w2sData}
              setW2s={setW2s}  // ✅ Pass setW2s
              setW2ID={setW2ID}
              w2ID={w2ID}
              showPrintView={showPrintView}
              setShowPrintView={setShowPrintView}
            />
          } />

          <Route path="/showW2Details" element={
            <ShowW2Details loggedIn={loggedIn} email={email} w2ID={w2ID}
              empName={empName} employeeNumber={employeeNumber}
              w2d={w2d} setW2Details={setW2Details}
            />
          } />

          {/* ✅ Payroll Routes */}
          <Route path="/showPayroll" element={
            <ShowPayroll loggedIn={loggedIn} email={email} employeeNumber={employeeNumber}
              pd={pd} cid={cid} setPayrollData={setPayrollData} setCheckID={setCheckID} empName={empName}
            />
          } />

          <Route path="/showPayrollCheck" element={
            <ShowPayrollCheck loggedIn={loggedIn} email={email} employeeNumber={employeeNumber}
              pcd={pcd} setPayrollCheckData={setPayrollCheckData} cid={cid} empName={empName}
              pcddd={pcddd} setPayrollDeductionData={setPayrollDeductionData} setShowPrintView={setShowPrintView}
            />
          } />

          {/* ✅ Attendance Routes */}
          <Route path="/showAttendance" element={
            <ShowAttendance loggedIn={loggedIn} email={email} employeeNumber={employeeNumber}
            />
          } />

          <Route path="/showAttendanceDetail" element={
            <ShowAttendanceDetail loggedIn={loggedIn} email={email} employeeNumber={employeeNumber}
              adl={attendanceDataDetail}
              setAttendanceDataDetail={setAttendanceDataDetail}
              empName={empName}
            />
          } />

          {/* ✅ Salaries & Deductions */}
          <Route path="/salaries" element={
            <Salaries loggedIn={loggedIn} email={email} employeeNumber={employeeNumber}
              empName={empName} showPrintView={showPrintView} setShowPrintView={setShowPrintView}
              sd={salariesData}
              setSalaries={setSalaries} // ✅ Ensure this is passed
            />
          } />

          <Route path="/showVolDeductions" element={
            <ShowVolDeductions loggedIn={loggedIn} email={email} employeeNumber={employeeNumber}
              empName={empName} setShowPrintView={setShowPrintView}
              vd={volDeductionsData}
              setVolDeductions={setVolDeductions} // ✅ Ensure this is passed
            />
          } />

          {/* ✅ Certificates & Miscellaneous Data */}
          <Route path="/certificates" element={
            <Certificates loggedIn={loggedIn} email={email} employeeNumber={employeeNumber}
              empName={empName} setShowPrintView={setShowPrintView}
              cd={certificatesData}
              setCertificates={setCertificates} // ✅ Ensure this is passed
            />
          } />

          <Route path="/miscData" element={
            <MiscData loggedIn={loggedIn} email={email} employeeNumber={employeeNumber}
              empName={empName} setShowPrintView={setShowPrintView}
              md={miscData}
              setMiscData={setMiscData} // ✅ Ensure this is passed
              showPrintView={showPrintView}
            />
          } />

          <Route path="/purchaseOrderSearch" element={
            <PurchaseOrderSearch
              loggedIn={loggedIn}
              email={email}
              PODOC={PODOC}
              PONUM={PONUM}
              setPODOC={setPODOC}
              setPONUM={setPONUM}
              setLoggedIn={setLoggedIn}
            />
          } />

          <Route path="/vendorSearch" element={
            <VendorSearch
              loggedIn={loggedIn}
              email={email}
              vendorNumber={vendorNumber}
              vendorName={vendorName}
              setVendorNumber={setVendorNumber}
              setVendorName={setVendorName}
              setVendorNames={setVendorNames}
              setLoggedIn={setLoggedIn}
            />
          } />

          <Route path="/vendorName" element={
            <VendorName
              loggedIn={loggedIn}
              email={email}
              setVendorNumber={setVendorNumber}
              vendorName={vendorName}
              vens={vendorNames}
              setVendorNames={setVendorNames}
              showPrintView={showPrintView}
              setShowPrintView={setShowPrintView}
              setLoggedIn={setLoggedIn}
            />
          } />

          <Route path="/showVendor" element={
            <ShowVendor
              loggedIn={loggedIn}
              email={email}
              vendorNumber={vendorNumber}
              vend={vendorData}
              setVendorData={setVendorData}
              setShowPrintView={setShowPrintView}
              showPrintView={showPrintView}
              poFromVendor={poFromVendor}
              setPoFromVendor={setPoFromVendor}
              setLoggedIn={setLoggedIn}
            />
          } />

          <Route path="/showPO" element={
            <ShowPO
              loggedIn={loggedIn}
              poFromVendor={poFromVendor}
              setPoFromVendor={setPoFromVendor}
              vendorNumber={vendorNumber}
              showPrintView={showPrintView}
              setShowPrintView={setShowPrintView}
              setPODOC={setPODOC}
              setPONUM={setPONUM}
              setLoggedIn={setLoggedIn}
            />
          } />

          <Route path="/showPurchaseOrder" element={
            <ShowPurchaseOrder
              loggedIn={loggedIn}
              email={email}
              PODOC={PODOC}
              PONUM={PONUM}
              pod={pod}
              setShowPurchaseOrder={setShowPurchaseOrder}
              showPrintView={showPrintView}
              setShowPrintView={setShowPrintView}
              setLoggedIn={setLoggedIn}
            />
          } />

          <Route path="/checkSearch" element={
            <CheckSearch
              loggedIn={loggedIn}
              email={email}
              setAphbnk={setAphbnk}
              setAphbac={setAphbac}
              setAphfrm={setAphfrm}
              setAphchk={setAphchk}
              setAphven={setAphven}
              aphbnk={aphbnk}
              aphbac={aphbac}
              aphfrm={aphfrm}
              aphchk={aphchk}
              aphven={aphven}
              setLoggedIn={setLoggedIn}
            />
          } />

          {/* ✅ Codes */}
          <Route path="/absenceLeaveCodes" element={<AbsenceLeaveCodes loggedIn={loggedIn} alc={alc} setAbsenceLeaveCodes={setAbsenceLeaveCodes} />} />
          <Route path="/deductionsContributionsCodes" element={<DeductionsContributionsCodes loggedIn={loggedIn} email={email} dcc={dcc} setDeductionsContributionsCodes={setDeductionsContributionsCodes} />} />
          <Route path="/payTableCodes" element={<PayTableCodes loggedIn={loggedIn} />} />
          <Route path="/jobCodes" element={<JobCodes loggedIn={loggedIn} />} />
          <Route path="/addendaCodes" element={<AddendaCodes loggedIn={loggedIn} />} />
          <Route path="/terminationCodes" element={<TerminationCodes loggedIn={loggedIn} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
