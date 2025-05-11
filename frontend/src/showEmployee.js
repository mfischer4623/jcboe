import React, { useEffect, useState, useCallback } from "react"; // Added useCallback for completeness if needed locally
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
    CircularProgress,
    Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import "./showEmployee.css";

const ShowEmployee = (props) => {
    const {
        loggedIn,
        email,
        employeeNumber,
        ed, // This is employeeData from parent state
        setEmployeeData, // Prop function from parent
        setEmpName,      // Prop function from parent
        setSsn,          // Prop function from parent
        setShowPrintView,
        setLoggedIn: setLoggedInProp, // Assuming this is the prop to update loggedIn status in parent
    } = props;

    const navigate = useNavigate();

    const [expandedSections, setExpandedSections] = useState([
        "personalInfo", "contactInfo", "employmentInfo",
        "schoolInfo", "serviceInfo", "retirementInfo", "terminationInfo"
    ]);
    // Initialize formData to null or props.ed if available on first render.
    // It will be properly set by fetchData.
    const [formData, setFormData] = useState(ed || null);
    const [selectedTab, setSelectedTab] = useState("personalInfo");
    const [showScrollTop, setShowScrollTop] = useState(false);
    // const [expanded, setExpanded] = useState(true); // 'expanded' was set but not directly used for accordion logic other than during print
    const [isLoading, setIsLoading] = useState(true);


    // Effect for navigation based on loggedIn status and employeeNumber
    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("user");
            if (setLoggedInProp) { // Check if the prop function exists
                setLoggedInProp(false);
            }
            navigate("/");
        } else if (!employeeNumber && loggedIn) { // Ensure loggedIn before navigating to search if no employeeNumber
            navigate("/employeeSearch");
        }
    }, [loggedIn, employeeNumber, navigate, setLoggedInProp]);
     // IMPORTANT: setLoggedInProp from parent MUST be memoized with useCallback.

    // Effect for fetching employee data
    useEffect(() => {
        // Only fetch if logged in and employeeNumber is available
        if (loggedIn && employeeNumber) {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(
                        `https://as400.jcboe.org:8080/api/employees/${employeeNumber}`
                    );
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const resData = await response.json();
                    if (setEmployeeData) { // Check if prop function exists
                        setEmployeeData(resData); // This updates 'ed' in parent
                    }
                    setFormData(resData);     // Update local formData
                } catch (error) {
                    console.error("Failed to fetch employee data:", error);
                    // Optionally navigate to an error page or show an error message
                    // navigate("/employeeSearch");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        } else if (!employeeNumber) {
            // If no employeeNumber (e.g., after logout or initial state before selection)
            // ensure data is cleared and not loading.
            // The navigation useEffect should handle redirecting if needed.
            setFormData(null); // Clear form data
            if (setEmployeeData) setEmployeeData(null); // Clear parent data too
            setIsLoading(false);
        }
    }, [loggedIn, employeeNumber, setEmployeeData]); // IMPORTANT: setEmployeeData from parent MUST be memoized with useCallback.

    // Effect for updating derived employee name and SSN (from `ed` prop)
    useEffect(() => {
        if (ed) { // `ed` is the employeeData from props
            const empNameX = `${ed?.EMLNAM || ''}, ${ed?.EMFNAM || ''} ${ed?.EMMNAM || ''}`;
            if (setEmpName) { // Check if prop function exists
                setEmpName(empNameX);
            }
            if (setSsn) { // Check if prop function exists
                setSsn(ed?.EMPSSN);
            }
            // If formData wasn't set directly from ed initially, or to ensure sync if ed could change from elsewhere
            if (!formData || formData.EMSSAN !== ed.EMSSAN) {
                 setFormData(ed);
            }
        } else {
            // If ed becomes null (e.g. employee deselected), clear derived info
            if (setEmpName) setEmpName('');
            if (setSsn) setSsn('');
            setFormData(null);
        }
    }, [ed, setEmpName, setSsn, formData]); // formData added to dep array if setFormData(ed) is conditional.
    // IMPORTANT: setEmpName and setSsn from parent MUST be memoized with useCallback.
    // `ed` is an object; if its reference changes even with same content, this runs.
    // Parent should ensure `ed` reference is stable if content is same (e.g. using useMemo for `ed` if it's derived).


    // Effect for scroll listener - runs once on mount and cleans up on unmount
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this runs once

    // --- Rest of your component logic (formatting functions, handlers, JSX) ---

    if (isLoading && !formData) { // Show loading spinner if actively loading and no data yet
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh'
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    // If not loading but ed (and thus formData via useEffect) is still null,
    // it might mean no employee is selected or data fetch failed and was handled.
    // The navigation useEffects should handle redirecting if employeeNumber is missing.
    if (!formData && !isLoading) { // Changed from `ed === null` to `!formData` as formData is the local representation
        // If navigation hasn't occurred and no data, show a message or minimal UI
        // This state should ideally be managed by navigation or a clear "no data" message.
        return <Typography sx={{textAlign: 'center', marginTop: '20px'}}>No employee data to display. Please select an employee.</Typography>;
    }
    
    // If formData exists, proceed to process and render it
    // Ensure ed exists if formData relies on it for properties not yet copied or processed
    const currentData = formData || ed; // Prefer formData if available, fallback to ed if needed for unprocessed parts

    if (!currentData) { // Final check if all data sources are null
         return <Typography sx={{textAlign: 'center', marginTop: '20px'}}>Waiting for employee data...</Typography>;
    }


    // Ensure EMMNAM is at least a space if null/undefined from currentData
    const emmnam = currentData.EMMNAM == null ? " " : currentData.EMMNAM;


    function normalize(phoneStr) {
        if (typeof phoneStr !== 'string') phoneStr = String(phoneStr || "");
        phoneStr = phoneStr.replace(/[^\d]/g, "");
        if (phoneStr.length === 7) {
            return phoneStr.replace(/(\d{3})(\d{4})/, "$1-$2");
        }
        return ""; // Or return original if not 7 digits, depending on desired behavior
    }

    var ophone = "";
    if (currentData && currentData.EMOTL2 !== null && currentData.EMOTL2 !== undefined) {
        ophone = normalize(currentData.EMOTL2.toString());
    }

    var hphone = "";
    if (currentData && currentData.EMHTL2 !== null && currentData.EMHTL2 !== undefined) {
        hphone = normalize(currentData.EMHTL2.toString());
    }

    var zipCode = "";
    if (currentData && currentData.EMZIP1 !== null && currentData.EMZIP1 !== undefined) {
        zipCode = currentData.EMZIP1.toString();
        if (zipCode.length > 0 && zipCode.length < 5) {
            zipCode = '0'.repeat(5 - zipCode.length) + zipCode;
        } else if (zipCode.length !== 5) {
             zipCode = ""; // Or handle as invalid
        }
    }

    var zipCodeP = "";
    if (currentData && currentData.EMPZP1 !== null && currentData.EMPZP1 !== undefined) {
        zipCodeP = currentData.EMPZP1.toString();
        if (zipCodeP.length > 0 && zipCodeP.length < 5) {
            zipCodeP = '0'.repeat(5 - zipCodeP.length) + zipCodeP;
        } else if (zipCodeP.length !== 5) {
            zipCodeP = ""; // Or handle as invalid
        }
    }

    var GENDER = 'OTHER';
    if (currentData.EMSEX === 'F') {
        GENDER = 'FEMALE';
    } else if (currentData.EMSEX === 'M') {
        GENDER = 'MALE';
    }

    var EMVETC = null;
    if (currentData.EMVETC === 'DSTSTM') {
        EMVETC = 'DESERT STORM';
    }
    
    // Date formatting (ensure currentData is used)
    var trdDate = currentData.TRD;
    if (trdDate === '00/00/1900' || trdDate === '00/00/2000') {
        trdDate = '';
    }

    var scdDate = currentData.SCD;
    if (scdDate === '00/00/0000' || scdDate === '00/00/1900' || scdDate === '00/00/2000') {
        scdDate = '';
    }
    
    var EMADAT_formatted = '';
    if (currentData && currentData.EMADAT !== null && currentData.EMADAT !== undefined && currentData.EMADAT !== 0) {
        let dateString = currentData.EMADAT.toString();
        let year = dateString.substring(0, 2);
        let month = dateString.substring(2, 4);
        let day = dateString.substring(4, 6);
        year = parseInt(year, 10) > 30 ? '19' + year : '20' + year;
        EMADAT_formatted = `${month}/${day}/${year}`;
    }

    var EMSRDT_formatted = '';
    if (currentData && currentData.EMSRDT !== null && currentData.EMSRDT !== undefined && currentData.EMSRDT !== 0) {
        let dateString = currentData.EMSRDT.toString();
        let year = dateString.substring(0, 2);
        let month = dateString.substring(2, 4);
        let day = dateString.substring(4, 6);
        year = parseInt(year, 10) > 30 ? '19' + year : '20' + year;
        EMSRDT_formatted = `${month}/${day}/${year}`;
    }

    var ETMDAT_formatted = '';
    if (currentData && currentData.ETMDAT !== null && currentData.ETMDAT !== undefined && currentData.ETMDAT !== 0) {
        let dateString = currentData.ETMDAT.toString();
        let year = '', month = '', day = '';
        // Simplified logic assuming MMDDYY or similar 6-digit format from context
        if (dateString.length === 6) { // MMDDYY
            month = dateString.substring(0, 2);
            day = dateString.substring(2, 4);
            year = dateString.substring(4, 6);
        } else if (dateString.length === 5) { // Attempt to handle M D D Y Y or M M D Y Y (less common for raw numbers)
             // This part is tricky without knowing the exact 5-digit format.
             // Assuming MMDDY => month = dateString.substring(0,2), day = dateString.substring(2,4), year = '0' + dateString.substring(4,5)
             // For now, let's assume it's an error or needs specific parsing rules if it's 5 digits.
             // Defaulting to an empty string or error for unexpected 5-digit formats.
        } // Add more specific parsing if other formats are expected for ETMDAT

        if (year && month && day) {
            year = parseInt(year, 10) > 30 && parseInt(year,10) <= 99 ? '19' + year : '20' + year;
            ETMDAT_formatted = `${month}/${day}/${year}`;
        } else {
            ETMDAT_formatted = "Invalid Date";
        }
    }
    
    const etmds1 = (currentData.ETMDS1 === null || currentData.ETMDS1 === undefined) ? '-' : currentData.ETMDS1;
    const etmds2 = (currentData.ETMDS2 === null || currentData.ETMDS2 === undefined) ? '-' : currentData.ETMDS2;
    const etmds3 = (currentData.ETMDS3 === null || currentData.ETMDS3 === undefined) ? '-' : currentData.ETMDS3;
    const etmds4 = (currentData.ETMDS4 === null || currentData.ETMDS4 === undefined) ? '-' : currentData.ETMDS4;
    const etmds5 = (currentData.ETMDS5 === null || currentData.ETMDS5 === undefined) ? '-' : currentData.ETMDS5;
    const etmds6 = (currentData.ETMDS6 === null || currentData.ETMDS6 === undefined) ? '-' : currentData.ETMDS6;


    const handleFieldChange = (fieldName, value) => {
        // This function is not currently used as fields are read-only.
        // If editable fields are introduced, ensure this updates state correctly.
        // setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrint = () => {
        // setExpanded(true); // No 'expanded' state variable directly controls accordions in this version
        // Expand all sections for printing
        setExpandedSections([
            "personalInfo", "contactInfo", "employmentInfo",
            "schoolInfo", "serviceInfo", "retirementInfo", "terminationInfo"
        ]);
        if (setShowPrintView) setShowPrintView(true);
        setTimeout(() => {
            window.print();
            if (setShowPrintView) setShowPrintView(false);
            // Optionally revert expandedSections to a default or previous state after print
            // setExpandedSections(["employmentInfo"]); // Example
        }, 500);
    };

    const renderField = (label, value, fieldName) => (
        <TextField
            fullWidth
            label={label}
            value={value != null ? value : ""}
            margin="normal"
            InputProps={{ readOnly: true }}
            // onChange={(e) => handleFieldChange(fieldName, e.target.value)} // Not needed for readOnly
            sx={{ width: '70%' }}
        />
    );

    const handleTabClick = (sectionName) => {
        setSelectedTab(sectionName);
        if (!expandedSections.includes(sectionName)) {
            setExpandedSections((prev) => [...prev, sectionName]);
        }
        scroller.scrollTo(sectionName, {
            duration: 800,
            delay: 0,
            smooth: "easeInOutQuart"
        });
    };

    const toggleSection = (sectionName) => {
        setExpandedSections((prev) =>
            prev.includes(sectionName)
                ? prev.filter((sec) => sec !== sectionName)
                : [...prev, sectionName]
        );
    };

    // ----- JSX -----
    return (
        <div className="mainContainer">
            <div className="print-header">
                <Typography variant="h4" gutterBottom>
                    <b> Employee Information </b>
                </Typography>
                <Typography variant="h5" gutterBottom>
                    <b> Employee Name: {currentData.EMLNAM || ''}, {currentData.EMFNAM || ''} {emmnam} </b>
                </Typography>
                <Typography variant="h5" gutterBottom>
                    <b> Employee Number : {currentData.EMSSAN || ''} </b>
                </Typography>
            </div>

            {showScrollTop && (
                <Button
                    onClick={scrollToTop}
                    variant="contained"
                    color="primary"
                    style={{
                        position: 'fixed', bottom: '30px', right: '30px',
                        borderRadius: '50%', minWidth: '50px', height: '50px',
                    }}
                >
                    <ArrowUpwardIcon />
                </Button>
            )}

            <div className="tab-buttons flex-container">
                {/* ... Tab Buttons ... */}
                <Button onClick={() => handleTabClick("personalInfo")} className={selectedTab === "personalInfo" ? "tab-button active" : "tab-button"}>Personal Information</Button>
                <Button onClick={() => handleTabClick("contactInfo")} className={selectedTab === "contactInfo" ? "tab-button active" : "tab-button"}>Contact Information</Button>
                <Button onClick={() => handleTabClick("employmentInfo")} className={selectedTab === "employmentInfo" ? "tab-button active" : "tab-button"}>Employment Information</Button>
                <Button onClick={() => handleTabClick("schoolInfo")} className={selectedTab === "schoolInfo" ? "tab-button active" : "tab-button"}>Emp School Information</Button>
                <Button onClick={() => handleTabClick("serviceInfo")} className={selectedTab === "serviceInfo" ? "tab-button active" : "tab-button"}>Service Details</Button>
                <Button onClick={() => handleTabClick("retirementInfo")} className={selectedTab === "retirementInfo" ? "tab-button active" : "tab-button"}>Pension Details</Button>
                <Button onClick={() => handleTabClick("terminationInfo")} className={selectedTab === "terminationInfo" ? "tab-button active" : "tab-button"}>Termination Information</Button>
            </div>

            <div style={{ marginTop: "20px" }}>
                <Button sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'black' }}} onClick={handlePrint}>
                    <b>PRINT INFORMATION</b>
                </Button>
            </div>
            <br /><br />

            <Grid container sx={{ marginLeft: "500px" }} spacing={3}>
                 {/* Personal Information */}
                <Grid item xs={12} md={5} sx={{ width: '50%', '@media print': { marginLeft: '-220px', textAlign: 'center' } }}>
                    <Element name="personalInfo" className="page-break">
                        <Accordion expanded={expandedSections.includes("personalInfo")} onChange={() => toggleSection("personalInfo")} sx={{ width: '90%' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}><b>Personal Information</b></Typography></AccordionSummary>
                            <AccordionDetails>
                                {renderField("Employee Number", currentData.EMSSAN, "EMSSAN")}
                                {renderField("SSN", currentData.EMPSSN, "EMPSSN")}
                                {renderField("Name", `${currentData.EMLNAM || ''}, ${currentData.EMFNAM || ''} ${emmnam}`, "name")}
                                {renderField("Active", currentData.EMSTAT, "EMSTAT")}
                                {renderField("Gender", `${currentData.EMSEX || ''} , ${GENDER}`, "EMSEX")}
                                {renderField("Ethnic Code", currentData.EMETH, "EMETH")}
                                {renderField("Ethnic Description", currentData.ETDESC, "ETDESC")}
                                {renderField("Birth Date", currentData.DOB, "DOB")}
                            </AccordionDetails>
                        </Accordion>
                    </Element>
                </Grid>

                {/* Contact Information */}
                <Grid item xs={12} md={5} sx={{ width: '50%', '@media print': { marginLeft: '-220px', textAlign: 'center' } }}>
                    <Element name="contactInfo" className="page-break">
                        <Accordion expanded={expandedSections.includes("contactInfo")} onChange={() => toggleSection("contactInfo")} sx={{ width: '90%' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}><b>Contact Information</b></Typography></AccordionSummary>
                            <AccordionDetails>
                                {renderField("Office Phone", `(${currentData.EMOTL0 || ''}) ${ophone} ext. ${currentData.EMEXTN || ''} ${currentData.EMOTLS || ''}`, "officePhone")}
                                {renderField("Home Phone", `(${currentData.EMHTL0 || ''}) ${hphone} ${currentData.EMHTLS || ''}`, "homePhone")}
                                {renderField("Address", currentData.EMADD1, "EMADD1")}
                                {renderField("Address Security", currentData.EMADSC, "EMADSC")}
                                {renderField("Country", currentData.EMCTRY, "EMCTRY")}
                                {renderField("Permanent Address", "Y", "permanentAddress")}
                                {currentData.EMLOC && currentData.LCNAME && renderField("Location", `${currentData.EMLOC} ${currentData.LCNAME}`, "EMLOC_LCNAME")}
                                {renderField("District", `${currentData.EMHDT || ''}`, "EMHDT")}
                                {currentData.EMLOC2 && currentData.CLNAME && renderField("Sub Location", `${currentData.EMLOC2}, ${currentData.CLNAME}`, "EMLOC2_CLNAME")}
                                {renderField("City/State/Zip", `${currentData.EMCITY || ''}, ${currentData.EMST || ''} ${zipCode}`, "cityStateZip")}
                            </AccordionDetails>
                        </Accordion>
                    </Element>
                </Grid>

                {/* Employment Information */}
                <Grid item xs={12} md={5} sx={{ width: '50%', '@media print': { marginLeft: '-220px', textAlign: 'center' } }}>
                    <Element name="employmentInfo" className="page-break">
                        <Accordion expanded={expandedSections.includes("employmentInfo")} onChange={() => toggleSection("employmentInfo")} sx={{ width: '90%' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}><b>Employment Information</b></Typography></AccordionSummary>
                            <AccordionDetails>
                                {renderField("Department", currentData.EMDEPT, "EMDEPT")}
                                {renderField("Assignment", `${currentData.EMPASN || ''} ${currentData.JDTITL || ''}`, "EMPASN_JDTITL")}
                                {renderField("Pay Location", `${currentData.EMLOCP || ''} ${currentData.LPNAME || ''}`, "EMLOCP_LPNAME")}
                                {renderField("Seniority Date", EMSRDT_formatted, "EMSRDT_formatted")}
                                {renderField("Termination Date", trdDate, "trdDate")}
                            </AccordionDetails>
                        </Accordion>
                    </Element>
                </Grid>

                {/* School Information */}
                <Grid item xs={12} md={5} sx={{ width: '50%', '@media print': { marginLeft: '-220px', textAlign: 'center' } }}>
                    <Element name="schoolInfo" className="page-break">
                        <Accordion expanded={expandedSections.includes("schoolInfo")} onChange={() => toggleSection("schoolInfo")} sx={{ width: '90%' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}><b>Employer School Information</b></Typography></AccordionSummary>
                            <AccordionDetails>
                                {renderField("School", currentData.EMHSC, "EMHSC")}
                                {renderField("Room", currentData.EMROOM, "EMROOM")}
                                {renderField("Address", `${currentData.EMPAD1 || ''} ${currentData.EMPAD2 || ''}`.trim(), "EMPAD1_EMPAD2")}
                                {renderField("City/State/Zip", `${currentData.EMPCTY || ''} ${currentData.EMPST || ''}, ${zipCodeP}`, "EMPCTY_EMPST_zipCodeP")}
                                {renderField("Country", currentData.EMPCTR, "EMPCTR")}
                            </AccordionDetails>
                        </Accordion>
                    </Element>
                </Grid>

                {/* Service Information */}
                <Grid item xs={12} md={5} sx={{ width: '50%', '@media print': { marginLeft: '-220px', textAlign: 'center' } }}>
                    <Element name="serviceInfo" className="page-break">
                        <Accordion expanded={expandedSections.includes("serviceInfo")} onChange={() => toggleSection("serviceInfo")} sx={{ width: '90%' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}><b>Service Details</b></Typography></AccordionSummary>
                            <AccordionDetails>
                                {renderField("Previous Service Credit", currentData.EMPREV, "EMPREV")}
                                {renderField("District", currentData.EMSDST, "EMSDST")}
                                {renderField("State", currentData.EMSST, "EMSST")}
                                {renderField("Application Date", EMADAT_formatted, "EMADAT_formatted")}
                                {renderField("Full Time Hire Date", currentData.HID, "HID")}
                                {renderField("Seniority Date", EMSRDT_formatted, "EMSRDT_formatted")}
                                {renderField("Original Hire Date", currentData.OHD, "OHD")}
                                {renderField("Seniority Number", currentData.EMSR, "EMSR")}
                                {renderField("Termination Date", trdDate, "trdDate")}
                                {renderField("Salary Change Date", scdDate, "scdDate")}
                                {renderField("Title Change Date", currentData.HID, "HID")} {/* Assuming HID is also title change date */}
                                {renderField("Last Update for Longevity", currentData.EMMSC1, "EMMSC1")}
                                {renderField("Next Update for Longevity", currentData.EMMSC2, "EMMSC2")}
                                {renderField("Total Year of Longevity", currentData.EMMSC3, "EMMSC3")}
                            </AccordionDetails>
                        </Accordion>
                    </Element>
                </Grid>

                {/* Retirement Information */}
                <Grid item xs={12} md={5} sx={{ width: '50%', '@media print': { marginLeft: '-220px', textAlign: 'center' } }}>
                    <Element name="retirementInfo" className="page-break">
                        <Accordion expanded={expandedSections.includes("retirementInfo")} onChange={() => toggleSection("retirementInfo")} sx={{ width: '90%' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}><b>Pension Details</b></Typography></AccordionSummary>
                            <AccordionDetails>
                                {renderField("Pension Number", currentData.EXPENS, "EXPENS")}
                                {renderField("10/12 Column Value", currentData.EX1012, "EX1012")}
                                {renderField("Pension Full Rate %", currentData.EXFRPC, "EXFRPC")}
                                {renderField("TPAF,PERS, CNTY or NOPP", currentData.EXTYPE, "EXTYPE")}
                                {renderField("Job Code for GTL Addenda", currentData.EXJOB, "EXJOB")}
                                {renderField("GTL Salary Override", currentData.EXSALO, "EXSALO")}
                                {renderField("Number of GTL Distributions", currentData.EXPAYP, "EXPAYP")}
                                {renderField("Years of Experience", "", "yearsOfExperience")} {/* Original had null, now empty string */}
                                {renderField("State", currentData.EXSEXP, "EXSEXP")}
                                {renderField("District", currentData.EXDEXP, "EXDEXP")}
                                {renderField("Out-of-State", currentData.EXOEXP, "EXOEXP")}
                                {renderField("Employee Contribute to Cost of Life Insurance?", currentData.EXCNTB, "EXCNTB")}
                            </AccordionDetails>
                        </Accordion>
                    </Element>
                </Grid>

                {/* Termination Information */}
                <Grid item xs={12} md={5} sx={{ width: '50%', '@media print': { marginLeft: '-220px', textAlign: 'center' } }}>
                    <Element name="terminationInfo" className="page-break">
                        <Accordion expanded={expandedSections.includes("terminationInfo")} onChange={() => toggleSection("terminationInfo")} sx={{ width: '90%' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}><b>Termination Information</b></Typography></AccordionSummary>
                            <AccordionDetails>
                                {renderField("Termination Date", ETMDAT_formatted, "ETMDAT_formatted")}
                                {currentData.ETMCDE && currentData.TRMTTL && renderField("Termination Code", `${currentData.ETMCDE} ${currentData.TRMTTL}`, "ETMCDE_TRMTTL")}
                                {renderField("Employee Detail", etmds1, "etmds1")}
                                {renderField("Additional Detail", `${etmds2} ${etmds3} ${etmds4} ${etmds5} ${etmds6}`.trim(), "additionalDetail")}
                            </AccordionDetails>
                        </Accordion>
                    </Element>
                </Grid>
            </Grid>

            <div className="no-print" style={{ marginTop: "20px" }}>
                <Button sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'black' }}} onClick={handlePrint}>
                    <b>PRINT INFORMATION</b>
                </Button>
            </div>

            <Typography variant="body2" gutterBottom>
                Your email is {email}
            </Typography>

            <style>
                {/* ... Your existing styles ... */}
            </style>
        </div>
    );
};

export default ShowEmployee;