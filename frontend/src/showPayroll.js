import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShowPayroll = (props) => {
    const { loggedIn, email, employeeNumber, pd = [], setPayrollData, setCheckID, empName } = props; // ✅ Fix: Default `pd` to an empty array

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
    }, [loggedIn, employeeNumber, navigate, setPayrollData]);

    if (!Array.isArray(pd) || pd.length === 0) {
        return <h1>No Payroll Data Available</h1>;
    }

    const checkSelected = (PCSSN, PCRUN, CHECK, CHKDT) => {
        setCheckID({ SSN: PCSSN, RUN: PCRUN, CHECK: CHECK, CHKDT: CHKDT });
        navigate("/showPayrollCheck");
    };

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <h2>Payroll</h2>
            </div>
            <table>
                <thead>
                    <tr><th>Check Date</th><th>Check #</th><th>Form</th><th>Amount</th></tr>
                </thead>
                <tbody>
                    {pd.map((pdd, i) => (
                        <tr key={i}>
                            <td>{pdd.HRCKDT}</td>
                            <td>
                                <a href="#" onClick={() => checkSelected(pdd.PCSSN, pdd.PCRUN, pdd.PCCK, pdd.HRCKDT)}>
                                    {pdd.PCCK}
                                </a>
                            </td>
                            <td>{pdd.HRFRM2}</td>
                            <td>${pdd.PCAMT}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>Your email is {email}</div>
        </div>
    );
};

export default ShowPayroll;
