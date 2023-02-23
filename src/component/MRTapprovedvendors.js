import React, { useState, useEffect } from 'react';
import apiService from "../services/api.service";
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
import moment from 'moment';
function MRTapprovedvendors() {
    const [expanded, setExpanded] = useState(false);
    const [vendors, setvendors] = useState([]);
    const handleChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };
    useEffect(() => {
        const Level3approved = []
        apiService.getApprovalList().then(res => {
            console.log("resresres", res)

            res.data.result.forEach((item) => {
                if (item.level3Status === 'approved') {
                    var date1 = new Date();
                    var date01 = new Date(item.createdAt);
                    var date2 = new Date();
                    date2.setDate(date01.getDate() + 3);
                    var Difference_In_Time = date2.getTime() - date1.getTime();
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    item.updatedAt = Difference_In_Days
                    const s = moment(item.createdAt).format('MMM DD');
                    item.createdAt = s
                    Level3approved.push(item)
                }
            })

            setvendors([])
            setvendors((array) => [...array, ...Level3approved]);
        })
    }, [])
    return (
        <Box style={{ backgroundColor: '#f3f4f7' }} sx={{ height: '100vh', backgroundColor: 'gray' }} >
            <CssBaseline />
            <AdminHeader team="mrtTeam" />
            <Box sx={{ display: 'flex' }}>
                <SideBar MRT="MRTteam" />
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Container>
                        <Accordion className='accordion1' sx={{ mt: 1 }}>
                            <AccordionSummary
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography variant="h5" sx={{ width: '40%', flexShrink: 0, fontWeight: "bold" }}>Approved</Typography>
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
                        {vendors?.map((item, key) => <>
                            <Accordion expanded={expanded === 'panel' + item.id} key={key} onChange={handleChange('panel' + item.id)} >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panelbh-content"
                                    id={"panel1bh-header"}
                                >
                                    <IconButton sx={{ p: 0, width: '18%', justifyContent: 'flex-start' }} >
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                        <Typography >&nbsp;{item.userId}</Typography>
                                    </IconButton>
                                    <Typography textAlign="center" sx={{ width: '55%', flexShrink: 0, my: 'auto', fontWeight: "bold" }}>Review Vendor Details</Typography>
                                    <Typography textAlign="right" sx={{ width: '10%', flexShrink: 0, my: 'auto', fontWeight: "bold" }} >{item.createdAt}</Typography>
                                    <Typography textAlign="right" sx={{ width: '10%', flexShrink: 0, my: 'auto', fontWeight: "bold" }} >{item.updatedAt} {item.updatedAt > 1 ? "Days" : "Day"}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ApprovalFields userid={item.userId} MRT="MRTteam" />
                                </AccordionDetails>
                            </Accordion>
                        </>)}
                    </Container>
                </Box>
            </Box>
        </Box>
    )
}

export default MRTapprovedvendors

