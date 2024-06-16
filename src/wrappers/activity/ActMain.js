import React from 'react';
import {Stack , Box , Container} from "@mui/material";
import CardActivity from '../../component/CardActivity';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';

const ActMain = ({loads , data}) =>{

  const Screensm = useMediaQuery('(max-width:768px)');

return <>
            <Box
            sx={{
            display: 'flex',
            pt:5 , pb:5
            }}
            >
                <Container sx={Screensm ? {p:0} : null}>
                        <Grid container spacing={3}>
                        
                                <Grid item="true" xs={12} md={12} sx={{pt:3 , pb:3}}>
                                        <Stack sx={{p:2 , color:"#000"}} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 4, md: 12 }}>
                                                <Grid container spacing={2}>
                                                        {
                                                        loads && data.length > 0 ?
                                                        data.map((items , i) => {

                                                                return  <Grid key={i} item="true" xs={12} md={4}>
                                                                        <CardActivity lists={items} />
                                                                        </Grid>
                                                                })
                                                                :null
                                                        }
                                                </Grid>
                                        </Stack>
                                </Grid>
                        </Grid>
               </Container>
            </Box>
          </>

}

export default ActMain;
