import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./certificates.css";

const Certificates = (props) => {
    const { loggedIn, email, employeeNumber, empName, cd = [], setCertificates, showPrintView, setShowPrintView } = props;

    const navigate = useNavigate();
    const [isHovered, setIsHovered] = React.useState(false);

    const handlePrint = () => {
        setShowPrintView(true); // Show print view before printing
        setTimeout(() => {
            window.print();
            setShowPrintView(false); // Hide print view after printing
        }, 500);
    };

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            // props.setLoggedIn(false);
            navigate("/");
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/certificates/${employeeNumber}`);
                const resData = await response.json();
                setCertificates(Array.isArray(resData) ? resData : []); // ✅ Ensure resData is always an array
            } catch (error) {
                console.log("error", error);
                navigate("/showEmployee");
            }
        };
        fetchData();
    }, [loggedIn, employeeNumber, setCertificates, navigate]);

    if (!Array.isArray(cd) || cd.length === 0) {
        return <h1>Loading Certificates...</h1>;
    }

    return (
        <div className={"mainContainer"}>
            <div className={"titleContainer"}>Certificates</div>
            <br />
            <table>
                <thead>
                    <tr><th colSpan="6">Employee Number: {employeeNumber}</th></tr>
                    <tr><th colSpan="6">Employee Name: {empName}</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Certificate</th>
                        <th>Cert Description</th>
                        <th>Type</th>
                        <th>Type Description</th>
                        <th>Level</th>
                        <th>Level Description</th>
                    </tr>
                    {cd.map((cdd, i) => (
                        <tr key={i}>
                            <td>{cdd.CTID}</td>
                            <td>{cdd.CRTDES}</td>
                            <td>{cdd.CTTYPE}</td>
                            <td>{cdd.TYDESC}</td>
                            <td>{cdd.CTLEVL}</td>
                            <td>{cdd.LVDESC}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button className="print-button" onClick={handlePrint}>Print Table</button>
        </div>
    );
};

export default Certificates;
