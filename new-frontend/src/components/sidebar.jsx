import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/img/logo-white.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';
import vendorsrchimg from '../assets/img/vendor-serach-icon.png';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import payrollcodeimg from '../assets/img/payroll-code.png';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const Sidebar = () => {
  const location = useLocation();
  const isActiveMenu = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };
  let navigate = useNavigate();
  const [formDate, setformDate] = useState("");
  const [activeMenus, setActiveMenus] = useState('home');
  const [activeSubMenus, setActiveSubMenus] = useState();
  React.useEffect(() => {

    if (window.location.pathname == '/') {
      setActiveMenus('home');

    }
    else if (window.location.pathname == '/home') {
      setActiveMenus('home');
      // setActiveSubMenus('bannerhome');
    }
    else if (window.location.pathname == '/employeedata') {
      setActiveMenus('home');
      setActiveSubMenus('empdata');
    }
    else if (window.location.pathname == '/attendance') {
      setActiveMenus('home');
      setActiveSubMenus('attendance');
    }
    else if (window.location.pathname == '/attendancedetails') {
      setActiveMenus('home');
      setActiveSubMenus('attendancedetails');
    }
    else if (window.location.pathname == '/additionaltags') {
      setActiveMenus('home');
      setActiveSubMenus('additionaltags');
    }
    else if (window.location.pathname == '/Certificates') {
      setActiveMenus('home');
      setActiveSubMenus('Certificates');
    }
    else if (window.location.pathname == '/salaries') {
      setActiveMenus('home');
      setActiveSubMenus('salaries');
    }
    else if (window.location.pathname == '/voluntarydeductions') {
      setActiveMenus('home');
      setActiveSubMenus('voluntarydeductions');
    }
    else if (window.location.pathname == '/payroll' || window.location.pathname == '/showPayrollCheck') {
      setActiveMenus('home');
      setActiveSubMenus('payroll');
    }

    else if (window.location.pathname == '/W2s') {
      setActiveMenus('home');
      setActiveSubMenus('W2s');
    }


    else {
      setActiveMenus('home');
    }
    let date = new Date().toLocaleString("en-US", { timeZone: "America/Indiana/Marengo" });

    let newJerseyDate = new Date(date); // Convert to Date object

    let dayj = newJerseyDate.getDate().toString().padStart(2, "0");
    let monthj = (newJerseyDate.getMonth() + 1).toString().padStart(2, "0");
    let year = newJerseyDate.getFullYear().toString();

    let fromDate = `${dayj}-${monthj}-${year}`; // Format: DD-MM-YYYY
    let fDate = `${monthj}-${dayj}-${year}`; // Format: MM-DD-YYYY

    setformDate(fDate);
  }, []);

  const handleclicksubmenus = (e) => {
    if (e == 'attendance') {
      //console.log(e);
      navigate(`/attendance`);
    }
    if (e == 'empdata') {
      //console.log(e);
      navigate(`/employeedata`);
    }
    if (e == 'attendancedetails') {
      //console.log(e);
      navigate(`/attendancedetails`);
    }
    if (e == 'additionaltags') {
      //console.log(e);
      navigate(`/additionaltags`);
    }
    if (e == 'Certificates') {
      //console.log(e);
      navigate(`/Certificates`);
    }
    if (e == 'salaries') {
      //console.log(e);
      navigate(`/salaries`);
    }
    if (e == 'voluntarydeductions') {
      //console.log(e);
      navigate(`/voluntarydeductions`);
    }
    if (e == 'payroll') {
      //console.log(e);
      navigate(`/payroll`);
    }
    if (e == 'W2s') {
      //console.log(e);
      navigate(`/W2s`);
    }


    setActiveSubMenus(e);


  }

  return (
    <>
      <aside className="aside aside-fixed admin-fixed">
        <div className="aside-header">


          <NavLink to="#" className="aside-logo" style={{ width: '200px' }}>

            <img src={logo} style={{ height: '64px', margin: '0 auto', display: 'block' }} />
            <p className='ver-sec'>Version 1.0</p>
          </NavLink>



        </div>
        <div className='user-details'>

          <AccountCircleIcon />
          <p>Admin</p>
          <p>Last Login: {formDate}</p>
        </div>

        <div className="aside-body scrolling">

          <ul className="nav nav-aside" style={{ display: 'block' }}>
            <li className='menu-sec'>
              <NavLink to="/employee-search" className={`nav-link-menu ${(activeMenus == 'home' && (activeSubMenus == 'empdata' || activeSubMenus == 'attendance' || activeSubMenus == 'attendancedetails' || activeSubMenus == 'additionaltags' || activeSubMenus == 'Certificates' || activeSubMenus == 'salaries' || activeSubMenus == 'voluntarydeductions' || activeSubMenus == 'payroll' || activeSubMenus == 'W2s')) ? 'activeapprove ' : ''}`} ><PersonIcon /><span>Employee Search <span className='arrow-right'><NavigateNextIcon /></span></span></NavLink>
              <ul className={`sub-menu-sec sub-menu-employee ${(activeMenus == 'home' && (activeSubMenus == 'empdata' || activeSubMenus == 'attendance' || activeSubMenus == 'attendancedetails' || activeSubMenus == 'additionaltags' || activeSubMenus == 'Certificates' || activeSubMenus == 'salaries' || activeSubMenus == 'voluntarydeductions' || activeSubMenus == 'payroll' || activeSubMenus == 'W2s')) ? 'submenudisblock ' : 'submenudisnone'}`} >
                <li className={`menu-sec ${activeSubMenus == 'empdata' ? 'submenu-active' : ''}`} onClick={(e) => handleclicksubmenus('empdata')}>Employee Data {activeSubMenus == 'empdata' && <span className='arrow-right'><NavigateNextIcon /></span>} </li>
                <li className={`menu-sec ${activeSubMenus == 'attendance' ? 'submenu-active' : ''}`} onClick={(e) => handleclicksubmenus('attendance')}>Attendance {activeSubMenus == 'attendance' && <span className='arrow-right'><NavigateNextIcon /></span>}</li>
                <li className={`menu-sec ${activeSubMenus == 'attendancedetails' ? 'submenu-active' : ''}`} onClick={(e) => handleclicksubmenus('attendancedetails')}>Attendance Details  {activeSubMenus == 'attendancedetails' && <span className='arrow-right'><NavigateNextIcon /></span>}</li>
                <li className={`menu-sec ${activeSubMenus == 'additionaltags' ? 'submenu-active' : ''}`} onClick={(e) => handleclicksubmenus('additionaltags')}>Additional Tags {activeSubMenus == 'additionaltags' && <span className='arrow-right'><NavigateNextIcon /></span>}</li>
                <li className={`menu-sec ${activeSubMenus == 'Certificates' ? 'submenu-active' : ''}`} onClick={(e) => handleclicksubmenus('Certificates')}>Certificates  {activeSubMenus == 'Certificates' && <span className='arrow-right'><NavigateNextIcon /></span>}</li>
                <li className={`menu-sec ${activeSubMenus == 'salaries' ? 'submenu-active' : ''}`} onClick={(e) => handleclicksubmenus('salaries')}>Salaries {activeSubMenus == 'salaries' && <span className='arrow-right'><NavigateNextIcon /></span>}</li>
                <li className={`menu-sec ${activeSubMenus == 'voluntarydeductions' ? 'submenu-active' : ''}`} onClick={(e) => handleclicksubmenus('voluntarydeductions')}>Voluntary Deductions {activeSubMenus == 'voluntarydeductions' && <span className='arrow-right'><NavigateNextIcon /></span>}</li>
                <li className={`menu-sec ${activeSubMenus == 'payroll' ? 'submenu-active' : ''}`} onClick={(e) => handleclicksubmenus('payroll')}>Payroll  {activeSubMenus == 'payroll' && <span className='arrow-right'><NavigateNextIcon /></span>}</li>
                <li className={`menu-sec ${activeSubMenus == 'W2s' ? 'submenu-active' : ''}`} onClick={(e) => handleclicksubmenus('W2s')}>W2s  {activeSubMenus == 'W2s' && <span className='arrow-right'><NavigateNextIcon /></span>}</li>
              </ul>
            </li>
            <li><NavLink to="/" className={({ isActive }) => `nav-link-menu nav-disply${isActive ? 'activeapprove' : ''}`}><DescriptionIcon /><span>PO Search</span></NavLink></li>
            <li><NavLink to="/" className={({ isActive }) => `nav-link-menu ${isActive ? 'activeapprove' : ''}`}><img src={vendorsrchimg} className='vendor-img' /><span>Vendor Search</span></NavLink></li>
            <li><NavLink to="/" className={({ isActive }) => `nav-link-menu ${isActive ? 'activeapprove' : ''}`}><CheckCircleIcon /><span>Check Search</span></NavLink></li>
            <li className='menu-sec'><NavLink to="/" className={({ isActive }) => `nav-link-menu ${isActive ? 'activeapprove' : ''}`}><img src={payrollcodeimg} /><span>Payroll Codes <span className='arrow-right'><NavigateNextIcon /></span></span></NavLink></li>
            <li><NavLink to="/" className={({ isActive }) => `nav-link-menu lastnav-link ${isActive ? 'activeapprove' : ''}`}><LogoutIcon /><span>Logout</span></NavLink></li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Sidebar;