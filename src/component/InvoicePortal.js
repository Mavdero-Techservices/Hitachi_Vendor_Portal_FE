import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Container, ThemeProvider } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
// import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
// import moment from 'moment';
import { React, useEffect, useState } from 'react';

import VendorPortalHeader from '../common/VendorPortalHeader';
import VendorPortSidemenu from '../common/VendorPortSidemenu';
import Invoice from './Invoice';
import InvoicePortalTable from './InvoicePortalTable';
import OpenPurchaseOrder from './OpenPurchaseOrder';
// import apiService from '../services/api.service';
// import PurchaseOrder from './PurchaseOrder';
// import SideBar from './SideBar';
export default function InvoicePortal() {
    const [expanded, setExpanded] = useState(false);
    //   const [vendors, setvendors] = useState([]);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const theme = createTheme({
        Link: {
            textTransform: 'none',
        },
    });
    useEffect(() => {
        // apiService.getApprovedStatus().then((res) => {
        //   res.data.result.forEach((item) => {
        //     var date1 = new Date();
        //     var date01 = new Date(item.createdAt);
        //     var date2 = new Date();
        //     date2.setDate(date01.getDate() + 3);
        //     var Difference_In_Time = date2.getTime() - date1.getTime();
        //     var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        //     item.updatedAt = Difference_In_Days;
        //     const s = moment(item.createdAt).format('MMM DD');
        //     item.createdAt = s;
        //   });
        // });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box style={{ backgroundColor: '#f3f4f7' }}>
                <CssBaseline />
                <VendorPortalHeader />
                <Box sx={{ display: 'flex' }}>
                    <VendorPortSidemenu />
                    <Box sx={{ mt: 2, width: '100%' }}>
                        <Container>
                            <h3><b>Invoices</b></h3>
                            <p>Kindly find the details of the outstanding balance as of (report run date), Kindly review the same and let us know if you have
                                found any difference in the outstanding balance, kindly approve/reject based on the showing detail or you can mention the
                                comments here for the disputed items we will connect to you for the detail to close the same.</p>

                            <Accordion className="accordion1">
                                <AccordionSummary
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                >
                                    <Typography
                                        sx={{ width: '80%', flexShrink: 0, fontWeight: 'bold' }}
                                    >

                                        Invoice No
                                    </Typography>

                                    <Typography sx={{ width: '10%', fontWeight: 'bold' }}>
                                        date
                                    </Typography>
                                    <Typography sx={{ width: '10%', fontWeight: 'bold' }}>
                                        Status
                                    </Typography>
                                </AccordionSummary>
                            </Accordion>
                            {/* {vendors?.map((item, key) => ( */}
                            {/* <> */}
                            <Accordion
                                expanded={expanded === 'panel'}
                                // key={key}
                                onChange={handleChange('panel')}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panelbh-content"
                                    id={'panel1bh-header'}
                                >
                                    <IconButton
                                        sx={{
                                            p: 0,
                                            width: '75%',
                                            justifyContent: 'flex-start',
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: 'bold' }}>
                                            &nbsp;{'220140'}
                                        </Typography>
                                    </IconButton>

                                    <Typography
                                        textAlign="right"
                                        sx={{
                                            width: '10%',
                                            flexShrink: 0,
                                            my: 'auto',
                                            fontWeight: 'bold',
                                            ml: 2,
                                        }}
                                    >
                                       20/12/2022 
                                    </Typography>
                                    <Typography
                                        textAlign="right"
                                        sx={{
                                            width: '10%',
                                            flexShrink: 0,
                                            my: 'auto',
                                            fontWeight: 'bold',
                                            ml: 2,
                                        }}
                                    >
                                        In review
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* <OpenPurchaseOrder /> */}
                                    {/* <Invoice/> */}
                                    <InvoicePortalTable />
                                </AccordionDetails>
                            </Accordion>
                            {/* </> */}
                        </Container>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
