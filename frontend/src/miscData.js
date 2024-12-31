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
            props.setLoggedIn(false);
            navigate("/");
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/miscdata/${employeeNumber}`);
                const resData = await response.json();
                setMiscData(resData);
            } catch (error) {
                console.log("error", error);
                navigate("/showEmployee");
            }
        };
        fetchData();
    }, []);

    const handlePrint = () => {
        setShowPrintView(true); // Show print view before printing
        setTimeout(() => {
            window.print();
            setShowPrintView(false); // Hide print view after printing
            // setExpanded(false);
        }, 500);       
    };

    if (md === null) {
        return <h1>Loading...</h1>;
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

    let miscDataFormatted = md.map((mdd, i) => {
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
        <div className={"mainContainer"}>
            <div className={"titleContainer"}>
                <div>Additional Tags</div>
            </div>
            <br />
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="8">Employee Number: {employeeNumber}</th>
                        </tr>
                        <tr>
                            <th colSpan="8">Employee Name: {empName}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tag</td>
                            <td>Data 1</td>
                            <td>Data 2</td>
                            <td>Data 3</td>
                            <td>Data 4</td>
                            <td>Data 5</td>
                            <td>Data 6</td>
                            <td>Data 7</td>
                        </tr>
                        {miscDataFormatted}
                    </tbody>
                </table>
            </div>
            <br />
            <div>Your email is {email}</div>
            <br />
            {/* Print Button */}
            <button
                onClick={handlePrint}
                style={{
                    padding: "10px 15px",
                    backgroundColor: "#865d36",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "black")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#865d36")}
            >
                Print Table
            </button>
        </div>
    );
};

export default MiscData;
