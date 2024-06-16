import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Stack , Box , Typography ,Button  , Container } from "@mui/material";
import CardRoom from '../../component/CardRoom';
import Grid from '@mui/material/Unstable_Grid2'; 

const SectionRoom = ({titletxt , loads , rooms}) => {

    let navicate = useNavigate();
    const haddleClk  = () => {

        navicate("/accommodation");

    }

    return (<Box
        sx={{
        display: 'flex',
        background:"#f9f8f7"
        }}
        >
         <Container>
                    <Grid container spacing={2} sx={{pt:"20px" ,pb:"20px"}}>
                        <Grid item="true" md={8}>
                            <Stack>
                               
                                <Typography variant='h4' sx={{color:"#049899"}}>Accommodation</Typography>
                                {
                                    loads ?
                                        <div style={{fontSize:18 }} dangerouslySetInnerHTML={{ __html:JSON.parse(titletxt.webConTh)}} />
                                    :null
                                }
                             </Stack>      
                        </Grid>
                        <Grid item="true" md={4}>
                             <Button variant="outlined" sx={{fontSize:"18px" , float:"right"}} onClick={haddleClk}>รายละเอียดเพิ่มเติม</Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{pt:"20px" ,pb:"60px"}}>

                                {
                                    loads && rooms.length > 0 ?
                                    rooms.map((ele , keys) => {

                                        return <Grid key={keys} item="true" md={4}>
                                                    <CardRoom id={ele.id} title={ele.roomname} roomen={ele.roomnameen} rec={ele.roomrecommend} adults={ele.sizeadults} sizeroom={ele.sizeroom} thumb={ele.imgthumb}  />
                                                </Grid>

                                    })
                                    :null
                                }
                          
                    </Grid>
                    
                 </Container>  
            </Box>)

}

export default SectionRoom;