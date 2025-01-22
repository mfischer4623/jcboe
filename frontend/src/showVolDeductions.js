import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShowVolDeductions = (props) => {
    const { loggedIn, email, employeeNumber, empName, vd = [], setVolDeductions, setShowPrintView, showPrintView } = props;
    
    let holdYear = null;
    let first = true;
    let j = 99999;

    const navigate = useNavigate();

    const handlePrint = () => {
        setShowPrintView(true);
        setTimeout(() => {
            window.print();
            setShowPrintView(false);
        }, 500);       
    };

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
            navigate("/");
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/voldeductions/${employeeNumber}`);
                const resData = await response.json();
                setVolDeductions(Array.isArray(resData) ? resData : []);
            } catch (error) {
                console.log("error", error);
                navigate("/showEmployee");
            }
        };

        fetchData();
    }, []);
    // }, [loggedIn, employeeNumber, navigate, props, setVolDeductions]);

    if (!Array.isArray(vd) || vd.length === 0) {
        return <h1>Loading...</h1>;
    }

    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    let percentageUS = Intl.NumberFormat("en-US", {
        style: "percent",
        maximumFractionDigits: 2
    });

    function blankLineFunction(j) {
        return (
            <tr key={j}>
                <td>-----</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        );
    }

    let voldeductionsFormatted = vd.map((vdd, i) => {
        if (vdd.schyear !== holdYear) {
            holdYear = vdd.schyear;
            if (first === true) {
                first = false;
            } else {
                j++;
                return blankLineFunction(j);
            }
        }
        return (
            <tr key={i}>
                <td>{vdd.schyear}</td>
                <td>{vdd.DVDED}</td>
                <td>{vdd.DVJUR}</td>
                <td>{dollarUS.format(vdd.DVAMT)}</td>
                <td>{percentageUS.format(vdd.DVPCT)}</td>
            </tr>
        );
    });

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <h2>Voluntary Deductions</h2>
            </div>
            <br />
            <table>
                <thead>
                    <tr>
                        <th colSpan="5">Employee Number: {employeeNumber}</th>
                    </tr>
                    <tr>
                        <th colSpan="5">Employee Name: {empName}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>School Year Ending</th>
                        <th>Deduction</th>
                        <th>Jurisdiction</th>
                        <th>Deduction Amount</th>
                        <th>Percent of Gross</th>
                    </tr>
                    {voldeductionsFormatted}
                </tbody>
            </table>
            <br />
            <button onClick={handlePrint}>Print Table</button>
        </div>
    );
};

export default ShowVolDeductions;
