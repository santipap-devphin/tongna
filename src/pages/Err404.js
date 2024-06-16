import React , {useContext} from 'react';
import MetaTag from '../component/MetaTag';
import Header from '../wrappers/navbar/Header';
import DataContext from '../context/DataContext';
import { ThemeProvider } from '@mui/material/styles';
import { Stack, Typography} from '@mui/material';
import Mainbreadcrumb from '../layouts/Mainbreadcrumb';
import Footer from '../layouts/Footer';

const Err404 = () =>  {
    const { theme } = useContext(DataContext);

    return (<ThemeProvider theme={theme}>
                  <MetaTag title="ไม่พบหน้าที่ท่านต้องการ"/>     
                  <Header />
                  <Stack>
                      <Mainbreadcrumb page={"NotFound"}  />
                     <Typography variant='h3' style={{textAlign:"center" , padding:"30px"}}>ไม่พบหน้าที่คุณต้องการ</Typography>
                  </Stack>
                  <Footer />
              </ThemeProvider>
          )
}

export default Err404