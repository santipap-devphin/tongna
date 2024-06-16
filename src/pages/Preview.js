import React , {useContext} from 'react';
import MetaTag from '../component/MetaTag';
import { useParams } from 'react-router-dom';
import Header from '../wrappers/navbar/Header';
import DataContext from '../context/DataContext';
import { ThemeProvider } from '@mui/material/styles';
import { Stack  , Box  , Container , Grid} from '@mui/material';
import Mainbreadcrumb from '../layouts/Mainbreadcrumb';
import Footer from '../layouts/Footer';

 const Preview = () => {

 const { theme } = useContext(DataContext);
 const {slug} = useParams();
 let previews = JSON.parse(localStorage.getItem(slug));

  return (<ThemeProvider theme={theme}>
                <MetaTag title={slug} />     
                <Header />
                <Stack>
                    <Mainbreadcrumb page={slug}  />
                    <Box
                    sx={{
                    
                    display: 'flex',
                    m:5
                    }}
                    >
                    <Container>
                            <Grid container spacing={2} sx={{p:"10px" ,boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , borderRadius: "10px"}}>

                                <Grid item={true} xs={12} sm={12} md={12} lg={12} xl={12} sx={{maxWidth:"100%"}}>
                                     <div dangerouslySetInnerHTML={{ __html:previews}} />
                                </Grid>
                             </Grid>
                            
                    </Container>
                    </Box>
                </Stack>
                <Footer />
            </ThemeProvider>
        )
}

export default Preview