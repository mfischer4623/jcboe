import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./showVendor.css";

const ShowVendor = (props) => {
    const { loggedIn, email, vendorNumber, vend, setVendorData, setShowPrintView, showPrintView, poFromVendor, setPoFromVendor } = props;

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
            navigate("/");
        }

        if (vendorNumber === "") {
            navigate("/vendorSearch");
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`https://as400.jcboe.org:8080/api/employees/ppur301s/${vendorNumber}`);
                const resData = await response.json();
                setVendorData(resData[0]);
            } catch (error) {
                console.log("error", error);
                navigate("/vendorSearch");
            }
        };
        fetchData();
    }, []);

    const onShowPOClick = async () => {
        let resData = null;
         try {
            const response = await fetch(`https://as400.jcboe.org:8080/api/employees/pofromvendor/?poVEND=${vendorNumber}`);
            resData = await response.json();
           // console.log(response,"this is the reposnse for vendor number to show po")
            setPoFromVendor(resData)
            if (resData.length > 0 ) {
                navigate("/showPO");
            } else {
                window.alert(`No PO's found with vendor number ` + vendorNumber);
            }
        } catch (error) {
            console.log("error", error);
            navigate("/showVendor");
        }
    };

    const handlePrint = () => {
        setShowPrintView(true); // Show print view before printing
        setTimeout(() => {
            window.print();
            setShowPrintView(false); // Hide print view after printing
        }, 500);
    };

    if (vend === null) {
        return <h1>Loading...</h1>;
    }

    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    let percentageUS = Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 4,
    });

    return (
        <div className={"mainContainer"}>
            <div className={"titleContainer"}>
                <div>Vendor Data</div>
            </div>
            <br />
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Vendor Number:</strong></td>
                            <td>{vend.VNNO}</td>
                            <td><strong>Related to vendor group:</strong></td>
                            <td>{vend.VNREL}</td>
                        </tr>
                        <tr>
                            <td><strong>Vendor Name:</strong></td>
                            <td>{vend.VNNAME}</td>
                            <td><strong>Remit To: (If different)</strong></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>{vend.VNNAM2}</td>
                            <td><strong>{vend.VNRMAT}</strong></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><strong>Address:</strong></td>
                            <td>{vend.VNADDR}</td>
                            <td><strong>{vend.VNRMA1}</strong></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td> </td>
                            <td>{vend.VNADD2}</td>
                            <td><strong>{vend.VNRMA2}</strong></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><strong>City, State Zip</strong></td>
                            <td>{vend.VNCITY}, {vend.VNST} {vend.VNZIP}</td>
                            <td><strong>{vend.VNRMCT}, {vend.VNRMST} {vend.VNRMZ1}</strong></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><strong>Province:</strong></td>
                            <td>{vend.VNPROV} <strong>P/C</strong> {vend.VNPC}</td>
                            <td>{vend.VNRMPR} <strong>P/C</strong> {vend.VNRMPC}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><strong>Phone:</strong></td>
                            <td>({vend.VNAREA}) {vend.VNPHON}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><strong>Vendor's Usual Terms:</strong></td>
                            <td></td>
                            <td><strong>Shipping terms:</strong></td>
                            <td>{vend.VNSHIP}</td>
                        </tr>
                        <tr>
                            <td><strong>Cash discount:</strong></td>
                            <td>{percentageUS.format(vend.VNCASH)}</td>
                            <td><strong>Payment terms:</strong></td>
                            <td>{vend.VNPMT}</td>
                        </tr>
                        <tr>
                            <td><strong>Trade discount:</strong></td>
                            <td>{percentageUS.format(vend.VNTRAD)}</td>
                            <td><strong>Recipient Number:</strong></td>
                            <td>{vend.VN10RF}</td>
                        </tr>
                        <tr>
                            <td><strong>Minimum order $:</strong></td>
                            <td>{dollarUS.format(vend.VNMIN)}</td>
                            <td><strong>Open orders:</strong></td>
                            <td>{dollarUS.format(vend.VNENC)}</td>
                        </tr>
                        <tr>
                            <td><strong>Hold new orders?</strong></td>
                            <td>N__BIZ  DIS  BID</td>
                            <td><strong>Unpaid invoices:</strong></td>
                            <td>{dollarUS.format(vend.VNACCR)}</td>
                        </tr>
                        <tr>
                            <td><strong>Hold payments?</strong></td>
                            <td>N___N___N___N</td>
                            <td><strong>Volume this year:</strong></td>
                            <td>{dollarUS.format(vend.VNCUR)}</td>
                        </tr>
                        <tr>
                            <td><strong>Maximum payable without P/O:</strong></td>
                            <td>{dollarUS.format(vend.VNNOPO)}</td>
                            <td><strong>Volume last year:</strong></td>
                            <td>{dollarUS.format(vend.VNPRI)}</td>
                        </tr>
                        <tr>
                            <td><strong>Payment priority:</strong></td>
                            <td>{vend.VNPRY} (9 = Highest)</td>
                            <td><strong>Box Number if 1099 Vendor</strong></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><strong>Liability account keyword:</strong></td>
                            <td>{vend.VNACCT}</td>
                            <td><strong>1099 Volume:</strong></td>
                            <td>{dollarUS.format(vend.VNCR10)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <div className="hide-on-print">Your email is {email}</div>
            <button className="print-button hide-on-print" style={{"marginBottom":'20px'}} onClick={handlePrint}>Print</button>
            <button className="search-po-button hide-on-print" onClick={onShowPOClick}>Search PO</button>
        </div>
    );
};


export default ShowVendor;
