import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CategoryList from './CategoryList';

const CategoryMain = () => {
  
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
           
                <CategoryList />
            <Stack spacing={2} sx={{mt:3}} alignItems="center">
                    <Pagination count={pages} color="primary" onChange={changePage} />
            </Stack>
        </Box>
    )
}

export default CategoryMain