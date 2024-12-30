import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./certificates.css";

const Certificates = (props) => {

    const { loggedIn, email, employeeNumber, empName, cd, setCertificates, showPrintView, setShowPrintView } = props

    const navigate = useNavigate();
    const [isHovered, setIsHovered] = React.useState(false);
    
    const handlePrint = () => {
        setShowPrintView(true); // Show print view before printing
        setTimeout(() => {
            window.print();
            setShowPrintView(false); // Hide print view after printing
        }, 500);
        //  window.print();
    };

    // const showEmployeeButtonClick = () => {
    //     navigate("/showEmployee")
    // }

    // const employeeSearchButtonClick = () => {
    //     navigate("/employeeSearch")
    // }

    // const logoutButtonClick = () => {
    //     localStorage.removeItem("user")
    //     props.setLoggedIn(false)
    //     navigate("/")
    // }

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user")
            props.setLoggedIn(false)
            navigate("/")
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/certificates/${employeeNumber}`);
                const resData = await response.json()
                setCertificates(resData)
            }
            catch (error) {
                console.log("error", error);
                navigate("/showEmployee")
            }
        }
        fetchData()
    }, [])

    if (cd === null) {
        return <h1>Loading...</h1>
    }

    let certificatesFormatted = cd.map((cdd, i) => {
        return (
            <tr key={i}>
                <td>{cdd.CTID}</td>
                <td>{cdd.CRTDES}</td>
                <td>{cdd.CTTYPE}</td>
                <td>{cdd.TYDESC}</td>
                <td>{cdd.CTLEVL}</td>
                <td>{cdd.LVDESC}</td>

            </tr>

        )
    })

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Certificates</div>
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
                        <td>Certificate</td>
                        <td>Cert Description</td>
                        <td>Type</td>
                        <td>Type Description</td>
                        <td>Level</td>
                        <td>Level Description</td>
                        
                    </tr>
                    {certificatesFormatted}
                </tbody>
            </table>
        </div>
        <br />
        <div>Your email is {email}</div>
        <br />
            <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="print-button"
                onClick={handlePrint}
                style={{
                    padding: "10px 15px",
                    backgroundColor: isHovered ? "black" : "#865d36", // Change to black on hover
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease", // Smooth transition effect
                }}
            >
                Print Table
            </button>
    </div >
}

export default Certificates