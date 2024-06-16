import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardExperience from '../../component/CardExperience';

const ExperList = ({listExper , status}) => {
 

  return ( <Grid container spacing={2}>

                    {
                        listExper.length > 0 ?
                        listExper.map((val , keys) => {

                             return <Grid key={keys} item xs={12} sm={4}>
                                        <CardExperience 
                                            exID={val.experID} 
                                            exTitle={val.experTitle} 
                                            exDate={val.experTitle} 
                                            exImg={val.experThumb} 
                                            exCate={val.experCateName} 
                                            exHighlight={val.experHighlight}
                                            setstatusCompleate={status}
                                            />
                                    </Grid>

                        })
                        
                        : <Grid item xs={12}>
                            <Box sx={{ p: 2, mr:2, border: '1px dashed grey' }}>
                                <Typography variant='h6'>ไม่มีข้อมูล</Typography>
                            </Box>
                         </Grid>
                    }
             </Grid>
    )
}

export default ExperList