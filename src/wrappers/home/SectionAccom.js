import React , {useEffect , useState} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from "@mui/material/Box";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation } from 'swiper/modules';
import CardPromotion from '../../component/CardPromotion';
import endpoint from '../../api/endpoint';


const SectionAccom = () => {

    const sizetablet = useMediaQuery('(min-width:768px)');
    //const sizemobile = useMediaQuery('(max-width:899px)');
    const [listGallery , setListGallery] = useState([]);
    const [statusReq , setStatusReq] = useState(false);

    useEffect(() => {

        let callSuccess = true;

        const reqImgGallery = async () => {

                try {
                    const response = await endpoint.get("/imgmedia/all");
                    if(response.data.code === 1){
                        setListGallery(response.data.list);
                        setStatusReq(true);
                    }
                    
                } catch (err) {
                    console.error(err)
                }

        }

        if(callSuccess){
            reqImgGallery();
        }

         return () => {

            callSuccess = false;

        }



    },[])

    return (<Box
                sx={{
                display: 'flex',
                p:3,
                pt:5,
                pb:5,
                backgroundColor: '#f7f5ef',
                /*'&:hover': {
                    backgroundColor: '#f9f8f7',
                    opacity: [0.9, 0.8, 0.7],
                },*/
                
                }}
                >
                  
                        <Swiper
                            style={{
                                "--swiper-navigation-color": "#fdbe33",
                                "--swiper-pagination-color": "#fdbe33",
                             }}
                            slidesPerView={sizetablet ? 4 : 1}
                            spaceBetween={10}
                            navigation={true}
                            pagination={{
                            
                            clickable: true,
                            }}
                            modules={[Navigation]}
                            className="swiper"
                        >
                            {
                                statusReq && listGallery.length > 0 ? 

                                listGallery.slice(11,20).map((ele , keys) => {

                                    return  <SwiperSlide key={keys}><CardPromotion data={ele} /></SwiperSlide>

                                })

                                :null

                            }
                          
                        </Swiper>
                   
                 </Box>
            )

}

export default SectionAccom