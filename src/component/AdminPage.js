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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Container } from 'react-bootstrap';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { Link } from "react-router-dom";
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from "@mui/material";
function AdminPage() {

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
      <Box style={{ backgroundColor: '#f3f4f7' }} sx={{ backgroundColor: 'gray' }} >
        <CssBaseline />
        <AdminHeader />

        <Box sx={{ display: 'flex' }}>
          {/* <Box style={{ height: "100vh", width: "200px", backgroundColor: 'red', flexGrow: 1 }} sx={{ flexGrow: 1 }}> */}
          <Box sx={{ width: '100%', maxWidth: 180, minHeight: '100vh', bgcolor: '#B1000E', position: 'sticky', color: 'white'}}>
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding component={Link} to="/approval">
                  <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                    <ListItemIcon>
                      <GppGoodIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Approvals" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                    <ListItemIcon>
                      <NoteAltIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Requests" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding component={Link} to="/approvedVendors">
                  <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                    <ListItemIcon>
                      <AssignmentTurnedInIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography type="body2" sx={{ textTransform: 'none' }}>Approved</Typography>}/>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding component={Link} to="/RejectedVendors">
                  <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                    <ListItemIcon>
                      <EventBusyIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Rejected" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
          <Box>
            <Container>
              <Accordion className='accordion1' sx={{ mt: 1 }}>
                <AccordionSummary
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography sx={{ width: '40%', flexShrink: 0, fontWeight: "bold" }}>Approvals</Typography>
                  <Typography sx={{ width: '36%', }}></Typography>
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
                  <ApprovalFields />
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
                  <ApprovalFields />
                </AccordionDetails>
              </Accordion>
            </Container>
          </Box>
        </Box>
      </Box>
      </ThemeProvider>
  )
}

export default AdminPage
