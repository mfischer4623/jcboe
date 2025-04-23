import React, { useContext, useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import {
    Link, useNavigate
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { updateNullOfObjectValues } from '../helpers/helper';
import { purchaseOrders } from '../actions/admin.actions';
import secureLocalStorage from "react-secure-storage";
import { AppContext } from '../context';


const Posearch = () => {
    const [value, setValue] = React.useState(0);
    const [allemployeesn, setAllemployee] = useState([]);
    const [empnanesear, setEmpnanesear] = React.useState({ event: null, value: null });
    const [empnumsear, setEmpnumsear] = React.useState({ podoc: '', ponum: '' });
    const [EmpnumsearErrors, setEmpnumsearerrrors] = useState(updateNullOfObjectValues({ podoc: '', ponum: '' }));
    const [formerror, setFormerror] = useState("");
    const [empiderror, setEmpiderror] = useState("");
    const [loader, setLoader] = useState(false);
    let navigate = useNavigate();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const employeename = [
        { label: 'John test' },
        { label: 'John Smith' },
    ];


    const handleInputChange = (e) => {
        setFormerror("");
        setEmpnumsearerrrors(updateNullOfObjectValues({ podoc: '', ponum: '' }));
        var custInfo = { ...empnumsear };
        const { name, value } = e.target;

        setEmpnumsear((prev) => ({
            ...prev,
            [name]: value
        }));



    };
    const handleSubmit = (e) => {
        setFormerror("");
        setLoader(false);
        if (validateForm()) {
            setLoader(true);
            purchaseOrders(empnumsear.podoc,empnumsear.ponum).then((res) => {
                console.log('add-user res=====>>>>', res.data);
                if (res.data == '' || res.data == null) {
                    setLoader(false);
                    setFormerror("No Purchase Order found");
                    return;
                } else {
                    setLoader(false);
                    secureLocalStorage.setItem("poData", res.data);
                    secureLocalStorage.setItem("pobasicData", empnumsear);
                    setEmpnumsear({ podoc: '', ponum: '' });

                    setFormerror("");
                    navigate("/podetails");
                }

            }).catch((error) => {
                setLoader(false);
                console.log('error occurs while registring the user', error);
            });
        }

    };
    const validateForm = () => {
        let errors = {};
        let formIsValid = true;
        if (!empnumsear.podoc) {
            formIsValid = false;
            errors['podoc'] = 'PO Document is required';
        }
        if (!empnumsear.ponum) {
            formIsValid = false;
            errors['ponum'] = 'PO Number is required';
        }

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
    useEffect(() => {
        
        secureLocalStorage.removeItem('checkforsh');
    
    
      }, []);
    
    return (
        <>
            <Header />
            <Sidebar />
            <div className='main-inner-sec content-main'>
                <div className='main-inner-heading main-all-marg'>
                    <div className='col-md-12'>
                        <div className='emp-serach'>
                            <h2>Purchase Order Search</h2>
                        </div>
                    </div>
                </div>
                <div className='tab-sec-main tab-sec-emp margin-all-sec'>

                    <div className='tab-sec-main-inner-show backg-shaw-main'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className='form-sec emp-name-span form-autocomple-sec vali-secs'>
                                    <Box
                                        component="form"
                                        sx={{ '& > :not(style)': { width: '100%' } }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField id="outlined-basic" label="PO Document" variant="outlined"

                                            onChange={handleInputChange}
                                            name="podoc"
                                            value={empnumsear.podoc}
                                            error={EmpnumsearErrors.podoc ? true : false}
                                            helperText={EmpnumsearErrors.podoc}
                                            onKeyPress={handleKeypress}
                                        />
                                    </Box>
                                </div>
                            </div>

                            <div className='col-md-4'>
                                <div className='form-sec log-email vali-secs'>
                                    <Box
                                        component="form"
                                        sx={{ '& > :not(style)': { width: '100%' } }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField id="outlined-basic" label="PO Number" variant="outlined"
                                            onChange={handleInputChange}
                                            name="ponum"
                                            value={empnumsear.ponum}
                                            error={EmpnumsearErrors.ponum ? true : false}
                                            helperText={EmpnumsearErrors.ponum}
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
                        <div className='form-sec-vali error-msg'>
                                        <p className='erro-vali-sec  error-login emp-data-error'>{formerror}</p>
                                    </div>
                                    </div>
                                    </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Posearch;
