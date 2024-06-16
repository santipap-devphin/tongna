import React ,{useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
const Header = () => {

    const pages = ['Home','accommodation', 'experience','events' , 'gallery' ,'location', 'contact'];
    const pathname = window.location.pathname;
    let spPathname = pathname.split("/");
    console.log(spPathname.length)
    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {

            setAnchorElNav(event.currentTarget);
            console.log(event.currentTarget)
    };
    const handleCloseNavMenu = () => {
            setAnchorElNav(null);
    };

   return (<>
             <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                  
                    <Box sx={{background:spPathname[1] === "" ?  "#F4F4F4" :"#d9d0bd" , p:0.5 , ml:-3 , display: { xs: 'none', md: 'flex' } , position:"relative"}}>
                            <img src="../../image/tongna-logo-header.png" alt="รูป logo tongna" />
                    </Box>
                    <Box sx={{background:"#F4F4F4" , p:0.5 , ml:-3 , display: { xs: 'flex', md: 'none' }}}>
                            <img src="../../image/tongna-logo-header.png" alt="รูป logo tongna" />
                    </Box>

                    <Box sx={{ flexGrow: 1 , display: { xs: 'flex', md: 'none' } }} justifyContent="flex-end" alignItems="center">
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
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                   
                   

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} justifyContent="center">
                                {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white'}}
                                >
                            
                                  <Link to={`/${page !== "Home" ? page : ""}`} style={{textDecoration: "none" , color:spPathname[1] === page ? "#D9D0BD" :"#fff"  ,fontSize:16}}>{page}					</Link>
                                 </Button>
                                ))}
                    </Box>
                    

                    <Box sx={{ flexGrow: 0 , display: { xs: 'none', md: 'block' }   }}>
                       <Link to={"https://line.me/R/ti/p/@317avsyc"}>
                            <Button variant="contained" size="medium" color="warning">จองห้องพัก</Button>
                       </Link>
                    </Box>
                    </Toolbar>
                </Container>
                </AppBar>
               
            </>)


}

export default Header;