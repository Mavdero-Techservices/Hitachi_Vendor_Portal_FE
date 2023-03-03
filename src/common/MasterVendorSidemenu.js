import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AppRegistrationSharpIcon from '@mui/icons-material/AppRegistrationSharp';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import GradingIcon from '@mui/icons-material/Grading';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DescriptionIcon from '@mui/icons-material/Description';
export const MasterVendorSidemenu = (props) => {
    const [open, setOpen] = useState(false);
    const sidemenuOpen = () => {
        setOpen(!open);
    };
    // useEffect(() => {
    //   setOpen(open);
    // },[open]);
    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' }, maxWidth: 60, minHeight: '100%', bgcolor: '#B1000E', color: 'white' }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={sidemenuOpen}
                            sx={{ ml: 1 }}
                        >
                            {/* <MenuIcon /> */}
                        </IconButton>
                    </List>
                    <List>
                        <ListItem disablePadding sx={{ color: 'white' }} component={Link} to="/userCreation">
                            <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                                <ListItemIcon>
                                    <PersonAddAltRoundedIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="User Creation" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ color: 'white' }} component={Link} to="/UserAccess">
                            <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                                <ListItemIcon>
                                    <VerifiedUserIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="User Access" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding component={Link} to="/" sx={{ color: 'white' }}>
                            <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                                <ListItemIcon>
                                    <PostAddIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="New Registration" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ color: 'white' }}>
                            <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                                <ListItemIcon>
                                    <AppRegistrationSharpIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Master Data" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, width: '100%', ...(open && { width: '60px' }), maxWidth: 280, minHeight: '100vh', bgcolor: '#B1000E', color: 'white' }}>
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
                    <List>
                        <ListItem disablePadding sx={{ color: 'white' }} component={Link} to="/userCreation">
                            <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                                <ListItemIcon>
                                    <PersonAddAltRoundedIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="User Creation" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ color: 'white' }} component={Link} to="/UserAccess">
                            <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                                <ListItemIcon>
                                    <VerifiedUserIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="User Access" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding component={Link} to="/" sx={{ color: 'white' }}>
                            <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                                <ListItemIcon>
                                    <PostAddIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="New Registration" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ color: 'white' }}>
                            <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                                <ListItemIcon>
                                    <AppRegistrationSharpIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Master Data" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Box >
        </>
    )
}

export default MasterVendorSidemenu
