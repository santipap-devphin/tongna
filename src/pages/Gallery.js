import React , {useContext} from 'react';
import MetaTag from '../component/MetaTag';
import Header from '../wrappers/navbar/Header';
import DataContext from '../context/DataContext';
import { ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Mainbreadcrumb from '../layouts/Mainbreadcrumb';
import GalMain from '../wrappers/gallery/GalMain';
import Footer from '../layouts/Footer';

const Gallery = () => {

   const {theme} = useContext(DataContext);

  return (<>
            <ThemeProvider theme={theme}>
                    <MetaTag title={"รูปภาพ Tongna Cottage ไมว่ามุมไหนก็ชิค"} />     
                    <Header />
                    <Stack>
                        <Mainbreadcrumb page={"Gallery"}  />
                        <GalMain />
                    </Stack>
                    <Footer />
            </ThemeProvider>
            </>
        )
}

export default Gallery