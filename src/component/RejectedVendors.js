import React, { useState } from 'react'
import AdminHeader from '../common/AdminHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';
import ApprovalFields from './ApprovalFields';
import SideBar from './SideBar';
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Container } from '@mui/material';
function RejectedVendors() {
    const [expanded, setExpanded] = useState(false);

    const handleChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Box style={{ backgroundColor: '#f3f4f7' }} sx={{ height: '100vh', backgroundColor: 'gray' }} >
            <CssBaseline />
            <AdminHeader />
            <Box sx={{ display: 'flex' }}>
                <SideBar />
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Container>
                        <Accordion className='accordion1' sx={{ mt: 1 }}>
                            <AccordionSummary
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography variant="h5" sx={{ width: '40%', flexShrink: 0, fontWeight: "bold" }}>Rejected</Typography>
                                <Typography sx={{ width: '36%', }}></Typography>
                                <TextField
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </AccordionSummary>
                        </Accordion>
                        <Accordion className='accordion1'>
                            <AccordionSummary
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography sx={{ width: '40%', flexShrink: 0, fontWeight: "bold" }}>Vendor name</Typography>
                                <Typography sx={{ width: '36%', }}></Typography>
                                <Typography sx={{ width: '12%', fontWeight: "bold" }}>Submit date</Typography>
                                <Typography sx={{ fontWeight: "bold" }}>Due date</Typography>
                            </AccordionSummary>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <IconButton sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    <Typography>&nbsp;Raju</Typography>
                                </IconButton>
                                <Typography textAlign="center" sx={{ width: '68%', flexShrink: 0, my: 'auto', fontWeight: "bold" }}>Review Vendor Details</Typography>
                                <Typography textAlign="right" sx={{ width: '10%', flexShrink: 0, my: 'auto', fontWeight: "bold" }}>Dec 30</Typography>
                                <Typography textAlign="right" sx={{ width: '10%', flexShrink: 0, my: 'auto', fontWeight: "bold" }}>2 Days</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ApprovalFields />
                            </AccordionDetails>
                        </Accordion>
                    </Container>
                </Box>
            </Box>
        </Box>
    )
}

export default RejectedVendors

