import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowPO = (props) => {
  const {
    loggedIn,
    poFromVendor,
    setPoFromVendor,
    vendorNumber,
    showPrintView,
    setShowPrintView,
    setPODOC,
    setPONUM,
  } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [isBackHovered, setIsBackHovered] = useState(false);



  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleBackMouseEnter = () => setIsBackHovered(true);
  const handleBackMouseLeave = () => setIsBackHovered(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      localStorage.removeItem("user");
      props.setLoggedIn(false);
      navigate("/");
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://as400.jcboe.org:8080/api/employees/pofromvendor/?poVEND=${vendorNumber}`
        );
        const resData = await response.json();
        setPoFromVendor(resData);
      } catch (error) {
        console.log("error", error);
        navigate("/showVendor");
      }
    };

    fetchData();
  }, [loggedIn, vendorNumber, setPoFromVendor, navigate]);

  const onPOButtonClick = async (PONUM, PODOC) => {
    let resData = null;
    try {
      const response = await fetch(
        `https://as400.jcboe.org:8080/api/employees/purchaseOrders/?poDoc=${PODOC}&poNum=${PONUM}`
      );
      resData = await response.json();
      if (resData[0].PO == PONUM) {
        navigate("/showPurchaseOrder");
      } else {
        window.alert(`Wrong Purchase Order Number ${PODOC} ${PONUM}`);
      }
    } catch (error) {
      console.log(error);
      window.alert(`Wrong Purchase Order Number ${PODOC} ${PONUM}`);
    }
  };

  const displayKeys = ["PO", "PODOC", "POATTN", "POTOT", "POIUSR", "POAUSR"];

  const handlePrint = () => {
    setShowPrintView(true); // Show print view before printing
    setTimeout(() => {
      window.print();
      setShowPrintView(false); // Hide print view after printing
    }, 500);
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Purchase Orders</div>
        <div>Vendor Number: {vendorNumber}</div>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between", margin: "0 17%" }}>
        {/* Back Button */}
        <button
          onClick={() => navigate("/showVendor")}
          onMouseEnter={handleBackMouseEnter}
          onMouseLeave={handleBackMouseLeave}
          style={{
            padding: "10px 20px",
            backgroundColor: isBackHovered ? "black" : "#865d36",
            color: "white",
            marginRight:"35px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            padding: "10px 20px",
            backgroundColor: isHovered ? "black" : "#865d36",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Print Table
        </button>
      </div>
      <div style={{ padding: "20px" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "60%",
            marginLeft: "4%",
            textAlign: "left",
          }}
          border="1"
        >
          <thead>
            <tr>
              {displayKeys.map((key) => (
                <th
                  key={key}
                  style={{
                    padding: "10px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {poFromVendor.map((row, index) => (
              <tr key={index}>
                {displayKeys.map((key) => (
                  <td key={key} style={{ padding: "10px" }}>
                    {key === "PO" ? (
                      <a
                        onClick={() => {
                          setPODOC(row.PODOC);
                          setPONUM(row.PO);
                          onPOButtonClick(row.PO, row.PODOC);
                        }}
                        href={`#/${row[key]}`}
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                        }}
                      >
                        {row[key]}
                      </a>
                    ) : row[key] !== null ? (
                      row[key].toString()
                    ) : (
                      ""
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowPO;
