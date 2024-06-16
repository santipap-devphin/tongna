import React, {useState } from 'react';
import {Stack , Box , Typography ,Button  , Container , Divider , Accordion , AccordionSummary , AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Swiper, SwiperSlide } from 'swiper/react';
import {FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import WifiIcon from '@mui/icons-material/Wifi';
import ChairIcon from '@mui/icons-material/Chair';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PoolIcon from '@mui/icons-material/Pool';
import DeckIcon from '@mui/icons-material/Deck';
import { Gallery} from 'react-photoswipe-gallery';
import GalleryImg from '../../component/GalleryImg';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import useMediaQuery from '@mui/material/useMediaQuery';



const PoolVil = ({adults  , size , amenities , facilities , roomdetail ,  listImg}) => {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const Screensm = useMediaQuery('(max-width:768px)');
  const Scalemini = useMediaQuery('(max-width:375px)');
  let heights = window.innerHeight;
 console.log(heights)
 /* const [heightDv , setHeightDv] = useState(0);
  const [totalDvH , setTotalDvH] = useState(0);
  const [loadS , setLoadS] = useState(false);*/
  //let grdHeight = 0;

  /*useEffect(() => {

    const gridHeight = document.getElementById("grdmain");
    let grdHeight = gridHeight.clientHeight;
    //alert(grdHeight)
    const dvHeight = document.getElementById("dvmain");
    let divHeight = dvHeight.offsetHeight;
    let totals = parseInt(grdHeight) - parseInt(divHeight);

   
    setHeightDv(totals)
    setTotalDvH(grdHeight - totals)
    setLoadS(true)

    //alert("total" + totals)

    console.log("grid " + grdHeight +" divHeight" +divHeight)
  },[])*/


 
  //alert(boxsheight )


   // alert(heights)

  const chkIcon  = (vals) => {

    let obj = {};

    if(vals === "ไวไฟ"){
        obj = <WifiIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
    }else if(vals === "ที่จอดรถ"){
        obj = <LocalParkingIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
    }
    else if(vals === "อาหารและเครื่องดื่ม"){
        obj = <RestaurantIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
    }
    else if(vals === "สระว่ายน้ำส่วนตัว"){
        obj = <PoolIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
    }
    else if(vals === "ห้องนั่งเล่น"){
        obj = <ChairIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
    }
    else if(vals === "เก้าอี้อาบแดด"){
        obj = <DeckIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
    }
    else{
        obj = <ContactSupportIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
    }
    return obj;

  }

  const goToUrl = () => {

        window.open("https://line.me/R/ti/p/@317avsyc")

  }
 return (<Box
            sx={{
            display: 'flex'
            }}
            >
                {/**หา วิธีจัดการกับรูป Swiper version show destop */}
                {
                  listImg.length > 0 ?

                  <Container>
                  <Grid container spacing={2} sx={{p:"20px"}} >
                         <Grid id="grdmain" item="true" sm={12} md={8} lg={8} xl={8}  sx={{height:Scalemini ? heights + 750 : null}}>
                         <Gallery>
                         <Swiper
                                 style={{
                                 '--swiper-navigation-color': '#fff',
                                 '--swiper-pagination-color': '#fff',
                                 }}
                                 loop={true}
                                 spaceBetween={10}
                                 navigation={true}
                                 thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                                 modules={[FreeMode, Navigation, Thumbs]}
                                 className={Screensm ? "mySwiperMainRoomMobile" : "mySwiper2"}
                             >
                                 {
                                         listImg.map((item , keys) => {

                                         return  <SwiperSlide key={item.id}>
                                                   <GalleryImg originalImg={item.src} thumbnailImg={item.thumb} itemWidth={1344} itemHeight={896} />{/** ขนาดรูประหว่าง Zoom */}
                                                 </SwiperSlide>
                                         })
                                        
                                 }
                               </Swiper>
                            </Gallery>
                            
                             <Swiper
                             
                                 onSwiper={setThumbsSwiper}
                                 loop={true}
                                 spaceBetween={10}
                                 slidesPerView={4}
                                 freeMode={true}
                                 watchSlidesProgress={true}
                                 modules={[FreeMode, Navigation, Thumbs]}
                                 className={Screensm ? "mySwiperRoomMobile" : "mySwiper"}
                             >
                                  {  listImg.map((item , keys) => {

                                           return  <SwiperSlide key={item.id}>
                                                        <img src={item.src} style={{width:"100%", height:Screensm ? "50px" : "150px"}} alt={"imgdata-" + keys}/>
                                                    </SwiperSlide>
                                       })
                                  }
                             </Swiper>
                          
                             <Grid item="true" sm={12} >
                                    <div id="dvmain" dangerouslySetInnerHTML={{ __html:roomdetail}}  />
                             </Grid>
                         </Grid>
                         <Grid 
                            item="true" 
                            sm={12}
                            md={4}
                            lg={4} 
                            xl={4}
                            sx={{display: { xs: 'none', md: 'block' }}}
                         >
                        
                         <Stack
                                 direction="row"
                                 justifyContent="center"
                                 alignItems="center"
                                 divider={<Divider orientation="vertical" flexItem />}
                                 spacing={6}
                                 sx={{background:"#fff",boxShadow: "0 0px 10px 0px rgb(0 0 0 / 10%)" , transformStyle: "preserve-3d" , p:2}}
                                 >
                         <Typography variant='p'>Adults : {adults}</Typography>
                         <Typography variant='p'>Size : {size} m²</Typography>
                         </Stack>
                         <Stack spacing={2} 
                         sx={{background:"#F5F5F5",boxShadow: "0 0px 10px 0px rgb(0 0 0 / 10%)" , transformStyle: "preserve-3d" , p:2 , mt:1}}
                         >
                              <Typography variant='h5'>AMENITIES</Typography>
                            
                            
                            {
                                amenities.length > 0 ?
                                amenities.map((itm , keys) => {

                                    return  <Typography key={keys}
                                                sx={{ display: 'flex', alignItems: 'center' , fontSize:16 }}
                                                color="text.primary"
                                            >  
                                               {
                                                    chkIcon(itm)
                                               }

                                               {itm}
                                            </Typography>

                                            })
                                            :null
                            }
                             <Typography variant='h5'>VILLA FACILITIES</Typography>
                             <Box
                                 sx={{ display: 'flex', alignItems: 'center' , fontSize:16 }}
                                 color="text.primary"
                              >  
                              <ul style={{marginTop:"0px"}}>
                              {
                                facilities.length > 0 ?

                                facilities.map((ele , keys) => {

                                    return  <li key={keys}>{ele}</li>

                                })
                                :null
                              }
                              </ul>
                             </Box>
                           
                         </Stack>
                         <Stack spacing={2}>
                             <Button variant="contained" color="warning" sx={{fontSize:20}} onClick={goToUrl}>จองห้องพักนี้</Button>
                         </Stack>
                        </Grid>
                 </Grid>
                 <Box 
                        className="footer-room"
                       sx={{display: { xs: 'block', md: 'none' }}}
                  >
                <Container>
                <Accordion sx={{mt:2 , mb:2}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{background:"#f7f5ef"}}
                            >
                            <Typography>AMENITIES</Typography>
                            </AccordionSummary>
                                 <AccordionDetails sx={{background:"#F5F5F5"}}>
                                        <Box>
                                        {
                                            amenities.length > 0 ?
                                            amenities.map((itm , keys) => {

                                                return  <Typography key={keys}
                                                            sx={{ display: 'flex', alignItems: 'center' , fontSize:16 }}
                                                            color="text.primary"
                                                        >  
                                                        {
                                                                chkIcon(itm)
                                                        }

                                                        {itm}
                                                        </Typography>

                                                        })
                                                        :null
                                        }
                                        </Box>
                                 </AccordionDetails>
                         </Accordion>
                         <Accordion sx={{mt:2 , mb:2}}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                sx={{background:"#f7f5ef"}}
                                >
                                <Typography>VILLA FACILITIES</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{background:"#F5F5F5"}}>
                                <Box >
                                <ul style={{marginTop:"10px"}}>
                                    {
                                        facilities.length > 0 ?

                                        facilities.map((ele , keys) => {

                                            return  <li key={keys} style={{fontSize:16}}>{ele}</li>

                                        })
                                        :null
                                    }
                                 </ul>
                                </Box>
                                </AccordionDetails>
                         </Accordion>
                </Container>
                
                         </Box>
                    </Container>


                  :null
                }
         </Box>
   )
}

export default PoolVil