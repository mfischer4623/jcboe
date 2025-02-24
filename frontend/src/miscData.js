import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MiscData = (props) => {
    const { loggedIn, email, employeeNumber, empName, md, setMiscData, showPrintView, setShowPrintView } = props;
    let holdTag = null;
    let first = true;
    let j = 99999;

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            // props.setLoggedIn(false);
            navigate("/");
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/miscdata/${employeeNumber}`);
                const resData = await response.json();
                setMiscData(Array.isArray(resData) ? resData : []); // ✅ Ensure data is an array
            } catch (error) {
                console.log("error", error);
                navigate("/showEmployee");
            }
        };
        fetchData();
    }, [loggedIn, employeeNumber, setMiscData, navigate]);

    const handlePrint = () => {
        setShowPrintView(true);
        setTimeout(() => {
            window.print();
            setShowPrintView(false);
        }, 500);
    };

    if (!md || md.length === 0) {  // ✅ Fix: Handle cases where md is undefined or empty
        return (
            <div className="mainContainer">
                <div className="titleContainer">
                    <h2>Additional Tags</h2>
                    <h4>Employee Name: {empName}</h4>
                    <h4>Employee Number: {employeeNumber}</h4>
                </div>
                <p>No miscellaneous data available for this employee.</p>
                <div>Your email is {email}</div>
            </div>
        );
    }

    function blankLineFunction(j) {
        return (
            <tr key={j}>
                <td>-----</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        );
    }

    let miscDataFormatted = (md || []).map((mdd, i) => {  // ✅ Fix: Ensure md is always an array
        if (mdd.PCTID !== holdTag) {
            holdTag = mdd.PCTID;
            if (first === true) {
                first = false;
            } else {
                j++;
                return blankLineFunction(j);
            }
        }
        return (
            <tr key={i}>
                <td>{mdd.PCTID}</td>
                <td>{mdd.PCCOL1}</td>
                <td>{mdd.PCCOL2}</td>
                <td>{mdd.PCCOL3}</td>
                <td>{mdd.PCCOL4}</td>
                <td>{mdd.PCCOL5}</td>
                <td>{mdd.PCCOL6}</td>
                <td>{mdd.PCCOL7}</td>
            </tr>
        );
    });

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <h2>Additional Tags</h2>
                <h4>Employee Name: {empName}</h4>
                <h4>Employee Number: {employeeNumber}</h4>
            </div>
            <table>
                <tbody>{miscDataFormatted}</tbody>
            </table>
            <button onClick={handlePrint}>Print Table</button>
        </div>
    );
};

export default MiscData;
