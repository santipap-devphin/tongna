import React  ,{useState} from 'react';
import { Stack , Box  } from '@mui/material';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import CategoryIcon from '@mui/icons-material/Category';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import GradingIcon from '@mui/icons-material/Grading';
import EventNoteIcon from '@mui/icons-material/EventNote';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import CollectionsIcon from '@mui/icons-material/Collections';
import LanguageIcon from '@mui/icons-material/Language';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const DeskTopDahBoard = () => {

const [open, setOpen] = useState(true);

const pathname = window.location.pathname;




 const handleClick = () => {
    setOpen(!open);
 };

 return (<Box sx={{ width: '100%'
            , height:parseInt(window.screen.availHeight) -150
            , maxWidth: 120 
            , bgcolor: 'background.paper' 
            , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" 
            , transformStyle: "preserve-3d" 
            , position:"fixed"
            , mt:6.5
            , overflow:"auto"
            ,'&::-webkit-scrollbar': {
                width: '0.3em'
                },
                '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                },
                '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                outline: '0px solid slategrey'
                }
            }}
            >
            <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            >
                
            {/*<ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/" ? "#FBF1d5" : "#ffffff"}}>
                <Stack spacing={1} textAlign="center">
                    <Link to={"/backend/"} style={{textDecoration: "none" , color:"#000"}}>
                        <ListItemIcon sx={{justifyContent:"center"}}>
                            <DashboardIcon  />
                        </ListItemIcon>
                        <ListItemText primary="DashBoard" />
                    </Link>
                </Stack>
                
        </ListItemButton>*/}
            <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/room" || pathname === "/backend/" ? "#FBF1d5" : "#ffffff"}}>
                <Stack spacing={1} textAlign="center">
                    <Link to={"/backend/room"} style={{textDecoration: "none" , color:"#000"}}>
                        <ListItemIcon sx={{justifyContent:"center"}}>
                            <RoomPreferencesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Room" />
                    </Link>
                </Stack>
            </ListItemButton>
            <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/experience" ? "#FBF1d5" : "#ffffff"}}>
                <Stack spacing={1} textAlign="center">
                    <Link to={"/backend/experience"} style={{textDecoration: "none" , color:"#000"}}>
                        <ListItemIcon sx={{justifyContent:"center"}}>
                            <GradingIcon />
                        </ListItemIcon>
                        <ListItemText primary="Experience" />
                    </Link>
                </Stack>
            </ListItemButton>
            <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/gallery" ? "#FBF1d5" : "#ffffff"}}>
                <Stack spacing={1} textAlign="center">
                    <Link to={"/backend/gallery"} style={{textDecoration: "none" , color:"#000"}}>
                        <ListItemIcon sx={{justifyContent:"center"}}>
                            <CollectionsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gallery" />
                    </Link>
                </Stack>
            </ListItemButton>
            <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/events" ? "#FBF1d5" : "#ffffff"}}>
                <Stack spacing={1} textAlign="center">
                    <Link to={"/backend/events"} style={{textDecoration: "none" , color:"#000"}}>
                        <ListItemIcon sx={{justifyContent:"center"}}>
                            <EventNoteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Events" />
                    </Link>
                </Stack>
            </ListItemButton>
            <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/promotion" ? "#FBF1d5" : "#ffffff"}}>
                <Stack spacing={1} textAlign="center">
                    <Link to={"/backend/promotion"} style={{textDecoration: "none" , color:"#000"}}>
                        <ListItemIcon sx={{justifyContent:"center"}}>
                            <CardMembershipIcon />
                        </ListItemIcon>
                        <ListItemText primary="Promotion" />
                    </Link>
                </Stack>
            </ListItemButton>
            <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/contact" ? "#FBF1d5" : "#ffffff"}}>
                <Stack spacing={1} textAlign="center">
                    <Link to={"/backend/contact"} style={{textDecoration: "none" , color:"#000"}}>
                        <ListItemIcon sx={{justifyContent:"center"}}>
                            <ContactSupportIcon />
                        </ListItemIcon>
                        <ListItemText primary="ContactMsg" />
                    </Link>
                </Stack>
            </ListItemButton>
         
         
            <ListItemButton onClick={handleClick} sx={{justifyContent:"center"}}>
                <Stack spacing={1} textAlign="center" alignItems="center">
                    <ListItemIcon sx={{justifyContent:"center"}}>
                            <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Setting" />
                    {open ? <ExpandLess  /> : <ExpandMore />}
                </Stack>
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/category" ? "#FBF1d5" : "#ffffff"}}>
                        <Stack spacing={1} textAlign="center">
                            <Link to={"/backend/category"} style={{textDecoration: "none" , color:"#000"}}>
                                <ListItemIcon sx={{justifyContent:"center"}}>
                                    <CategoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Category" />
                            </Link>
                        </Stack>
                    </ListItemButton>
                    
                    <ListItemButton sx={{justifyContent:"center" , backgroundColor:pathname === "/backend/web" ? "#FBF1d5" : "#ffffff"}}>
                        <Stack spacing={1} textAlign="center">
                            <Link to={"/backend/web"} style={{textDecoration: "none" , color:"#000"}}>
                                <ListItemIcon sx={{justifyContent:"center"}}>
                                    <LanguageIcon />
                                </ListItemIcon>
                                <ListItemText primary="Web" />
                            </Link>
                        </Stack>
                    </ListItemButton>
                    </List>
            </Collapse>
            </List>
            </Box>
  )
}

export default DeskTopDahBoard