import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const FooterDashBoard  = () => {
  return (<Grid container spacing={1} sx={{mt:1 , ml:0.2 , mr:1.2 , mb:3}}>
                <Grid item xs={12} sm={12} md={12} lg={12} textAlign="center">
                    <Box sx={{backgroundColor:"#D9D0BD" , color:"#000" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , p:2}}>
                        CopyRight Devphin     
                    </Box>
                </Grid>       
          </Grid>
  )
}

export default FooterDashBoard