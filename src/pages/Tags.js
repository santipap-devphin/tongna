import React , {useContext, useEffect, useState} from 'react';
import MetaTag from '../component/MetaTag';
import { useParams , Link } from 'react-router-dom';
import Header from '../wrappers/navbar/Header';
import DataContext from '../context/DataContext';
import { ThemeProvider } from '@mui/material/styles';
import { Stack , Typography , Box, Button} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Mainbreadcrumb from '../layouts/Mainbreadcrumb';
import ActMain from '../wrappers/activity/ActMain';
import endpoint from '../api/endpoint';
import Footer from '../layouts/Footer';

const Tags = () => {

const { theme } = useContext(DataContext);
const { slug } = useParams();
const [listData , setListData] = useState([]);
const [statusCall , setStatusCall] = useState(false);

useEffect(() => {

    let callSuccess = true;
    const reqTag = async () => {

        try {

            const response = await endpoint.post("/eventsact/findtag" , {tag:slug});
            if(response.data.code === 1){
                setListData(response.data.list);
                setStatusCall(true)
            }
           
        } catch (err) {
            console.error(err)
        }
        
    }

    if(callSuccess){
         reqTag();
    }

    return () => {
        callSuccess = false;
    }
},[slug])

  return (<ThemeProvider theme={theme}>
                <MetaTag title={slug}  />     
                <Header />
                <Stack>
                    <Mainbreadcrumb page={slug}  />
                    <Stack sx={{mt:5,textAlign:"center"}}>
                        <Typography variant='h4'>Tag : {slug}</Typography>
                    </Stack>
                    {
                        listData.length > 0 ?
                        <ActMain loads={statusCall} data={listData} />
                        :
                        <Grid container spacing={2}>
                            <Grid item="true" xs={12}>
                                <Box sx={{p:5,m: 5, border: '1px dashed grey' }}>
                                    <Typography variant='h6' style={{textAlign:"center"}}>ไม่มีข้อมูล</Typography>
                                 </Box>
                            </Grid>
                            <Grid item="true" xs={12} textAlign="center" sx={{pb:5}}>
                                <Link to={"/events"} >
                                    <Button variant="contained" color="secondary" >กลับ</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    }
                </Stack>
                <Footer />
            </ThemeProvider>
        )
}

export default Tags