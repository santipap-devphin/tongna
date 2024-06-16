import React , {useContext} from 'react';
import { Link } from 'react-router-dom';
import {Stack , Box , Typography ,Button  , Container , Divider , Chip } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import DataContext from '../../context/DataContext';

const SectionWelcome = ({content , loads}) => {

    const {urlServer} = useContext(DataContext);
   
     return ( <Box
                sx={{
                display: 'flex',
                /*backgroundColor: 'primary.dark',
                '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                },
                */
                }}
                >
                 <Container>
                    <Grid container spacing={2} sx={{pb:"20px"}}>
                        <Grid item="true" md={7}>
                           
                        <Stack spacing={2}>
                            <Divider>
                                <Chip label="ยินดีต้อนรับเข้าสู่" sx={{fontSize:20 , color:"#fff" , background:"#006F70"}} />
                            </Divider>
                            
                             <Typography variant="h4">Tongna Cottage Natural Resort</Typography>
                             {
                                loads ?
                                    <div style={{fontSize:18 , lineHeight:1.4 }} dangerouslySetInnerHTML={{ __html:JSON.parse(content.webConTh)}} />
                                :null
                             }
                           
                             <Grid container sx={{pt:"5px",pb:"20px"}}>
                                <Grid item="true" md={4}>
                                    <Link to={"https://line.me/R/ti/p/@317avsyc"}>
                                         <Button variant="contained" color="warning" sx={{fontSize:"22px"}}>เช็คราคาห้องพัก !</Button>
                                    </Link>
                               </Grid>
                            </Grid>
                         </Stack>
                            
                        </Grid>
                        <Grid item="true" md={5}>
                           
                        <Stack spacing={2}>
                            <img src={urlServer+"room/1695903777940m@@_villa9.jpg"} alt='Welcome Tongna Cottage Natural Resort' />
                        </Stack>
                            
                        </Grid>
                    </Grid>
                 </Container>   
                </Box>
            )

}

export default SectionWelcome;