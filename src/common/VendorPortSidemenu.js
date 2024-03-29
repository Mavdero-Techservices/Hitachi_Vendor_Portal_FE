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
import WindowIcon from '@mui/icons-material/Window';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import GradingIcon from '@mui/icons-material/Grading';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DescriptionIcon from '@mui/icons-material/Description';
export const VendorPortSidemenu = (props) => {
    const [open, setOpen] = useState(false);
    const sidemenuOpen = () => {
        setOpen(!open);
    };
    // useEffect(() => {
    //   setOpen(open);
    // },[open]);
    return (
        <>
        <Box sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none'}, maxWidth:60, minHeight: '100%', bgcolor: '#B1000E', color: 'white'  }}>
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
                    <ListItem disablePadding sx={{ color: 'white' }}>
                        <ListItemButton sx={{ }}>
                            <ListItemIcon>
                                <WindowIcon sx={{ color: 'white','&:hover': { backgroundColor: 'gray' }, borderRadius: '20px'  }} />
                            </ListItemIcon>
                            <ListItemText primary="Home" sx={{ mr: 2, display: 'none'  }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ color: 'white' }}>
                        <ListItemButton >
                            <ListItemIcon>
                                <ListAltIcon sx={{ color: 'white','&:hover': { backgroundColor: 'gray' }, borderRadius: '20px'  }}  />
                            </ListItemIcon>
                            <ListItemText primary="Purchase Order" sx={{ mr: 2, display: 'none'}} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ color: 'white' }}>
                        <ListItemButton >
                            <ListItemIcon>
                                <PendingActionsIcon sx={{ color: 'white','&:hover': { backgroundColor: 'gray' }, borderRadius: '20px'  }}  />
                            </ListItemIcon>
                            <ListItemText primary="Estimated Delivery Date" sx={{ mr: 2, display: 'none' }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ color: 'white' }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <GradingIcon sx={{ color: 'white','&:hover': { backgroundColor: 'gray' }, borderRadius: '20px'  }}  />
                            </ListItemIcon>
                            <ListItemText primary="Invoices" sx={{ mr: 2, display: 'none' }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding component={Link} to="/acStatement" sx={{ color: 'white' }}>
                        <ListItemButton >
                            <ListItemIcon>
                                <AccountBalanceIcon sx={{ color: 'white','&:hover': { backgroundColor: 'gray' }, borderRadius: '20px'  }}  />
                            </ListItemIcon>
                            <ListItemText primary="Account Statement" sx={{ mr: 2, display: 'none' }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding component={Link} to="/documents" sx={{ color: 'white' }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <DescriptionIcon sx={{ color: 'white','&:hover': { backgroundColor: 'gray' }, borderRadius: '20px'  }}  />
                            </ListItemIcon>
                            <ListItemText primary="Documents" sx={{ mr: 2, display: 'none' }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ color: 'white' }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <SignalCellularAltIcon sx={{ color: 'white','&:hover': { backgroundColor: 'gray' }, borderRadius: '20px'  }}  />
                            </ListItemIcon>
                            <ListItemText primary="Reports" sx={{ mr: 2, display: 'none' }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } ,width: '100%', ...(open && { width: '60px' }), maxWidth: 280, minHeight: '100vh', bgcolor: '#B1000E', color: 'white' }}>
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
                    <ListItem disablePadding sx={{ color: 'white' }}>
                        <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                            <ListItemIcon>
                                <WindowIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Home" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ color: 'white' }}>
                        <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                            <ListItemIcon>
                                <ListAltIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Purchase Order" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ color: 'white' }}>
                        <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                            <ListItemIcon>
                                <PendingActionsIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Estimated Delivery Date" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ color: 'white' }}>
                        <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                            <ListItemIcon>
                                <GradingIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Invoices" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding component={Link} to="/acStatement" sx={{ color: 'white' }}>
                        <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                            <ListItemIcon>
                                <AccountBalanceIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Account Statement" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding component={Link} to="/documents" sx={{ color: 'white' }}>
                        <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                            <ListItemIcon>
                                <DescriptionIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Documents" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ color: 'white' }}>
                        <ListItemButton sx={{ '&:hover': { backgroundColor: 'gray' }, borderRadius: '20px' }}>
                            <ListItemIcon>
                                <SignalCellularAltIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Reports" sx={{ mr: 2, ...(open && { display: 'none' }) }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box >
        </>
    )
}

export default VendorPortSidemenu
