
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import DrawerHeader from './ui-components/DrawerHeader';
import SidebarAdmin from './components/admin/sidebaradmin';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getLocationList } from "./actions/admin.actions";
import { setLocations } from './features/userdataSlice';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const userdata = useSelector(state => state.userdata);

  useEffect(() => {
    getLocationList({ all: 1 }).then((res) => {
      if (res.data.status) {
        dispatch(setLocations(res.data.data.locations));
      }
    }).catch((error) => {
      console.log(error);
    });
  }, [userdata.value])

  return (
    <Box sx={{ display: 'flex' }}>
      <SidebarAdmin />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} className='main-adn-sss'>
        <DrawerHeader />

        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
