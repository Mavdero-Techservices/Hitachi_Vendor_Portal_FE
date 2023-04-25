import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Logo1 from '../img/logo1.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import apiService from '../services/api.service';
const pages = ['Home', 'Admin', 'Master'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
function VendorPortalHeader(props) {
  const vcode = props.vCode;
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [vendoCode, setvendoCode] = useState();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const darkTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#FFFFFF',
      },
    },
  });

  // console.log("vendoCode---------------->>>>",vendoCode)
  useEffect(() => {
    apiService.getErpResourcePortalVendorlist().then((res) => {
      console.log("getErpResourcePortalVendorlist---------------->>>>",res.data.value)
      setvendoCode(res.data.value)
    })

    apiService.getErpVendor_API().then((res) => {
      console.log("getErpVendor_API---------------->>>>",res.data.value)
    })
    let arr=[]
    apiService.getErpVendor_API().then((res) => {
    

      for(let i=0;i<res.data.value.length;i++){
        if(res.data.value[i].Parent_Vendor_Code === 'DKM-006'){
          console.log("arr------------------>>>>>", res.data.value[i])
        arr.push(res.data.value[i])
        }
      }
      if(arr.length>0){
        console.log("arr------------------>>>>>", arr)
      }
    })
  
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                my: 2,
                display: { xs: 'none', sm: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img className="img1" src={Logo1} alt="" />
            </Typography>
            <Button
              style={{ textTransform: 'capitalize' }}
              sx={{
                mx: 4,
                mt: 1,
                color: '#B1000E',
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              <h5>
                {' '}
                <b>Vendor Portal</b>
              </h5>
            </Button>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" sx={{ color: '#B1000E' }}>
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', sm: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                my: 2,
              }}
            >
              <img className="img1" src={Logo1} alt="" />
            </Typography>

            <Box
              display="flex"
              justifyContent="flex-end"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', my: 2 } }}
            >
              <Button
                style={{ textTransform: 'capitalize' }}
                onClick={handleOpenUserMenu}
                sx={{
                  mr: 2,
                  color: 'black',
                  fontWeight: '700',
                  display: 'block',
                }}
              >
                {vcode ? vcode : "City vendor code"}
              </Button>
              <Tooltip title="Mail">
                <IconButton onClick={handleOpenUserMenu}>
                  <MailIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Notifications">
                <IconButton>
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >

                {vendoCode?.map((setting, key) => (
                  <MenuItem key={key} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.Vendor_No}_{setting.City}_{setting.Post_Code}</Typography>
                  </MenuItem>
                ))}
                  {vendoCode?.map((setting, key) => (
                  <MenuItem key={key} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.Vendor_No}_{setting.City}_{setting.Post_Code}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default VendorPortalHeader;
