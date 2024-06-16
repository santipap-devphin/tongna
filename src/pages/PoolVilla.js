import React , {useContext , useEffect, useState} from 'react';
import MetaTag from '../component/MetaTag';
import { useParams } from 'react-router-dom';
import Header from '../wrappers/navbar/Header';
import DataContext from '../context/DataContext';
import { ThemeProvider } from '@mui/material/styles';
import { Stack } from '@mui/material';
import Mainbreadcrumb from '../layouts/Mainbreadcrumb';
import PoolVil from '../wrappers/accommodation/PoolVil';
import endpoint from '../api/endpoint';
import Footer from '../layouts/Footer';

const PoolVilla = () => {
    const { theme  , urlServer } = useContext(DataContext);

    const {id , slug} = useParams();

    const [listData , setListData] = useState([]);

    const [listRoom , setListRoom] = useState([]);

    const [statusReq , setStatusReq] = useState(false);

    const paramID = id;

    useEffect(() => {

        let callSuccess = true;
      
      
        const reqRequestRoom = async () => {
      
          let imgList = [];
      
          try {
            const response = await endpoint.post("/roomcate/roomid/"+paramID);
            //console.log(response)
            if(response.data.code === 1){

                imgList.push({id:"1" , size:"806-537" , src: urlServer + response.data.list.imgthumb , thumb:urlServer+ response.data.list.imgthumb })
      
                  if(response.data.list.imglist.length > 0 ){
      
                    response.data.list.imglist.forEach((itm , key) => {
      
                      imgList.push({id:(key+2).toString() , size:"806-537" , src: urlServer+ itm , thumb:urlServer+ itm})
      
                    })
      
                  }
      
                  setListData(imgList);
                  setListRoom(response.data.list);
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
      
      
       },[paramID , urlServer])

    

    return (<>
                
                <ThemeProvider theme={theme}>
                        <MetaTag title={slug} />     
                        <Header />
                          <Stack>
                              <Mainbreadcrumb page={slug} />
                              {
                                  statusReq ?
                                  <PoolVil adults={listRoom.sizeadults} size={listRoom.sizeroom}  amenities={listRoom.amenities} facilities={listRoom.facilities}  roomdetail={listRoom.roomdetail} listImg={listData} />
                                  :null
                              }
                          </Stack>
                        <Footer />
                </ThemeProvider>
            </>);
}

export default PoolVilla