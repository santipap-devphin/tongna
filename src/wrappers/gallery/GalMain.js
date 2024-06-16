import React , {useEffect, useState} from 'react';
import {Box  , Container  , ImageList , ImageListItem} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { Gallery} from 'react-photoswipe-gallery'
import GalleryImg from '../../component/GalleryImg';
import endpoint from '../../api/endpoint';

const GalMain = () => {

    const [statusRecall , setStatusRecall] = useState(false);
    const [items, setItems] = useState([]);

    useEffect ( () => {

      if(statusRecall)
      
      setStatusRecall(false)
   
     },[statusRecall])

     useEffect(() => {

      let callsuccess = true;
      const reqGallery = async () => {

        try {
          const response = await endpoint.get("/imgmedia/all");
          let newObj = [];
          if(response.data.code ===1){

            response.data.list.forEach((ele) => {

              newObj.push({id:ele.imgid ,title:ele.des, size:ele.size.width+"-"+ele.size.height , src:ele.src , thumb:ele.src ,alt:ele.alt})

            })

            setItems(newObj);

          }
          console.log(response)

          
        } catch (err) {
            console.error(err)
        }

      }

      if(callsuccess){
        reqGallery();
      }

      return () => {
        callsuccess = false;
      }


     },[])

 return (<>
            <Box
            sx={{
            display: 'flex',
            m:2,
            }}
            >
              <Container>

                  <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 2, md: 3 }}>
                      <Gallery>
                          <Grid item="true" md={12} sx={{display: { xs: 'none', md: 'flex' }}}>
                          <ImageList variant="masonry" cols={3} gap={8}>
                          {
                                items.slice(0,55).map((item , keys) => {
                                  let sp = item.size.split("-")

                                  return  <ImageListItem key={keys}><GalleryImg originalImg={item.src} thumbnailImg={item.thumb} itemWidth={parseInt(sp[0])} itemHeight={parseInt(sp[1])} /></ImageListItem>
                                          
                                })
                          }
                           </ImageList>
                          </Grid>
                      </Gallery>
                 </Grid>
                 <Grid container sx={{display: { xs: 'flex', md: 'none' }}}>
                        <Gallery>
                        {
                                items.slice(0,55).map((item , keys) => {
                                  let sp = item.size.split("-")

                                  return  <Grid key={keys} item="true" md={12}><GalleryImg originalImg={item.src} thumbnailImg={item.thumb} itemWidth={parseInt(sp[0])} itemHeight={parseInt(sp[1])} /></Grid>
                                          
                                })
                          }
                        </Gallery>
                  </Grid>
              </Container>
            </Box>
         </>)
}

export default GalMain