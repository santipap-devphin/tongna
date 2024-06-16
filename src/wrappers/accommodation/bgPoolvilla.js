import React, {useState , useEffect , useContext} from 'react';
import DataContext from '../../context/DataContext';
import { useParams } from 'react-router-dom';
import {Stack , Box , Typography ,Button  , Container , Divider , Chip } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import {FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PoolIcon from '@mui/icons-material/Pool';
import DeckIcon from '@mui/icons-material/Deck';
import { Gallery , Item} from 'react-photoswipe-gallery';
import GalleryImg from '../../component/GalleryImg';
import endpoint from '../../api/endpoint';


const PoolVil = () => {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [statusReq , setStatusReq] = useState(false);

  const {urlServer} = useContext(DataContext);

  const [items, setItems] = useState([]);

  const {id , slug} = useParams();

  const paramID = id;

  
  useEffect(() => {

  let callSuccess = true;


  const reqRequestRoom = async () => {

    let imgList = [];

    try {
      const response = await endpoint.post("/roomcate/roomid/"+paramID);

      if(response.data.code === 1){

            if(response.data.list.imglist.length > 0 ){

              response.data.list.imglist.forEach((itm , key) => {

                imgList.push({id:key+1 , size:"1024-1024" , src: urlServer+ itm , thumb:urlServer+ itm})

              })

            }

            setItems(imgList)
            setStatusReq(true)

      }

      console.log(response);
      
    } catch (err) {
        console.error(err)
    }


  }

  if(callSuccess){
    reqRequestRoom();
  }

  return () => {
    callSuccess = false;
  }


 },[paramID])

  
  return (
    <>
        <Box
            sx={{
            display: 'flex',
            
            }}
            >
               
                <Container>
                         <Grid container spacing={2} sx={{p:"20px"}}>
                                <Grid item="true" md={8}>
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
                                        className="mySwiper2"
                                    >
                                       
                                       
                                        { statusReq && items.length > 0 ?
                                                items.map((item , keys) => {

                                                return  <SwiperSlide key={keys}>
                                                          <GalleryImg originalImg={item.src} thumbnailImg={item.thumb} itemWidth={1152} itemHeight={768} />
                                                        </SwiperSlide>
                                                })
                                                :null
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
                                        className="mySwiper"
                                    >
                                         {
                                          statusReq && items.length > 0 ?
                                              items.map((item , keys) => {

                                                  return  <SwiperSlide key={keys}><img src={item.src} style={{width:"100%"}}/></SwiperSlide>
                                              })
                                          :null

                                         }
                                    </Swiper>

                                </Grid>
                                <Grid 
                                item="true" 
                                md={4}
                                >
                                <Stack
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        divider={<Divider orientation="vertical" flexItem />}
                                        spacing={6}
                                        sx={{background:"#fff",boxShadow: "0 0px 10px 0px rgb(0 0 0 / 10%)" , transformStyle: "preserve-3d" , p:2}}
                                        >
                                <Typography variant='p'>Adults : 4</Typography>
                                <Typography variant='p'>Size : 60m²</Typography>
                                </Stack>
                                <Stack spacing={2} 
                                sx={{background:"#F5F5F5",boxShadow: "0 0px 10px 0px rgb(0 0 0 / 10%)" , transformStyle: "preserve-3d" , p:2 , mt:1}}
                                >
                                     <Typography variant='h5'>AMENITIES</Typography>
                                     <Typography
                                        sx={{ display: 'flex', alignItems: 'center' , fontSize:16 }}
                                        color="text.primary"
                                     >  
                                    <WifiIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                        WIFI
                                    </Typography>
                                    <Typography
                                        sx={{ display: 'flex', alignItems: 'center' , fontSize:16 }}
                                        color="text.primary"
                                     >  
                                    <LocalParkingIcon sx={{ mr: 0.5 }} fontSize="inherit"  />
                                        ที่จอดรถ
                                    </Typography>
                                    <Typography
                                        sx={{ display: 'flex', alignItems: 'center' , fontSize:16 }}
                                        color="text.primary"
                                     >  
                                    <RestaurantIcon sx={{ mr: 0.5 }} fontSize="inherit"  />
                                     อาหารและเครื่องดื่ม
                                    </Typography>
                                    <Typography
                                        sx={{ display: 'flex', alignItems: 'center' , fontSize:16 }}
                                        color="text.primary"
                                     >  
                                    <PoolIcon sx={{ mr: 0.5 }} fontSize="inherit"  />
                                    สระว่ายน้ำส่วนตัว
                                    </Typography>
                                    <Typography
                                        sx={{ display: 'flex', alignItems: 'center' , fontSize:16 }}
                                        color="text.primary"
                                     >  
                                    <DeckIcon sx={{ mr: 0.5 }} fontSize="inherit"  />
                                    เก้าอี้อาบแดด
                                    </Typography>

                                    <Typography variant='h5'>VILLA FACILITIES</Typography>
                                    <Box
                                        sx={{ display: 'flex', alignItems: 'center' , fontSize:16 }}
                                        color="text.primary"
                                     >  
                                    
                                    <ul>
                                        <li>แชมพู</li>
                                        <li>ครีมนวด</li>
                                        <li>ครีมอาบน้ำ</li>
                                        <li>หมวกคลุมอาบน้ำ</li>
                                        <li>แปรงฟัน / ยาสีฟัน</li>
                                        <li>ผ้าขนหนู</li>
                                        <li>ไดร์เป่าผม</li>
                                        <li>สบู่ล้างมือ</li>
                                        <li>ชุดคลุมอาบน้ำ</li>
                                        <li>สลิปเปอร์</li>
                                        <li>เครื่องทำน้ำอุ่น</li>
                                        <li>ร่ม</li>
                                        <li>ตู้เซฟ</li>
                                        <li>ตู้เย็น</li>
                                        <li>ทีวี</li>
                                        <li>แอร์</li>
                                        <li>ตู้เก็บรองเท้า</li>
                                        <li>รองเท้าแตะ</li>
                                        <li>โคมไฟ</li>
                                        <li>กาน้ำร้อน</li>
                                        <li>แก้วน้ำ</li>
                                        <li>โต๊ะเครื่องแป้ง</li>
                                        <li>ชุดโต๊ะทานข้าว</li>
                                        <li>โซฟา</li>
                                        <li>ระเบียง</li>
                                        <li>โต๊ะรับประทานอาหาร</li>
                                    </ul>
                                    </Box>
                                  
                                </Stack>
                                <Stack spacing={2}>
                                    <Button variant="contained" color="warning" sx={{fontSize:20}}>จองห้องพักนี้</Button>
                                </Stack>
                                
                               
                               </Grid>
                              
                        </Grid>
                        
                </Container>
     </Box>
         
      
    </>
  )
}

export default PoolVil