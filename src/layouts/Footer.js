import React from 'react';
import { Link } from 'react-router-dom';
import {Container,Typography , Grid  , Stack , Box  , Divider} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CallIcon from '@mui/icons-material/Call';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { BsLine , BsFacebook } from "react-icons/bs";
import { FaTiktok , FaListUl , FaFileContract } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
import { AiFillHome , AiFillPicture } from "react-icons/ai";
import { BiHotel , BiMap , BiSolidContact } from "react-icons/bi";

const Footer = () => {

     const handleClk = (id) => {

        if(id === "ig"){
            
            window.open("https://www.instagram.com/tongnacottage/");
    
        }else if(id === "facebook"){
           
            window.open("https://www.facebook.com/tongnacottage");
        }
        else if(id === "line"){
            
            window.open("https://line.me/R/ti/p/@317avsyc");
        }
        else {
            window.open("https://www.tiktok.com/@tongnacottage");
        }
    }

    return (<>
            <footer>
            <Box sx={{backgroundColor:"#006F70", pt:7 , pb:7}}>
            <Container>
                    <Grid rowSpacing={4} alignItems="left" container sx={{color:"#fff"}}>
                                            <Grid item xs={12} md={4} lg={6}>
                                                <Stack spacing={2} sx={{p:2}}>
                                                    <Typography variant="h5" style={{color:"#D9D0BD"}}>
                                                        TONGNA COTTAGE NATURAL RESORT
                                                    </Typography>
                                                    <Typography paragraph sx={{fontSize:16}}> 
                                                     โต้งนา คอทเทจ เนเชอรัล รีสอร์ท ที่พักกลางทุ่งที่มาพร้อมกับคาเฟ่บรรยากาศชิลล์ในอำเภอหางดง โดดเด่นด้วยพื้นที่ขนาดใหญ่ และถูกโอบล้อมไปด้วยทุ่งนาสีเขียว ที่สูดอากาศธรรมชาติได้อย่างเต็มปอด
                                                    </Typography>
                                                </Stack>

                                                <Stack 
                                                    direction="row" 
                                                    spacing={2}
                                                    divider={<Divider orientation="vertical" flexItem />}
                                                    >
                                                            <IconButton size="large" onClick={() => handleClk("facebook")}>
                                                            <BsFacebook style={{color:"#D9D0BD"}}  />
                                                            </IconButton>
                                                            <IconButton size="large" onClick={() => handleClk("line")}>
                                                                <BsLine style={{color:"#D9D0BD"}} />  
                                                            </IconButton>
                                                            <IconButton size="large" onClick={() => handleClk("ig")}>
                                                                <ImInstagram style={{color:"#D9D0BD"}}  />
                                                            </IconButton>
                                                            <IconButton size="large" onClick={() => handleClk("tiktok")}>
                                                                <FaTiktok style={{color:"#D9D0BD"}}  />
                                                            </IconButton>

                                                </Stack>
                                            </Grid>
                                            
                                            <Grid item xs={12} md={4} lg={2} textAlign="left">
                                            
                                                 <Stack spacing={2} sx={{p:2}}>
                                                      <Typography variant='h5' sx={{color:"#d9d0bd"}}>MENU</Typography>
                                                      <Link to="/" style={{ textDecoration: 'none' , color:"#fff" }}><AiFillHome /><Typography variant='p' sx={{fontSize:16 , ml:0.5}}> Home</Typography></Link>
                                                      <Link to="/accommodation" style={{ textDecoration: 'none' , color:"#fff" }}><BiHotel/> <Typography variant='p' sx={{fontSize:16, ml:0.5}}> Accommodation</Typography></Link>
                                                      <Link to="/experience" style={{ textDecoration: 'none' , color:"#fff" }}><FaListUl /><Typography variant='p' sx={{fontSize:16, ml:0.5}}> Experience</Typography></Link>
                                                      <Link to="/Events" style={{ textDecoration: 'none' , color:"#fff" }}><FaFileContract /><Typography variant='p' sx={{fontSize:16, ml:0.5}}> Events</Typography></Link>
                                                      <Link to="/gallery" style={{ textDecoration: 'none' , color:"#fff" }}><AiFillPicture /><Typography variant='p' sx={{fontSize:16, ml:0.5}}> Gallery</Typography></Link>
                                                      <Link to="/location" style={{ textDecoration: 'none' , color:"#fff" }}><BiMap /><Typography variant='p' sx={{fontSize:16, ml:0.5}}> Location</Typography></Link>
                                                      <Link to="/contact" style={{ textDecoration: 'none' , color:"#fff" }}><BiSolidContact /><Typography variant='p' sx={{fontSize:16, ml:0.5}}> Contact</Typography></Link>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={4} lg={4}  textAlign="left">
                                            <Stack spacing={2} sx={{p:2}}>
                                            <Typography variant='h5' sx={{color:"#d9d0bd"}}>CONTACT</Typography>
                                                                <Stack spacing={2} direction="row">
                                                                    <AddLocationAltIcon sx={{ mr:0.5 , color:"#D9D0BD"}} />
                                                                    <Typography variant='p' sx={{fontSize:16}}> 200 หมู่6 ตำบล ขุนคง อำเภอหางดง  <br/>ตำบล ขุนคง หางดง จังหวัดเชียงใหม่</Typography>
                                                                </Stack>
                                                                <Stack spacing={2} direction="row">
                                                                    <CallIcon sx={{mr:0.5 , color:"#D9D0BD"}} />
                                                                    <Typography variant='p' sx={{fontSize:16}}>061 – 154 – 5053</Typography>
                                                                </Stack>
                                                                <Stack spacing={2} direction="row">
                                                                    <ForwardToInboxIcon sx={{mr:0.5 , color:"#D9D0BD"}} />
                                                                    <Typography variant='p' sx={{fontSize:16}}>reception.tongna@gmail.com</Typography>
                                                                </Stack>
                                            </Stack>
                                            </Grid>
                                           
                    </Grid>
                </Container>
            </Box>
        </footer>
        <footer style={{background:"#f7f5ef" , textAlign:"center"}}>
                <Typography variant="h6" sx={{p:1}}>Copy right Devphin 2023</Typography>
         </footer>
            </>)

}

export default Footer;