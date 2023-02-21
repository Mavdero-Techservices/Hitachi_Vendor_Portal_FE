
import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import VendorPortalHeader from '../common/MasterVendorHeader';
import VendorPortSidemenu from '../common/MasterVendorSidemenu';
import Button from '@mui/material/Button';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
function createData(Name, designation, Department, emailId, mobileNo, loginId, password, roles) {
  return { Name, designation, Department, emailId, mobileNo, loginId, password, roles };
}
const rows = [
  createData('Rahul', "Am", "finance", "xxx@gmail.com", "9876543210", "xxxxxx", "xxx9", "financial"),
  createData('Ankit', "Manager", "finance", "xxx@gmail.com", "9876543210", "xxxxxx", "xxx9", "financial"),
  createData('Nitin', "CEO", "finance", "xxx@gmail.com", "9876543210", "xxxxxx", "xxx9", "financial"),
];
function UserAccess() {
  const [total, setTotal] = useState("");
  const theme = createTheme({
    Link: {
      textTransform: "none"
    }
  });
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
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead className='table_header'>
                      <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">City_VendorCode_Pincode</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.number}>
                          <TableCell align="center">{row.Name}</TableCell>
                          <TableCell align="center">
                            <select className='userCreationDropdown' align="center">
                              <option align="center">select</option>
                              <option align="center">financial</option>
                              <option align="center">others</option>
                            </select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default UserAccess;

