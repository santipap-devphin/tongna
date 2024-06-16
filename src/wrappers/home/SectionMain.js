import React from 'react';
import {Stack , Box , Typography ,Button  , Paper , Container } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import { Link } from 'react-router-dom';

const SectionHomeMain = ({stylePaper}) => {

    

    return (<Box
                sx={{
                display: 'flex',
                flexWrap: 'wrap',
                
                    }}
                >
                <Paper style={stylePaper} component={Stack} direction="column" justifyContent="center">
                    
                </Paper>
                 <Container>
                    <Grid container spacing={2} sx={{pb:"20px"}}>
                        <Grid item="true" md={12}>
                                {/**ตอนเป็น mobile version ปุ่นนี้หายไป */}
                                <Button variant="contained" color="warning" sx={{fontSize:"22px",float:"right"}}>Book Rooms Now!</Button>
                            
                        </Grid>
                    </Grid>
                 </Container>
                

            </Box>)



}

export default SectionHomeMain;