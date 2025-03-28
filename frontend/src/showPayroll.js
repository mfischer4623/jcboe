import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShowPayroll = (props) => {
    const { loggedIn, email, employeeNumber, pd, setPayrollData, setCheckID, empName } = props;
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
            navigate("/");
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/payroll/${employeeNumber}`);
                const resData = await response.json();
                setPayrollData(resData);
            } catch (error) {
                console.log("error", error);
                navigate("/showEmployee");
            }
        };
        fetchData();
    }, []);
    // }, [loggedIn, employeeNumber, setPayrollData, navigate, props]);

    if (!Array.isArray(pd)) {
        return <h1>Loading...</h1>;
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

        setCheckID(ckido);  // ✅ Properly set state
        navigate("/showPayrollCheck");
    };

    let payrollFormatted = pd.map((pdd, i) => {
        let HRCKDT = pdd.HRCKDT;
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

        return (
            <tr key={pdd.PCRUN}>
                <td>{HRCKDT}</td>
                <td>
                    <a href="#" onClick={(e) => { e.preventDefault(); checkSelected(pdd.PCSSN, pdd.PCRUN, pdd.PCCK, HRCKDT); }}>
                        {pdd.PCCK}
                    </a>
                </td>
                <td>{pdd.HRFRM2}</td>
                <td>{dollarUS.format(pdd.PCAMT)}</td>
            </tr>
        );
    });

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <h2>Payroll</h2>
                <h4>Employee Name: {empName}</h4>
                <h4>Employee Number: {employeeNumber}</h4>
            </div>
            <br />
            <div>
                <table>
                    {/* <thead>
                        <tr>
                            <th colSpan="4">Employee Number: {employeeNumber}</th>
                        </tr>
                        <tr>
                            <th colSpan="4">Employee Name: {empName}</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        <tr>
                            <td>Check Date</td>
                            <td>Check #</td>
                            <td>Form</td>
                            <td>Check Amt</td>
                        </tr>
                        {payrollFormatted}
                    </tbody>
                </table>
            </div>
            <br />
            <div>Your email is {email}</div>
        </div>
    );
};

export default ShowPayroll;
