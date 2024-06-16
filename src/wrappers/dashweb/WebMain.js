import React from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import WebList from './WebList';

const WebMain = () => {

     let pages = 1;
     const changePage = () => {
     }
     return (<Box
                sx={{
                m:1,
                p:1,
                width: "99%",
                backgroundColor: 'transparent',
                }}
            >
            <Grid container spacing={2}>
                 <WebList />
             </Grid>
            <Stack spacing={2} sx={{mt:3}} alignItems="center">
                    <Pagination count={pages} color="primary" onChange={changePage} />
            </Stack>

            </Box>
            )
    }

export default WebMain