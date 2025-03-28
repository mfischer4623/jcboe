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
import ShowCheck from "./showCheck";
import S3000EmpSrch from "./s3000EmpSrch";
import S3000EmpName from "./s3000EmpName";
import S3000ShowEmployee from "./s3000ShowEmployee"
import S3000ShowPayments from "./s3000ShowPayments"
import S3000DisplayPayment from "./s3000DisplayPayment";  // ✅ Import the new component

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
  const [attendanceData, setAttendanceData] = useState([]);
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

  const [aphbnk, setAphbnk] = useState("")
  const [aphbac, setAphbac] = useState("")
  const [aphfrm, setAphfrm] = useState("")
  const [aphchk, setAphchk] = useState("")
  const [aphven, setAphven] = useState("")

  const [dcc, setDeductionsContributionsCodes] = useState([]);
  const [ptc, setPayTableCodes] = useState([]);
  const [jcc, setJobCodes] = useState([]);
  const [acc, setAddendaCodes] = useState([]);
  const [scd, setCheckData] = useState([])

  const [s3000EmployeeName, setS3000EmployeeName] = useState("");
  const [s3000EmployeeNames, setS3000EmployeeNames] = useState([]);
  const [s3000EmployeeNumber, setS3000EmployeeNumber] = useState("");


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      setLoggedIn(false);
      return;
    }

    fetch("https://as400.jcboe.org:5000/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json", "jwt-token": user.token },
    })
      .then((r) => r.json())
      .then((r) => {
        setLoggedIn(r.message === "success");
        setEmail(r.email || "");
      })
      .catch(() => setLoggedIn(false));

  }, []);

  return (
    <div className="App" style={{ backgroundColor: '#C6B2A3' }}>
      <BrowserRouter>
        <Sidebar />
        <Routes>

          <Route path="/maintainUser" element={<MaintainUser loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />

          {/* ✅ Authentication & Main Pages */}
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/main" element={<Main loggedIn={loggedIn} />} />

          <Route path="/s3000EmpSrch" element={
            <S3000EmpSrch
              setS3000EmployeeNames={setS3000EmployeeNames}
              setS3000EmployeeNumber={setS3000EmployeeNumber}
              setS3000EmployeeName={setS3000EmployeeName}
            />}
          />

          <Route path="/s3000EmpName" element={
            <S3000EmpName
              setS3000EmployeeNumber={setS3000EmployeeNumber}
              s3000EmployeeNames={s3000EmployeeNames}
              s3000EmployeeName={s3000EmployeeName}
            />}
          />

          {/* <Route path="/s3000showEmployee" element={<S3000ShowEmployee s3000EmployeeNumber={s3000EmployeeNumber} />} /> */}
          {/* <Route path="/s3000ShowEmployee/:s3000EmployeeNumber" element={<S3000ShowEmployee />} /> */}
          <Route path="/s3000ShowEmployee/:s3000EmployeeNumber" element={<S3000ShowEmployee />} />

          <Route path="/s3000ShowPayments/:s3000EmployeeNumber" element={<S3000ShowPayments />} />
          <Route path="/s3000DisplayPayment/:chknum/:chkdate" element={<S3000DisplayPayment />} />

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

          {/* ✅ S3000 Employee Routes */}
          <Route path="/s3000EmpSrch" element={<S3000EmpSrch />} />

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

          <Route path="/showAttendance" element={
            <ShowAttendance
              loggedIn={loggedIn}
              email={email}
              employeeNumber={employeeNumber}
              adl={attendanceDataDetail}  // ✅ Pass this correctly
              setAttendanceData={setAttendanceData}
              empName={empName}
              attendanceData={attendanceData}
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

          <Route path="/showCheck" element={
            <ShowCheck
              loggedIn={loggedIn}
              email={email}
              aphbnk={aphbnk}
              aphbac={aphbac}
              aphfrm={aphfrm}
              aphchk={aphchk}
              aphven={aphven}
              scd={scd}
              setCheckData={setCheckData}
            />
          } />

          {/* ✅ Codes */}
          <Route path="/absenceLeaveCodes" element={<AbsenceLeaveCodes loggedIn={loggedIn} alc={alc} setAbsenceLeaveCodes={setAbsenceLeaveCodes} />} />
          <Route path="/deductionsContributionsCodes" element={<DeductionsContributionsCodes loggedIn={loggedIn} email={email} dcc={dcc} setDeductionsContributionsCodes={setDeductionsContributionsCodes} />} />
          <Route path="/payTableCodes" element={<PayTableCodes loggedIn={loggedIn} email={email} ptc={ptc} setPayTableCodes={setPayTableCodes} />} />
          <Route path="/jobCodes" element={<JobCodes loggedIn={loggedIn} email={email} jcc={jcc} setJobCodes={setJobCodes} />} />
          <Route path="/addendaCodes" element={<AddendaCodes loggedIn={loggedIn} email={email} acc={acc} setAddendaCodes={setAddendaCodes} />} />
          <Route path="/terminationCodes" element={<TerminationCodes loggedIn={loggedIn} email={email} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
