import React  from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ActLeftDetail from './ActLeftDetail';
import ActRightDetail from './ActRightDetail';

const ActDetail = ({loads , data , reload}) =>  {

  return (
    <Box sx={{pt:5 , pb:5}}>
        <Container>
            <Grid container spacing={2}>
                <Grid item="true" xs={12} md={3} sx={{display: { xs: 'none', md: 'flex' }}} >
                    <ActLeftDetail/>
                </Grid>
                 <Grid item="true" xs={12} md={9}>
                      {
                        loads ?
                        <ActRightDetail id={data.eventsID} cate={data.eventsCate} title={data.eventsTitle} des={data.eventsDes} imglist={data.eventsImglist} log={data.eventsLog} tags={data.eventsTag} reload={reload}  />
                        :null
                      }
                     
                 </Grid>
            </Grid>
        </Container>
    </Box>
  )
}

export default ActDetail