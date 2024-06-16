import React , {useContext} from 'react';
import MetaTag from '../component/MetaTag';
import Header from '../wrappers/navbar/Header';
import DataContext from '../context/DataContext';
import { ThemeProvider } from '@mui/material/styles';
import { Stack  } from '@mui/material';
import Mainbreadcrumb from '../layouts/Mainbreadcrumb';
import LocalteMain from '../wrappers/location/LocalteMain';
import Footer from '../layouts/Footer';

const Location = () =>  {

  const { theme} = useContext(DataContext);

  return (<ThemeProvider theme={theme}>
                <MetaTag title={"เชียงใหม่ ที่ตั้ง Tongna Cottage"} />     
                <Header />
                <Stack>
                     <Mainbreadcrumb page={"Location"}  />
                     <LocalteMain />
                </Stack>
                <Footer />
            </ThemeProvider>
            )
}

export default Location;
