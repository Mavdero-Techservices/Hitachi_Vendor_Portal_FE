import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

export const SideBar = (props) => {
  const [open, setOpen] = useState(false);
  const sidemenuOpen = () => {
    setOpen(!open);
  };

  // useEffect(() => {
  //   setOpen(open);
  // },[open]);
  return (
    <Box sx={{ width: '100%', ...(open && { width: '60px' }), maxWidth: 180, minHeight: '100vh', bgcolor: '#B1000E', color: 'white' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={sidemenuOpen}
            sx={{ ml: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </List>
        {props.japan === 'JapanTeam' ? <>
          <List>
            <ListItem disablePadding component={Link} to="/japanTeam" sx={{ color: 'white' }}>
              <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                <ListItemIcon>
                  <GppGoodIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Approvals" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding component={Link} to="/japanapprovedVendors" sx={{ color: 'white' }}>
              <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                <ListItemIcon>
                  <AssignmentTurnedInIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Approved" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding component={Link} to="/japanrejectedVendors" sx={{ color: 'white' }}>
              <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                <ListItemIcon>
                  <EventBusyIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Rejected" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
              </ListItemButton>
            </ListItem>
          </List>
        </> : props.MRT === 'MRTteam' ? <>
          <List>
            <ListItem disablePadding component={Link} to="/MRTteam" sx={{ color: 'white' }}>
              <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                <ListItemIcon>
                  <GppGoodIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Approvals" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                <ListItemIcon>
                  <NoteAltIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Requests" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding component={Link} to="/MRTapprovedvendors" sx={{ color: 'white' }}>
              <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                <ListItemIcon>
                  <AssignmentTurnedInIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Approved" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding component={Link} to="/MRTrejectedvendors" sx={{ color: 'white' }}>
              <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                <ListItemIcon>
                  <EventBusyIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Rejected" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
              </ListItemButton>
            </ListItem>
          </List>
        </> : <>
          <List>
            <ListItem disablePadding component={Link} to="/approval" sx={{ color: 'white' }}>
              <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                <ListItemIcon>
                  <GppGoodIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Approvals" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding component={Link} to="/approvalReq" sx={{ color: 'white' }}>
              <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                <ListItemIcon>
                  <NoteAltIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Requests" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding component={Link} to="/approvedVendors" sx={{ color: 'white' }}>
              <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                <ListItemIcon>
                  <AssignmentTurnedInIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Approved" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding component={Link} to="/RejectedVendors" sx={{ color: 'white' }}>
              <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                <ListItemIcon>
                  <EventBusyIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Rejected" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
              </ListItemButton>
            </ListItem>
          </List>
        </>}
      </nav>
    </Box>
  )
}

export default SideBar
