import React, { useEffect, useState } from "react";
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
import YardIcon from '@mui/icons-material/Yard';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { selectUnstyledClasses } from '@mui/base';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});


export const Banner = (props) => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setIsLoggedIn(sessionStorage.getItem("username") !== null);
    console.log(isLoggedIn);
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogout = () => {
    console.log("logged out");
    //sessionStorage.setItem('token', "undefined");
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    setIsLoggedIn(false);
    navigate('/'); //will take home but logged out
  }

  useEffect(() => {
    const temp = sessionStorage.getItem('token');
    if (temp !== "undefined" || temp !== null) {
      setIsLoggedIn(true);
    }
  }, [sessionStorage.getItem('token')]);

  const handleProfile = () => {
    if (sessionStorage.getItem("username") !== null) {
      sessionStorage.setItem('currentUser', sessionStorage.getItem('userName'))
      navigate('/profile');
    }
    else {
      alert("Please login to view your profile")
    }
  }

  return (
    <AppBar position="static" sx={{ color: 'white', backgroundColor: '#43a047' }}> {/* This is logo*/}
      <Container maxWidth="x1" >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Flora&nbsp;
            <YardIcon fontSize='large' margin-left='25%' />

          </Typography>




          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                display: { xs: 'block', md: 'none' },
              }}
            >

              <MenuItem>
                <Typography textAlign="center"></Typography>
                <Button
                  href="/"
                  sx={{ color: 'black' }}
                >
                  Home
                </Button>
                <Button
                  href="/weather"
                  sx={{ color: 'black' }}
                >
                  Weather
                </Button>
                <Button
                  onClick={() => handleProfile()}
                  sx={{ color: 'black' }}
                >
                  Profile
                </Button>
              </MenuItem>

            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Flora&nbsp;
            <YardIcon fontSize='large' margin-left='25%' />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Button
              sx={{ my: 2, color: 'white', display: 'block' }}
              href='/'
            >
              Home
            </Button>
            <Button
              sx={{ my: 2, color: 'white', display: 'block' }}
              href='/weather'
            >
              Weather
            </Button>
            <Button
              onClick={() => handleProfile()}
              sx={{ color: 'white' }}
            >
              Profile
            </Button>

          </Box>


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="plant1.jpg" />
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
              {isLoggedIn ? (
                <MenuItem>
                  <Button
                    onClick={() => onLogout()}
                    sx={{ color: 'black' }}
                  >
                    Logout
                  </Button>
                </MenuItem>) : (
                <MenuItem>
                  <Button
                    href="/login"
                    sx={{ color: 'black' }}
                  >
                    Login
                  </Button>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );











};
