import React , { useState , useContext} from 'react';
import DataContext from '../../context/DataContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import {FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Gallery} from 'react-photoswipe-gallery';
import GalleryImg from '../../component/GalleryImg';
import { Stack, Typography , Chip , Grid , Divider , IconButton , Button} from '@mui/material';
import {Link ,useNavigate} from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { BsLine  } from "react-icons/bs";
import SweetAlert2 from 'react-sweetalert2';


function ActRightDetail({id , cate , title , des , imglist , log  , tags , reload}) {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  let navigate = useNavigate();
  const {urlServer , convertDate} = useContext(DataContext);
  const [swalProps, setSwalProps] = useState({
    show: false,
    title: '',
    html: '',
    icon: 'warning',
    showCancelButton: true,
    showConfirmButton: false,
    confirmButtonText:"OK",
    cancelButtonText:"Cancel"
});

  let listid =  JSON.parse(localStorage.getItem("EventIDall"));

  const msgAlert = (mes , icons , types) => {

    if(types === "error"){

        setSwalProps({...swalProps , show:true , icon:icons , title:"ข้อความจากระบบ" , html:mes})
        setTimeout(function(){setSwalProps({...swalProps , show:false , icon:"", title:"" , showConfirmButton:false}) }, 3000);
    }
    else if(types === "success"){

        setSwalProps({...swalProps , show:true , icon:icons , title:"ข้อความจากระบบ" , html:mes})
        setTimeout(function(){setSwalProps({...swalProps , show:false , icon:"", title:"" , showConfirmButton:false}) }, 3000);
    }else{

        setTimeout(function(){setSwalProps({...swalProps , show:false , icon:"", title:"" , html:"", cancelButtonText:"ปิด" , showConfirmButton:false}) }, 500);

    }
 }

  const nextPost = (id , listID) => {

     listID.forEach((data , index) => {

        if(data.id === id){

            navigate(`/events/${listID[index+1].title}/${listID[index+1].id}`);
            reload(true);

         }
     })

 }
 const prvPost = (id , listID) => {

    listID.forEach((data , index) => {

        if(data.id === id){

            navigate(`/events/${listID[index-1].title}/${listID[index-1].id}`);
            reload(true);

         }
     })
  }

  const clkCopy = () => {

    navigator.clipboard.writeText(window.location.href);
    msgAlert("<p>คัดลอก URL </p><p>"+window.location.href +"</p>" , "success" , "success")

  }

return (<Stack spacing={1} sx={{boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d" , p:2.5 , color:"#000"}}>
               <SweetAlert2 
                    {...swalProps}
                    didClose={() => {
                        // run when swal is closed...
                        setSwalProps({...swalProps , show:false })
                    }}
                    onConfirm={result =>  {
                        // run when clieked in confirm and promise is resolved...
                        if(result.isConfirmed){

                           
                        }
                    }}
   		        />
                <Typography variant='h5'>{title}</Typography>
                <Grid container>
                    <Grid item={true} xs={12}>

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
                                                            <GalleryImg originalImg={urlServer+ item} thumbnailImg={urlServer +item} itemWidth={900} itemHeight={600} />{/** ขนาดรูประหว่าง Zoom */}
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
                             className="mySwiperevent"
                         >
                              {  imglist.map((item , keys) => {

                                       return  <SwiperSlide key={keys}><img src={urlServer+item} style={{width:"100%"}} alt={"imgdata " + keys}/></SwiperSlide>
                                   })
                              }
                        </Swiper>
                        
                    </Grid>
                </Grid>
                <Grid container sx={{pt:16}}>
                    <Grid item={true} xs={12}>
                        <div id="editorblog" dangerouslySetInnerHTML={{__html:JSON.parse(des)}}></div>
                    </Grid>
                </Grid>
                 <Stack direction="row">
                    <Typography sx={{fontSize:18 ,pr:1}}>หมวดหมู่</Typography>
                    <Chip label={cate} color="default" />
                </Stack>
              
                <Grid container sx={{pt:1,pb:1}}>
                    <Grid item xs={6}>
                        <Stack 
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <Typography sx={{fontSize:18 ,pr:1}}>แท๊ก </Typography>
                            {
                                tags.length > 0 ?

                                tags.map((ele , i) => {

                                    return  <Link key={i} to={"/tags"} style={{ textDecoration: 'none' , color:"#000" , fontSize:18 , margin:2}}><Chip label={ele} color="info" /></Link> 

                                })
                                :null

                            }
                           
                        </Stack>
                        
                   </Grid>
                    <Grid item xs={6} textAlign="right">
                    <Typography variant='p' sx={{fontSize:18}}> <span style={{paddingTop:"10px"}}>Share</span> : </Typography>
                    <IconButton aria-label="facebook" onClick={clkCopy}>
                        <FacebookIcon sx={{color:"#3b5998"}} />
                    </IconButton>
                    <IconButton aria-label="twiter" onClick={clkCopy}>
                        <BsLine style={{color:"#287704"}} />
                    </IconButton>
                    <IconButton aria-label="twiter" onClick={clkCopy}>
                        <InstagramIcon sx={{color:"#c32aa3"}} />
                    </IconButton>
                    </Grid>
                </Grid>
                <Stack>
                    <Typography variant='p'>วันที่ โพสต์ {convertDate(log)}</Typography>
                </Stack>
                <Divider  />
                
                
                
                <Grid container sx={{pt:1 , pb:1}}>
                    <Grid item xs={6}>
                        
                        {
                            listid[0].id !== id ?  
                            <Button onClick={() => prvPost(id , listid)}>Prev Post </Button> 
                            : null

                        }
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                        {
                            listid[listid.length-1].id !== id
                            ? <Button onClick={()=>nextPost(id , listid)}>Next Post</Button> 
                            : null
                        }
                    </Grid>
                </Grid>
                
                
                <Divider  />
            </Stack>
  )
}

export default ActRightDetail