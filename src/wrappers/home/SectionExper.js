import React from 'react';
import {Stack , Box , Typography ,Button  , Container} from "@mui/material";
import BoxExper from '../../component/BoxExper';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2


const SectionExper = ({titleH , loads , hLight}) => {

    console.log(hLight)
    return (
        <Box
            sx={{
            display: 'flex',
            
            }}
            >
            <Container>
                        <Grid container spacing={2} sx={{pt:"20px" ,pb:"20px"}}>
                            <Grid item="true" md={8}>
                                <Stack>
                                    <Typography variant='h4' sx={{color:"#049899"}}>Hightlight Event</Typography>
                                   
                                    {
                                        loads ? <div style={{fontSize:18}} dangerouslySetInnerHTML={{ __html:JSON.parse(titleH.webConTh)}} /> : null

                                    }
                                    
                                </Stack>      
                            </Grid>
                            <Grid item="true" md={4}>
                                <Button variant="outlined" sx={{fontSize:"18px" , float:"right"}}>รายละเอียดเพิ่มเติม</Button>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{pt:"20px" ,pb:"60px"}}>

                            {
                                loads && hLight.length > 0 ?

                                hLight.slice(0,3).map((ele , keys) => {

                                    return  <Grid key={keys} item="true" xs={12} sm={6} md={4} lg={4} xl={4}>
                                                    <BoxExper id={`panel${ele.experID}`} title={ele.experTitle} txtdes={ele.experHighlight} thumb={ele.experThumb}/>
                                            </Grid>

                                })
                                :null
                            }
                         </Grid>
                        
                    </Container>  
                </Box>
        )
}

export default SectionExper
