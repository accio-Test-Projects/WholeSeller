import * as React from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';
import { cartContext } from '../../coxtext/cartContext';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function TopBar({data}) {
  const [cartState, dispatch] = React.useContext(cartContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
const navigate=useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }
  const redirect=(page)=>{
    navigate(`category/${page}`)
    setAnchorElNav(null);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
      <Toolbar>
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
              {data.map((cat) => (
                <MenuItem key={cat.value} onClick={()=>redirect(cat.value)}>
                  <Typography textAlign="center">{cat.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 5 }}>
            WholeSaler
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="cart">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0,background:'#fff',padding:'20px' }}>
              <Badge badgeContent={cartState&&cartState.length} color="primary">
                <ShoppingCartOutlinedIcon  />
              </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
        <Toolbar
       sx={{
        display: { xs: 'none', md: 'flex' },
       }}
        disableGutters>
      
          
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex',justifyContent:'space-around' } }}>
            {data.map((cat) => (
              <Button
                key={cat.value}
                onClick={()=>redirect(cat.value)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {cat.label}
              </Button>
            ))}
          </Box>

      
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopBar