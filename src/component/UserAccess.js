
import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from "@mui/material";
import { MDBDataTableV5 } from 'mdbreact';
import VendorPortalHeader from '../common/MasterVendorHeader';
import VendorPortSidemenu from '../common/MasterVendorSidemenu';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import apiService from "../services/api.service";
import Swal from "sweetalert2";
function UserAccess() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const theme = createTheme({
    Link: {
      textTransform: "none"
    }
  });
  // function editMasterVendor(id) {
  //   const user = {
  //     SubUserId: id || undefined,
  //   }
   
  //   apiService.getMasterVendorSubUserById(user)
  //     .then(response => {
       
  //     })
  // }
  // const UpdateMasterVendor = (e) => {
  //   e.preventDefault();
  //   const user = {
  //     Name: values.Name || undefined,
  //     city_vendorCode_Pincode:values.city_vendorCode_Pincode || undefined,
  //   }
  //   apiService.UpdateMasterVendorUserAccessById(user)
  //     .then(response => {
  //       apiService.getAllMasterVendorUserAccess().then((res) => {
  //         setgetAllUser(res.data.result);
  //       })
  //     })
  // }
  // const saveMasterUserAccess = (e) => {
  //   e.preventDefault();
  //   const user = {
  //     Name: values.Name || undefined,
  //     city_vendorCode_Pincode:values.city_vendorCode_Pincode || undefined,
  //   }
  //   apiService.saveMasterUserAccess(user)
  //     .then(response => {
  //       apiService.getAllMasterVendorUserAccess().then((res) => {
  //         setgetAllUser(res.data.result);
  //       })
  //     })
  // }
  // useEffect(() => {
  //   apiService.getAllMasterVendorUserAccess().then((res) => {
  //     setgetAllUser(res.data.result);
  //   })
  // }, [])
  
  // const deleteRecord = (id) => {
  //   console.log("id::",id);
  //   Swal.fire({
  //     title: "Are You sure You want to delete?",
  //     icon: "warning",
  //     confirmButtonText: "OK",
  //   }).then((ClearData) => {
  //     apiService.deleteMasterVendorUserAccessById(id).then((res) => {
  //       apiService.getAllMasterVendorUserAccess().then((res) => {
  //         setgetAllUser(res.data.result);
  //       })
  //     })
  //   });

  // };
  return (
    <ThemeProvider theme={theme}>
      <Box style={{ backgroundColor: '#f3f4f7' }}  >
        <CssBaseline />
        <VendorPortalHeader />
        <Box sx={{ display: 'flex' }}>
          <VendorPortSidemenu />
          <Box sx={{ mt: 2, width: '100%' }}>
            <Container>
              <h2 className='masterTitle'>User Access</h2>
              <Box sx={{ mt: 2, height: 350, width: '100%' }}>
           
              </Box>

            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default UserAccess;

