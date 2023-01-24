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
// import { Container } from 'react-bootstrap';
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from "@mui/material";
import SideBar from './SideBar';
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@mui/icons-material/Search';
function MRTteam() {
    const [expanded, setExpanded] = useState(false);
    const handleChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };

    const theme = createTheme({
        Link: {
            textTransform: "none"
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Box style={{ backgroundColor: '#f3f4f7' }}  >
                <CssBaseline />
                <AdminHeader />
                <Box sx={{ display: 'flex' }}>
                    <SideBar MRT="MRTteam" />
                    <Box sx={{ mt: 2 }}>
                        {/* <Container> */}
                        <Accordion className='accordion1' sx={{ mt: 1 }}>
                            <AccordionSummary
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography variant="h5" sx={{ width: '40%', flexShrink: 0, fontWeight: "bold" }}>Approvals</Typography>
                                <Typography sx={{ width: '36%', }}></Typography>
                                <TextField
                                    // label="With normal TextField"
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
                                {/* <Typography sx={{ width: '12%', fontWeight: "bold" }}>Submit date</Typography> */}
                                {/* <Typography justifyContent="flex-end" sx={{ fontWeight: "bold" }}>Search</Typography> */}
                            </AccordionSummary>
                        </Accordion>
                        <Accordion className='accordion1' >
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
                                    <Typography>&nbsp;Sekar</Typography>
                                </IconButton>
                                <Typography textAlign="center" sx={{ width: '67%', flexShrink: 0, my: 'auto', fontWeight: "bold" }}>Review Vendor Details</Typography>
                                <Typography textAlign="right" sx={{ width: '10%', flexShrink: 0, my: 'auto', fontWeight: "bold" }}>Dec 30</Typography>
                                <Typography textAlign="right" sx={{ width: '10%', flexShrink: 0, my: 'auto', fontWeight: "bold" }}>2 Days</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ApprovalFields MRT="MRTteam" />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <IconButton sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    <Typography>&nbsp;Kumar</Typography>
                                </IconButton>
                                <Typography textAlign="center" sx={{ width: '67%', flexShrink: 0, my: 'auto', fontWeight: "bold" }}>Review Vendor Details</Typography>
                                <Typography textAlign="right" sx={{ width: '10%', flexShrink: 0, my: 'auto', fontWeight: "bold" }}>Dec 30</Typography>
                                <Typography textAlign="right" sx={{ width: '10%', flexShrink: 0, my: 'auto', fontWeight: "bold" }}>2 Days</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ApprovalFields MRT="MRTteam" />
                            </AccordionDetails>
                        </Accordion>
                        {/* </Container> */}
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default MRTteam
