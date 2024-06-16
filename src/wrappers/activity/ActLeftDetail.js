import React from 'react';
import { Link } from 'react-router-dom';
import { Stack , Typography , Chip} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';


const ActLeftDetail = () =>  {

  let tagsAll = ['เชียงใหม่' , 'แอดเวนเจอร์' , 'ร้านอาหารแนะนำ' ,'อันซีนไทยแลนด์' , 'อุทยานแห่งชาติ'];

  return (<Stack spacing={2} sx={{color:"#000"}}>
                        <Typography variant='h6' sx={{pt:2 , pb:2}}>TagAll</Typography>
                        <Grid container spacing={2}>
                            {
                                tagsAll.map((ele , index) => {

                                  return  <Grid key={index}  item="true" xs={12} md={6}>
                                               <Link to={`/tags/${ele}`}><Chip label={ele} color="warning" style={{cursor:"pointer"}} /></Link>
                                          </Grid>

                                })
                              }
                            
                        </Grid>
               </Stack>
  )
}

export default ActLeftDetail