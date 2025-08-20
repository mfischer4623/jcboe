import React, { useContext, useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import {
    Link, useNavigate
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { updateNullOfObjectValues } from '../helpers/helper';
import { vendorNumberSearch, vendorNameSearch } from '../actions/admin.actions';

import { systemvendornumber, systemvendornamesearch } from '../actions/systemadmin.actions';

import secureLocalStorage from "react-secure-storage";
import { AppContext } from '../context';



function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}


CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Vendorsearch = () => {
    const [value, setValue] = React.useState(0);
    const [allemployeesn, setAllemployee] = useState([]);
    const [empnanesear, setEmpnanesear] = React.useState({ event: null, value: null });
    const [empnumsear, setEmpnumsear] = React.useState({ vendorNumber: '', vendorName: '' });
    const [EmpnumsearErrors, setEmpnumsearerrrors] = useState(updateNullOfObjectValues({ vendorNumber: '', vendorName: '' }));
    const [formerror, setFormerror] = useState("");
    const [empiderror, setEmpiderror] = useState("");
    const [access, setAccess] = useState(null);
    const [loader, setLoader] = useState(false);

    const [empnumsearsystem, setEmpnumsearsystem] = React.useState({ vendorNumber: '', vendorName: '' });
    const [EmpnumsearErrorssystem, setEmpnumsearerrrorssystem] = useState(updateNullOfObjectValues({ vendorNumber: '', vendorName: '' }));
    let navigate = useNavigate();
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setFormerror("");
        setLoader(false);

    };

    const employeename = [
        { label: 'John test' },
        { label: 'John Smith' },
    ];
    useEffect(() => {
        secureLocalStorage.removeItem('vendorNameData');
        secureLocalStorage.removeItem('vendorNumberData');
        secureLocalStorage.removeItem('showPOData');
        secureLocalStorage.removeItem('checkforsh');
        secureLocalStorage.removeItem('bankDetailsData');

        var userf = secureLocalStorage.getItem("user");
        setAccess(userf.access);
    }, []);

    const handleInputChange = (e) => {
        setFormerror("");
        setEmpnumsearerrrors(updateNullOfObjectValues({ vendorNumber: '', vendorName: '' }));
        var custInfo = { ...empnumsear };
        const { name, value } = e.target;

        setEmpnumsear((prev) => ({
            ...prev,
            [name]: value
        }));



    };

        
    const handleInputChangesystem= (e) => {
        setFormerror("");
        setEmpnumsearerrrorssystem(updateNullOfObjectValues({ vendorNumber: '', vendorName: '' }));
        var custInfo = { ...empnumsearsystem };
        const { name, value } = e.target;

        setEmpnumsearsystem((prev) => ({
            ...prev,
            [name]: value
        }));



    }


    const handleSubmit = (e) => {
        setFormerror("");
        setLoader(false);
        if (validateForm()) {
            setLoader(true);

            if (empnumsear.vendorNumber == "" && empnumsear.vendorName != "") {
                vendorNameSearch(empnumsear.vendorName).then((res) => {
                    console.log('add-user res=====>>>>', res.data);
                    if (res.data == '' || res.data == null) {
                        setLoader(false);
                        setFormerror("No Vendor found");
                        return;
                    } else {
                        setLoader(false);
                        secureLocalStorage.setItem("vendorNameData", res.data);

                        setEmpnumsear({ vendorNumber: '', vendorName: '' });

                        setFormerror("");
                        navigate("/vendorsearchlist");
                    }

                }).catch((error) => {
                    setLoader(false);
                    console.log('error occurs while registring the user', error);
                });

            }

            else if (empnumsear.vendorName == "" && empnumsear.vendorNumber != "") {
                vendorNumberSearch(empnumsear.vendorNumber).then((res) => {
                    console.log('add-user res=====>>>>', res.data);
                    if (res.data == '' || res.data == null) {
                        setLoader(false);
                        setFormerror("No Vendor found");
                        return;
                    } else {
                        setLoader(false);
                        secureLocalStorage.setItem("vendorNumberData", res.data);

                        setEmpnumsear({ vendorNumber: '', vendorName: '' });

                        setFormerror("");
                        navigate("/vendordetails");
                    }

                }).catch((error) => {
                    setLoader(false);
                    console.log('error occurs while registring the user', error);
                });

            }
        } else if (empnumsear.vendorName != "" && empnumsear.vendorNumber != "") {
            setEmpnumsear({ vendorNumber: '', vendorName: '' });
            setFormerror("Please Enter Vendor Name or Vendor Number  ");
            setLoader(false);
        }
    };


    const validateForm = () => {
        let errors = {};
        let formIsValid = true;
        if (empnumsear.vendorName == '' && empnumsear.vendorNumber == "") {
            setFormerror("Please Enter Vendor Name or Vendor Number  ");
            formIsValid = false;
        } else if (empnumsear.vendorName != "" && empnumsear.vendorNumber != "") {
            setEmpnumsear({ vendorNumber: '', vendorName: '' });
            setFormerror("Please Enter Vendor Name or Vendor Number  ");
            formIsValid = false;
        }

        // if (!empnumsear.vendorName && empnumsear.vendorNumber == "") {
        //     formIsValid = false;
        //     errors['vendorName'] = 'Vendor Namer is required';
        // } if (!empnumsear.vendorNumber && empnumsear.vendorName == "") {
        //     formIsValid = false;
        //     errors['vendorNumber'] = 'Vendor Number is required';
        // }

        console.log(errors);
        setEmpnumsearerrrors(errors);
        return formIsValid;
    }
    const handleKeypress = (e) => {
        if (e.which === 13) {
            handleSubmit();
            e.preventDefault();
        }
    };


        const handleSubmitsystem = (e) => {
        setFormerror("");
        setLoader(false);
        if (validateFormsystem()) {
            setLoader(true);

            if (empnumsearsystem.vendorNumber == "" && empnumsearsystem.vendorName != "") {
                systemvendornamesearch(empnumsearsystem.vendorName).then((res) => {
                    console.log('add-user res=====>>>>', res.data);
                    if (res.data == '' || res.data == null) {
                        setLoader(false);
                        setFormerror("No Vendor found");
                        return;
                    } else {
                        setLoader(false);
                        secureLocalStorage.setItem("vendorSystemNameData", res.data);

                        setEmpnumsearsystem({ vendorNumber: '', vendorName: '' });

                        setFormerror("");
                        navigate("/vendorsearchsystemlist");
                    }

                }).catch((error) => {
                    setLoader(false);
                    console.log('error occurs while registring the user', error);
                });

            }

            else if (empnumsearsystem.vendorName == "" && empnumsearsystem.vendorNumber != "") {
                systemvendornumber(empnumsearsystem.vendorNumber).then((res) => {
                    console.log('add-user res=====>>>>', res.data);
                    if (res.data == '' || res.data == null) {
                        setLoader(false);
                        setFormerror("No Vendor found");
                        return;
                    } else {
                        setLoader(false);
                        secureLocalStorage.setItem("vendorSystemNumberData", res.data);

                        setEmpnumsearsystem({ vendorNumber: '', vendorName: '' });

                        setFormerror("");
                        navigate("/vendorsystemdetails");
                    }

                }).catch((error) => {
                    setLoader(false);
                    console.log('error occurs while registring the user', error);
                });

            }
        } else if (empnumsearsystem.vendorName != "" && empnumsearsystem.vendorNumber != "") {
            setEmpnumsearsystem({ vendorNumber: '', vendorName: '' });
            setFormerror("Please Enter Vendor Name or Vendor Number  ");
            setLoader(false);
        }
    };


    const validateFormsystem = () => {
        let errors = {};
        let formIsValid = true;
        if (empnumsearsystem.vendorName == '' && empnumsearsystem.vendorNumber == "") {
            setFormerror("Please Enter Vendor Name or Vendor Number  ");
            formIsValid = false;
        } else if (empnumsearsystem.vendorName != "" && empnumsearsystem.vendorNumber != "") {
            setEmpnumsear({ vendorNumber: '', vendorName: '' });
            setFormerror("Please Enter Vendor Name or Vendor Number  ");
            formIsValid = false;
        }

        // if (!empnumsear.vendorName && empnumsear.vendorNumber == "") {
        //     formIsValid = false;
        //     errors['vendorName'] = 'Vendor Namer is required';
        // } if (!empnumsear.vendorNumber && empnumsear.vendorName == "") {
        //     formIsValid = false;
        //     errors['vendorNumber'] = 'Vendor Number is required';
        // }

        console.log(errors);
        setEmpnumsearerrrorssystem(errors);
        return formIsValid;
    }
    const handleKeypresssystem = (e) => {
        if (e.which === 13) {
            handleSubmitsystem();
            e.preventDefault();
        }
    };
    return (
        <>
            <Header />
            <Sidebar />
            <div className='main-inner-sec content-main'>
                <div className='main-inner-heading main-all-marg'>
                    <div className='col-md-12'>
                        <div className='emp-serach'>
                            <h2>Vendor Search</h2>
                        </div>
                    </div>
                </div>
                <div className='tab-sec-main tab-sec-emp margin-all-sec'>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">

                                {access && access.includes('as') && <Tab label="AS400" {...a11yProps(0)} />}
                                {access && access.includes('sys') && <Tab label="System 3000" {...a11yProps(1)} />}

                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0} className='tab-sec-main-inner'>

                            <div className='tab-sec-main-inner-show'>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <div className='form-sec emp-name-span form-autocomple-sec'>
                                            <Box
                                                component="form"
                                                sx={{ '& > :not(style)': { width: '100%' } }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <TextField id="outlined-basic" label="Vendor Name" variant="outlined"

                                                    onChange={handleInputChange}
                                                    name="vendorName"
                                                    value={empnumsear.vendorName}
                                                    error={EmpnumsearErrors.vendorName ? true : false}
                                                    helperText={EmpnumsearErrors.vendorName}
                                                    onKeyPress={handleKeypress} />
                                            </Box>
                                        </div>
                                    </div>
                                    <div className='oir-sec'><p className='or-sec'>OR</p></div>
                                    <div className='col-md-4'>
                                        <div className='form-sec log-email'>
                                            <Box
                                                component="form"
                                                sx={{ '& > :not(style)': { width: '100%' } }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <TextField id="outlined-basic" label="Vendor Number" variant="outlined"
                                                    onChange={handleInputChange}
                                                    name="vendorNumber"
                                                    value={empnumsear.vendorNumber}
                                                    error={EmpnumsearErrors.vendorNumber ? true : false}
                                                    helperText={EmpnumsearErrors.vendorNumber}
                                                    onKeyPress={handleKeypress}
                                                />
                                            </Box>
                                        </div>
                                    </div>
                                    <div className='col-md-2'>
                                        <div className='search-btn-sec'>
                                            <Link to="#" onClick={handleSubmit} className='btn btn-search'>Search
                                                {
                                                    loader != '' ?
                                                        <CircularProgress style={{ width: "15px", height: "15px", marginLeft: "5px", color: "white" }} />
                                                        : ''
                                                }
                                            </Link>
                                            {/* <div className='form-sec-vali'>
                                        <p className='erro-vali-sec'>{formerror}</p>
                                    </div> */}


                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='form-sec-vali error-msg '>
                                            <p className='erro-vali-sec error-login emp-data-error'>{formerror}</p>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={1} className='tab-sec-main-inner'>

                            <div className='tab-sec-main-inner-show '>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <div className='form-sec emp-name-span form-autocomple-sec '>
                                            <Box
                                                component="form"
                                                sx={{ '& > :not(style)': { width: '100%' } }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <TextField id="outlined-basic" label="Vendor Name" variant="outlined"

                                                    onChange={handleInputChangesystem}
                                                    name="vendorName"
                                                    value={empnumsearsystem.vendorName}
                                                    error={EmpnumsearErrorssystem.vendorName ? true : false}
                                                    helperText={EmpnumsearErrorssystem.vendorName}
                                                    onKeyPress={handleKeypresssystem} />
                                            </Box>
                                        </div>
                                    </div>
                                    <div className='oir-sec'><p className='or-sec'>OR</p></div>
                                    <div className='col-md-4'>
                                        <div className='form-sec log-email'>
                                            <Box
                                                component="form"
                                                sx={{ '& > :not(style)': { width: '100%' } }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <TextField id="outlined-basic" label="Vendor Number" variant="outlined"
                                                    onChange={handleInputChangesystem}
                                                    name="vendorNumber"
                                                    value={empnumsearsystem.vendorNumber}
                                                    error={EmpnumsearErrorssystem.vendorNumber ? true : false}
                                                    helperText={EmpnumsearErrorssystem.vendorNumber}
                                                    onKeyPress={handleKeypresssystem}
                                                />
                                            </Box>
                                        </div>
                                    </div>
                                    <div className='col-md-2'>
                                        <div className='search-btn-sec'>
                                            <Link to="#" onClick={handleSubmitsystem} className='btn btn-search'>Search
                                                {
                                                    loader != '' ?
                                                        <CircularProgress style={{ width: "15px", height: "15px", marginLeft: "5px", color: "white" }} />
                                                        : ''
                                                }
                                            </Link>
                                            {/* <div className='form-sec-vali'>
                                        <p className='erro-vali-sec'>{formerror}</p>
                                    </div> */}


                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='form-sec-vali error-msg '>
                                            <p className='erro-vali-sec error-login emp-data-error'>{formerror}</p>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </CustomTabPanel>
                    </Box>

                </div>
            </div>
        </>
    )
}

export default Vendorsearch;
