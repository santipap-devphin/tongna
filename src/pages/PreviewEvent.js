import React , {useContext , useState} from 'react';
import MetaTag from '../component/MetaTag';
import { useParams } from 'react-router-dom';
import Header from '../wrappers/navbar/Header';
import DataContext from '../context/DataContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import {FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Gallery} from 'react-photoswipe-gallery';
import GalleryImg from '../component/GalleryImg';
import { ThemeProvider } from '@mui/material/styles';
import { Stack  , Box  , Container , Grid} from '@mui/material';
import Mainbreadcrumb from '../layouts/Mainbreadcrumb';
import Footer from '../layouts/Footer';


const PreviewEvent = () =>  {

    const { theme , urlServer } = useContext(DataContext);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const {slug} = useParams();
    let previews = JSON.parse(localStorage.getItem(slug));
    let imglist = JSON.parse(localStorage.getItem("imglist-"+slug));

    return (<ThemeProvider theme={theme}>
                <MetaTag title={slug} />     
                <Header />
                <Stack>
                    <Mainbreadcrumb page={slug}  />
                    <Box
                    sx={{
                    display: 'flex',
                    m:5
                    }}
                    >
                    <Container>
                            <Grid container spacing={2} sx={{p:"10px" ,boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , borderRadius: "10px"}}>

                                <Grid item={true} xs={12} sx={{p:0.5}}>
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
                                                className="mySwiperEvents"
                                            >
                                                {
                                                        imglist.map((item , keys) => {

                                                        return  <SwiperSlide key={keys}>
                                                                        <GalleryImg originalImg={item.filebase64 === "" ? urlServer + item.fileimg : item.filebase64 } thumbnailImg={item.filebase64 === "" ? urlServer + item.fileimg : item.filebase64 } itemWidth={900} itemHeight={600} />{/** ขนาดรูประหว่าง Zoom */}
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
                                            className="mySwiper"
                                        >
                                            {  imglist.map((item , keys) => {

                                                    return  <SwiperSlide key={keys}><img src={item.filebase64 === "" ? urlServer + item.fileimg : item.filebase64} style={{width:"100%"}} alt={"imgdata " + keys}/></SwiperSlide>
                                                })
                                            }
                                        </Swiper>
                                </Grid>
                                <Grid item={true} xs={12} sm={12} md={12} lg={12} xl={12} sx={{maxWidth:"100%" , mt:15}}>
                                     <div dangerouslySetInnerHTML={{ __html:previews}} />
                                </Grid>
                             </Grid>
                    </Container>
                    </Box>
                </Stack>
                <Footer />
        </ThemeProvider>
  )
}

export default PreviewEvent