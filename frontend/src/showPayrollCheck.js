import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./showPayrollCheck.css";

let grossPay = 0;
let deductions = 0;
let netPay = 0;

const ShowPayrollCheck = (props) => {
    const {
        loggedIn,
        email,
        employeeNumber,
        pcd = [],
        setPayrollCheckData,
        cid,
        empName,
        pcddd = [],
        setPayrollDeductionData,
        setShowPrintView,
    } = props;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); // ✅ Store error messages
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
            navigate("/");
        }

        const fetchData = async () => {
            try {
                if (!cid || !cid.SSN || !cid.RUN) {
                    console.error("❌ Missing payroll check details", cid);
                    setError("Invalid payroll check details.");
                    setLoading(false);
                    return;
                }

                // console.log("📡 Fetching payroll data for SSN:", cid.SSN, " RUN:", cid.RUN);

                // // ✅ Fetch Payroll Check Data
                // const response1 = await fetch(`https://as400.jcboe.org:8080/api/employees/payrollCheck/?SSN=${cid.SSN}&RUN=${cid.RUN}`);
                // if (!response1.ok) throw new Error(`HTTP Error ${response1.status}`);
                // const resData1 = await response1.json();

                console.log("📡 Fetching payroll check: ", `SSN=${cid.SSN}, RUN=${cid.RUN}`);

                const response1 = await fetch(`https://as400.jcboe.org:8080/api/employees/payrollCheck/?SSN=${cid.SSN}&RUN=${cid.RUN}`);
                if (!response1.ok) throw new Error(`HTTP Error ${response1.status}`);

                const resData1 = await response1.json();
                console.log("✅ Payroll check response:", resData1);

                setPayrollCheckData(Array.isArray(resData1) ? resData1 : []);
            } catch (error) {
                console.error("❌ Error fetching payroll check data:", error);
                setPayrollCheckData([]);
                setError("Failed to fetch payroll check data. Please try again later.");
            }

            // ✅ Fetch Payroll Deductions Data
            try {
                const response2 = await fetch(`https://as400.jcboe.org:8080/api/employees/payrollCheckDeductions/?SSN=${cid.SSN}&RUN=${cid.RUN}`);
                if (!response2.ok) throw new Error(`HTTP Error ${response2.status}`);
                const resData2 = await response2.json();
                setPayrollDeductionData(Array.isArray(resData2) ? resData2 : []);
            } catch (error) {
                console.error("❌ Error fetching payroll deduction data:", error);
                setPayrollDeductionData([]);
                setError("Failed to fetch payroll deduction data. Please try again later.");
            }

            setLoading(false);
        };

        fetchData();
    }, [cid, loggedIn, navigate, setPayrollCheckData, setPayrollDeductionData]);

    if (loading) {
        return <h1>Loading payroll data...</h1>;
    }

    if (error) {
        return <h1 style={{ color: "red" }}>{error}</h1>; // ✅ Display error message
    }

    const dollarUS = Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

    const payrollCheckHeaderFormatted = () => {
        grossPay = 0;
        deductions = 0;

        pcd.forEach((item) => {
            grossPay += Number(item.PACUR);
        });

        pcddd.forEach((item) => {
            deductions += Number(item.DEAMT);
        });

        netPay = grossPay + deductions;
    };

    const payrollCheckFormatted = (Array.isArray(pcd) ? pcd : []).map((pcdd, i) => (
        <tr key={i}>
            <td>{pcdd.JDTITL}</td>
            <td>{pcdd.PAJOB}</td>
            <td>{pcdd.PAADN}</td>
            <td>{pcdd.PATYP}</td>
            <td>{dollarUS.format(pcdd.PACAL)}</td>
            <td>{dollarUS.format(pcdd.PACUR)}</td>
        </tr>
    ));

    const payrollDeductionFormatted = (Array.isArray(pcddd) ? pcddd : []).map((pcdddd, i) => (
        <tr key={i}>
            <td>{pcdddd.DEDESC}</td>
            <td>{pcdddd.DECODE}</td>
            <td>{pcdddd.DEJUR}</td>
            <td>{pcdddd.DETYP}</td>
            <td>{dollarUS.format(pcdddd.DECAL)}</td>
            <td>{dollarUS.format(pcdddd.DEAMT)}</td>
        </tr>
    ));

    const handlePrint = () => {
        setShowPrintView(true);
        setTimeout(() => {
            window.print();
            setShowPrintView(false);
        }, 500);
    };

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <div>Payroll Check</div>
            </div>
            <br />
            <div className="attTableContainer">
                <table>
                    <thead className="thatt">
                        <tr>
                            <th colSpan="6">Employee Number: {employeeNumber}</th>
                        </tr>
                        <tr>
                            <th colSpan="6">Employee Name: {empName}</th>
                        </tr>
                        {payrollCheckHeaderFormatted()}
                        <tr>
                            <th colSpan="6">
                                Check #: {cid?.CHECK || "N/A"} Check Date: {cid?.CHKDT || "N/A"}
                            </th>
                        </tr>
                        <tr>
                            <th colSpan="6">
                                Gross Pay: {dollarUS.format(grossPay)} | Deductions: {dollarUS.format(deductions)} | Net Pay: {dollarUS.format(netPay)}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Description</td>
                            <td>Ref 1</td>
                            <td>Ref 2</td>
                            <td>Type</td>
                            <td>Cal Amount</td>
                            <td>Check Amount</td>
                        </tr>
                        {payrollCheckFormatted}
                        {payrollDeductionFormatted}
                    </tbody>
                </table>
            </div>
            <br />
            <button className="print-button" onClick={handlePrint}>
                Print Payroll
            </button>
            <br />
            <div>Your email is {email}</div>
        </div>
    );
};

export default ShowPayrollCheck;
