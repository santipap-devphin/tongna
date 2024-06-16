import React , {useEffect , useState} from 'react';
import {Box , Container} from "@mui/material";
import BoxExper from '../../component/BoxExper';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import endpoint from '../../api/endpoint';

const ExpMain = () =>{

const [listExper , setListExper] = useState([]);
const [statusReq , setStatusReq] = useState(false);
const Screensm = useMediaQuery('(max-width:768px)');

useEffect(() => {

     let callSuccess = true;

     const reqExper = async () => {

          try {
               const response  = await endpoint.get("/experience/content");
               if(response.data.code === 1){

                    setListExper(response.data.list)
                    setStatusReq(true)

               }
               
          } catch (err) {
          console.error(err) 
          }
     }

     if(callSuccess){
          reqExper();
     }


     return () => {

      callSuccess = false;
     }

},[])


return <>
            <Box
            sx={{
            display: 'flex',
            m:5
            }}
            >
               {/* Event mountenter ไม่ทำงานใน mobile version อาจแก้ปัญหาโดยการใช้ use mediaquery ในการเช้คว่าเป็น mobile version หรือเปล่า เพื่อแสดง  box ที่ต่างไป */}
                <Container sx={Screensm ? {p:0} : null}>
                        <Grid container spacing={2} sx={{p:"10px"}}>
                         
                         {
                             statusReq && listExper.length > 0 ?

                             listExper.map((ele , keys) => {
                               return   <Grid key={keys} item="true" xs={12} sm={6} md={4} lg={4} xl={4}>
                                             <BoxExper id={`panel${ele.experID}`} title={ele.experTitle} txtdes={ele.experHighlight} thumb={ele.experThumb} size={Screensm}/>
                                        </Grid>
                              })
                              :null
                         }
                        </Grid>
                        
                </Container>
            </Box>
          </>

}

export default ExpMain;
