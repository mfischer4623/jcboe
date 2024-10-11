import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, Element, scroller } from "react-scroll";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Typography,
    Grid,
    Button,
    Tabs,
    Tab
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import "./showEmployee.css";


const SectionHeader = ({ employeeName, employeeNumber }) => (
    <div className="section-header">
        <Typography variant="h5"><b>Employee Name: {employeeName}</b></Typography>
        <Typography variant="h6"><b>Employee Number: {employeeNumber}</b></Typography>
    </div>
);


const ShowEmployee = (props) => {
    const {
        loggedIn,
        email,
        employeeNumber,
        ed,
        setEmployeeData,
        setEmpName,
        setSsn,
        setShowPrintView,
        showPrintView
    } = props;

    const navigate = useNavigate();
    const [formData, setFormData] = useState(ed);
    const [selectedTab, setSelectedTab] = useState("personalInfo");
    const [tabIndex, setTabIndex] = useState(0); // State for active 
    const [showScrollTop, setShowScrollTop] = useState(false);
    //const [isPrinting, setIsPrinting] = useState(false);
    // const [showPrintView, setShowPrintView] = useState(false);

    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
            navigate("/");
        }

        if (employeeNumber === "") {
            navigate("/employeeSearch");
        }

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://as400.jcboe.org:8080/api/employees/${employeeNumber}`
                );
                const resData = await response.json();
                setEmployeeData(resData);
                setFormData(resData); // Initialize local state with fetched data
            } catch (error) {
                console.log("error", error);
                navigate("/employeeSearch");
            }
        };
        fetchData();


        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };




        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);



    }, [loggedIn, employeeNumber, navigate, setEmployeeData]);





    if (!formData) {
        return <h1>Loading...</h1>;
    }

    const handleFieldChange = (fieldName, value) => {
        setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
    };



    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);

        // Scroll to the selected section
        const sections = [
            "personalInfo",
            "contactInfo",
            "employmentInfo",
            "schoolInfo",
            "serviceInfo",
            "retirementInfo",
            "terminationInfo"
        ];
        scroller.scrollTo(sections[newValue], {
            duration: 200,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };




    const handleSave = async () => {
        try {
            const response = await fetch(
                `https://as400.jcboe.org:8080/api/employees/${employeeNumber}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            if (response.ok) {
                const updatedData = await response.json();
                setEmployeeData(updatedData);
                alert("Employee data saved successfully!");
            } else {
                alert("Failed to save data.");
            }
        } catch (error) {
            console.error("Error saving data:", error);
            alert("An error occurred while saving.");
        }
    };

    const handlePrint = () => {
        //  window.print();

        setShowPrintView(true); // Show print view before printing
        setTimeout(() => {
            window.print();
            setShowPrintView(false); // Hide print view after printing
        }, 500);
    };

    const renderField = (label, value, fieldName) => (
        <TextField
            fullWidth
            label={label}
            value={value || ""}
            margin="normal"
            InputProps={{ readOnly: true }}
            onChange={(e) => handleFieldChange(fieldName, e.target.value)}
            sx={{ width: '70%' }} // Adjust width here
        />
    );

    const handleTabClick = (sectionName) => {
        setSelectedTab(sectionName);

        scroller.scrollTo(sectionName, {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart"
        });


    };

    return (
        <div className="mainContainer">


            <div className="print-header">
                <Typography variant="h4" gutterBottom>
                    <b> Employee Information </b>
                </Typography>

                <Typography variant="h5" gutterBottom>
                    <b> Employee Name: {formData.EMLNAM}, {formData.EMFNAM} {formData.EMMNAM} </b>
                </Typography>

                <Typography variant="h5" gutterBottom>
                    <b> Employee Number : {formData.EMSSAN} </b>
                </Typography>
            </div>

            {showScrollTop && (
                <Button
                    onClick={scrollToTop}
                    variant="contained"
                    color="primary"
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        right: '30px',
                        borderRadius: '50%',
                        minWidth: '50px',
                        height: '50px',
                    }}
                >
                    <ArrowUpwardIcon />
                </Button>
            )}

            {/* Tabs for navigation */}
            {/* <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
            >
                <Tab label="Personal Information" />
                <Tab label="Contact Information" />
                <Tab label="Employment Information" />
                <Tab label="School Information" />
                <Tab label="Service Details" />
                <Tab label="Pension Details" />
                <Tab label="Termination Information" />
            </Tabs> */}

            <div className="tab-buttons flex-container">
                <Button

                    onClick={() => handleTabClick("personalInfo")}
                    className={selectedTab === "personalInfo" ? "tab-button active" : "tab-button"}
                >
                    Personal Information
                </Button>
                <Button
                    onClick={() => handleTabClick("contactInfo")}
                    className={selectedTab === "contactInfo" ? "tab-button active" : "tab-button"}
                >
                    Contact Information
                </Button>
                <Button
                    onClick={() => handleTabClick("employmentInfo")}
                    className={selectedTab === "employmentInfo" ? "tab-button active" : "tab-button"}
                >
                    Employment Information
                </Button>
                <Button
                    onClick={() => handleTabClick("schoolInfo")}
                    className={selectedTab === "schoolInfo" ? "tab-button active" : "tab-button"}
                >
                    School Information
                </Button>
                <Button
                    onClick={() => handleTabClick("serviceInfo")}
                    className={selectedTab === "serviceInfo" ? "tab-button active" : "tab-button"}
                >
                    Service Details
                </Button>
                <Button
                    onClick={() => handleTabClick("retirementInfo")}
                    className={selectedTab === "retirementInfo" ? "tab-button active" : "tab-button"}
                >
                    Pension Details
                </Button>
                <Button
                    onClick={() => handleTabClick("terminationInfo")}
                    className={selectedTab === "terminationInfo" ? "tab-button active" : "tab-button"}
                >
                    Termination Information
                </Button>
            </div>

            <div style={{ marginTop: "20px" }}>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePrint}
                >
                    Print
                </Button>
            </div>

            <br></br>
            <br></br>

            <Grid container sx={{ marginLeft: "500px" }} spacing={3}>
                {/* <div className="print-section"> */}
                {/* <SectionHeader employeeName={formData.EMLNAM} employeeNumber={formData.EMSSAN} /> */}
                {/* Personal Information */}

                <Grid item xs={12} md={5} sx={{
                    width: '50%',
                    '@media print': {
                        marginLeft: '-220px',
                        textAlign: 'center'
                    }
                }}>
                    <Element name="personalInfo" className="page-break">
                        <Accordion defaultExpanded sx={{ width: '90%' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6" sx={{
                                    textAlign: 'center',
                                    width: '100%'
                                }}> <b>Personal Information</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {renderField("Employee Number", formData.EMSSAN, "EMSSAN")}
                                {renderField("SSN", formData.EMPSSN, "EMPSSN")}
                                {renderField("Name", `${formData.EMLNAM}, ${formData.EMFNAM} ${formData.EMMNAM}`, "name")}
                                {renderField("Active", formData.EMSTAT, "EMSTAT")}
                                {renderField("Gender", formData.EMSEX, "EMSEX")}
                                {renderField("Ethnic Code", formData.EMETH, "EMETH")}
                                {renderField("Ethnic Description", formData.ETDESC, "ETDESC")}
                                {renderField("Birth Date", formData.DOB, "DOB")}
                            </AccordionDetails>
                        </Accordion>
                    </Element>
                </Grid>
                {/* <SectionHeader/> */}
                {/* </div> */}


                {/* Contact Information */}
                <Grid item xs={12} md={5} sx={{
                    width: '50%',
                    '@media print': {
                        marginLeft: '-220px',
                        textAlign: 'center'
                    }
                }} >
                    <Element name="contactInfo" className="page-break">
                        <Accordion defaultExpanded sx={{ width: '90%' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6" sx={{
                                    textAlign: 'center',
                                    width: '100%'
                                }}><b>Contact Information</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {renderField("Office Phone", `${formData.EMOTL0} ${formData.EMEXTN}`, "officePhone")}
                                {renderField("Home Phone", `${formData.EMHTL0} ${formData.EMHTLS}`, "homePhone")}
                                {renderField("Address", formData.EMADD1, "EMADD1")}
                                {renderField("Address Security", formData.EMADSC, "EMADSC")}
                                {renderField("Country", formData.EMCTRY, "EMCTRY")}
                                {renderField("Permanent Address", formData.EMCTRY, "EMCTRY")}
                                {renderField("Location", `${formData.EMLOC}, ${formData.LCNAME}`, "EMLOC_LCNAME")}
                                {renderField("District", `${formData.EMHDT}`, "EMHDT")}
                                {renderField("Sub Location", `${formData.EMLOC2}, ${formData.CLNAME} `, "EMLOC2_CLNAME")}
                                {renderField("City/State/Zip", `${formData.EMCITY}, ${formData.EMST} ${formData.EMZIP1}`, "cityStateZip")}
                            </AccordionDetails>
                        </Accordion>
                    </Element>
                </Grid>

                {/* Employment Information */}
                <Grid item xs={12} md={5} sx={{
                    width: '50%',
                    '@media print': {
                        marginLeft: '-220px',
                        textAlign: 'center'
                    }
                }}>
                    <Element name="employmentInfo" className="page-break">
                        <Accordion defaultExpanded sx={{ width: '90%' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6" sx={{
                                    textAlign: 'center',
                                    width: '100%'
                                }}><b>Employment Information</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {renderField("Department", formData.EMDEPT, "EMDEPT")}
                                {renderField("Assignment", formData.EMPASN, "EMPASN")}
                                {renderField("Pay Location", `${formData.EMLOCP} ${formData.LPNAME}`, "EMLOCP_LPNAME")}
                                {renderField("Seniority Date", formData.EMSRDT, "EMSRDT")}
                                {renderField("Termination Date", formData.TRD, "TRD")}
                            </AccordionDetails>
                        </Accordion>
                    </Element>
                </Grid>

                {/* School Information */}
                <Grid item xs={12} md={5} sx={{
                    width: '50%',
                    '@media print': {
                        marginLeft: '-220px',
                        textAlign: 'center'
                    }
                }}>
                    <Element name="schoolInfo" className="page-break">
                        <Accordion defaultExpanded sx={{ width: '90%' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6" sx={{
                                    textAlign: 'center',
                                    width: '100%'
                                }}><b>Employer School Information</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {renderField("School", formData.EMHSC, "EMHSC")}
                                {renderField("Room", formData.EMROOM, "EMROOM")}
                                {renderField("Address", `${formData.EMPAD1} ${formData.EMPAD2}`, "EMPAD1_EMPAD2")}
                                {renderField("City/State/Zip", `${formData.EMPCTY}, ${formData.EMPST} `, "EMPCTY_EMPST_zipCodeP")}
                                {renderField("Country", formData.EMPCTR, "EMPCTR")}
                            </AccordionDetails>
                        </Accordion>
                    </Element>
                </Grid>

                {/* Service Information */}
                <Grid item xs={12} md={5} sx={{
                    width: '50%',
                    '@media print': {
                        marginLeft: '-220px',
                        textAlign: 'center'
                    }
                }}>
                    <Element name="serviceInfo" className="page-break">
                        <Accordion defaultExpanded sx={{ width: '90%' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6" sx={{
                                    textAlign: 'center',
                                    width: '100%'
                                }}><b>Service Details</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {renderField("Previous Service Credit", formData.EMPREV, "EMPREV")}
                                {renderField("District", formData.EMSDST, "EMSDST")}
                                {renderField("State", formData.EMSST, "EMSST")}{renderField("State", formData.EMSST, "EMSST")}
                                {renderField("Application Date", formData.EMADAT, "EMADAT")}
                                {renderField("Full Time Hire Date", formData.HID, "HID")}
                                {renderField("Seniority Date", formData.EMSRDT, "EMSRDT")}
                                {renderField("Original Hire Date", formData.OHD, "OHD")}
                                {renderField("Seniority Number", formData.EMSR, "EMSR")}
                                {renderField("Termination Date", formData.TRD, "TRD")}
                                {renderField("Salary Change Date", formData.SCD, "SCD")}
                                {renderField("Title Change Date", formData.HID, "HID")}
                                {renderField("Last Update for Longevity", formData.EMMSC1, "EMMSC1")}
                                {renderField("Next Update for Longevity", formData.EMMSC2, "EMMSC2")}
                                {renderField("Total Year of Longevity", formData.EMMSC3, "EMMSC3")}

                            </AccordionDetails>
                        </Accordion>
                    </Element>
                </Grid>

                {/* Retirement Information */}
                <Grid item xs={12} md={5} sx={{
                    width: '50%',
                    '@media print': {
                        marginLeft: '-220px',
                        textAlign: 'center'
                    }
                }}>
                    <Element name="retirementInfo" className="page-break">
                        <Accordion defaultExpanded sx={{ width: '90%' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6" sx={{
                                    textAlign: 'center',
                                    width: '100%'
                                }}><b>Pension Details</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {renderField("Pension Number", formData.EXPENS, "EXPENS")}
                                {renderField("10/12 Column Value", formData.EX1012, "EX1012")}
                                {renderField("Pension Full Rate %", formData.EXFRPC, "EXFRPC")}
                                {renderField("TPAF,PERS, CNTY or NOPP", formData.EXTYPE, "EXTYPE")}
                                {renderField("Job Code for GTL Addenda", formData.EXJOB, "EXJOB")}
                                {renderField("GTL Salary Override", formData.EXSALO, "EXSALO")}
                                {renderField("Number of GTL Distributions", formData.EXPAYP, "EXPAYP")}{renderField("Years pf Experience", null, "null")}
                                {renderField("State", formData.EXSEXP, "EXSEXP")}
                                {renderField("District", formData.EXDEXP, "EXDEXP")}
                                {renderField("Out-of-State", formData.EXOEXP, "EXOEXP")}
                                {renderField("Employee Contribute to Cost of Life Insurance?", formData.EXCNTB, "EXCNTB")}
                            </AccordionDetails>
                        </Accordion>
                    </Element>
                </Grid>

                {/* Termination Information */}

                <Grid item xs={12} md={5} sx={{
                    width: '50%',
                    '@media print': {
                        marginLeft: '-220px',
                        textAlign: 'center'
                    }
                }}>
                    <Element name="terminationInfo" className="page-break">
                        <Accordion defaultExpanded sx={{ width: '90%' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6" sx={{
                                    textAlign: 'center',
                                    width: '100%'
                                }}><b>Termination Information</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {renderField("Termination Date", formData.ETMDAT, "ETMDAT")}
                                {renderField("Termination Code", `${formData.ETMCDE} ${formData.TRMTTL}`, "ETMCDE")}
                                {renderField("Employee Detail", formData.ETMDS1, "ETMDS1")}
                                {renderField("Additional Detail", `${formData.ETMDS2} ${formData.ETMDS3}  ${formData.ETMDS4}  ${formData.ETMDS5}  ${formData.ETMDS6}`, "ETMDS2")}
                            </AccordionDetails>
                        </Accordion>
                    </Element>
                </Grid>


                {/* Additional Fields - Add each new category similarly */}
                {/* Continue adding other categories as shown above for each group */}
            </Grid>

            {/* <div style={{ marginTop: "20px" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    style={{ marginRight: "10px" }}
                >
                    Save
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handlePrint}
                >
                    Print
                </Button>
            </div> */}

            <div className="no-print" style={{ marginTop: "20px" }}>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePrint}

                >
                    Print
                </Button>

            </div>

            <Typography variant="body2" gutterBottom>
                Your email is {email}
            </Typography>

            {/* CSS to override accordion collapse behavior for printing */}
            <style>
                {`
          @media print {
            .MuiAccordionSummary-root {
               display: block !important;
            }
            .MuiAccordionDetails-root {
              display: block !important;
            }

            
           
            .mainContainer {
                padding-bottom: 0;
                margin-bottom: 0;
            }
            
            /* Ensure there are no page breaks within the accordion details */
            .MuiAccordionDetails-root {
                break-inside: avoid;
            }

            .page-break:not(:last-child) {
                page-break-after: always;
            }

             
    /* Prevent breaking content within accordion details */
    .MuiAccordionDetails-root {
        break-inside: avoid;
    }

    /* Optional: Remove padding/margins in the print view to better center content */
    .mainContainer {
        padding: 0;
        margin: 0;
        width: 100%;
    }
           
          }

          .flex-container {
            display: flex;
            flex-wrap: wrap; /* Allow wrapping if necessary */
            justify-content: center; /* Align buttons to the left */
            align-items: center;
            margin-left: 120px;
            padding-left: 0;
        }
        
        .tab-buttons {
            display: flex;
            flex-wrap: nowrap; /* Adjust based on screen width */
            gap: 10px; /* Space between buttons */
            overflow-x: auto; /* Allow horizontal scrolling on small screens */
            white-space: nowrap; /* Prevent wrapping text inside buttons */
        }
        
        .tab-button {
            font-size: 0.9rem;
            padding: 10px 20px;
            margin: 5px 0; /* Adjust spacing for better layout on all screens */
            flex-shrink: 0; /* Prevent buttons from shrinking on small screens */
            margin-left: 250px;
            padding: 12px 30px;
            border-radius: 30px;
            color: #ffffff;
            background-color: #1976d2; /* Same color as Save button */
            border: none;
            transition: background-color 0.3s, transform 0.2s;
            text-transform: none;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            font-weight: 600;
        }

.tab-button:hover {
    background-color: #115293; /* Darker shade for hover effect */
    transform: translateY(-2px);
}

.tab-button:active {
    transform: translateY(0px);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.tab-button.active {
    background-color: #0d47a1; /* Darker active color */
    color: #ffffff;
}

/* Scroll to Top Button */


.scrollToTopBtn:hover {
    background-color: #115293; /* Darker shade for hover */
}
    .MuiAccordion-root {
    background-color: #e3f2fd; /* Light background for accordion */
    color: #333;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px 0;
}

.MuiAccordionSummary-root {
    background-color: #1976d2; /* Same color as Save button */
    border-radius: 8px 8px 0 0;
    color: #ffffff;
}

.MuiAccordionSummary-content {
    font-weight: bold;
    font-size: 1.1rem;
}

.MuiAccordionDetails-root {
    background-color: #e0f7fa; /* Subtle background for details */
}

.mainContainer {
    background-color: rgb(192, 219, 229);
    padding: 20px;
    color: #333;
}

/* Sidebar */


/* Tab Button Styles */
.tab-button {
    font-size: 1rem;
    margin: 5px;
    padding: 12px 30px;
    
    border-radius: 30px;
    color: #ffffff;
    background-color: #5aa0f4; /* Save button color */
    border: none;
    transition: background-color 0.3s, transform 0.2s;
    text-transform: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    font-weight: 600;
}

.tab-button:hover {
    background-color: #115293;
    transform: translateY(-2px);
}

.tab-button:active {
    transform: translateY(0px);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.tab-button.active {
    background-color: #0d47a1;
    color: #ffffff;
}

/* Accordion */
.MuiAccordion-root {
    background-color: #e3f2fd;
    color: #333;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px 0;
}

.MuiAccordionSummary-root {
    background-color: #1976d2;
    border-radius: 8px 8px 0 0;
    color: #ffffff;
}

.MuiAccordionSummary-content {
    font-weight: bold;
    font-size: 1.1rem;
}

.MuiAccordionDetails-root {
    background-color: #e0f7fa;
}

/* Text Fields */
.MuiTextField-root {
    margin: 8px 0;
}

.MuiInputBase-input {
    background-color: #fff;
    border-radius: 5px;
    padding: 8px;
}

/* Scroll to Top Button */


.scrollToTopBtn:hover {
    background-color: #115293;
    transform: translateY(-2px);
}

@media (max-width: 600px) {
    .scrollToTopBtn {
        bottom: 20px; /* Adjust positioning for smaller screens */
        right: 370px;
        z-index: 9999;
        width: 40px; /* Reduce size slightly to fit smaller screens */
        height: 40px;
    }

    .flex-container{
        margin-left:620px;
    }
}

.scrollToTopBtn:hover {
    background-color: #115293;
    transform: translateY(-2px);
}

        `}
            </style>
        </div>
    );
};

export default ShowEmployee;
