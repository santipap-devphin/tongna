import React , {useContext} from 'react';
import MetaTag from '../component/MetaTag';
import Header from '../wrappers/navbar/Header';
import DataContext from '../context/DataContext';
import { ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Mainbreadcrumb from '../layouts/Mainbreadcrumb';
import LoginMain from '../wrappers/login/LoginMain';
import Footer from '../layouts/Footer';


const Login = () =>  {
    const {theme} = useContext(DataContext);

    return (<ThemeProvider theme={theme}>
                  <MetaTag title={"เข้าสู่ระบบ"} />     
                  <Header />
                  <Stack>
                       <Mainbreadcrumb page={"Login"}  />
                       <LoginMain />
                  </Stack>
                  <Footer />
              </ThemeProvider>
              )
}

export default Login