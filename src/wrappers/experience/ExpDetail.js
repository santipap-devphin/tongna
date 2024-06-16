import React  from 'react';
import {Box , Container} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

const ExpDetail = ({data , loads}) => {

  return (<>
            <Box
            sx={{
            display: 'flex',
            m:5
            }}
            >
               {/* Event mountenter ไม่ทำงานใน mobile version อาจแก้ปัญหาโดยการใช้ use mediaquery ในการเช้คว่าเป็น mobile version หรือเปล่า เพื่อแสดง  box ที่ต่างไป */}
                <Container>
                        <Grid container spacing={2} sx={{p:"10px" ,boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , borderRadius: "30px"}}>
                            {
                                loads && Object.keys(data).length > 0 ?

                                <Grid item="true" xs={12} sm={12} md={12} lg={12} xl={12} sx={{maxWidth:"100%"}}>
                                     <div dangerouslySetInnerHTML={{ __html:JSON.parse(data.experContent)}} />
                                </Grid>

                                :null
                            }
                        </Grid>
                </Container>
            </Box>
          </>
    )
}

export default ExpDetail