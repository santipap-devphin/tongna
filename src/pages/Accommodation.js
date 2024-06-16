import React , {useContext} from 'react';
import MetaTag from '../component/MetaTag';
import Header from '../wrappers/navbar/Header';
import DataContext from '../context/DataContext';
import { ThemeProvider } from '@mui/material/styles';
import { Stack } from '@mui/material';
import Mainbreadcrumb from '../layouts/Mainbreadcrumb';
import AccMain from '../wrappers/accommodation/AccMain';
import Footer from '../layouts/Footer';

const Accommodation = () => {

    const { theme} = useContext(DataContext);

    return (<>
                <ThemeProvider theme={theme}>
                <MetaTag title="ห้องพักในจังหวัดเชียงใหม่"/>     
                        <Header />
                        <Stack>
                            <Mainbreadcrumb page={"Accommodation"} />
                            <AccMain />
                        </Stack>
                        <Footer />
                </ThemeProvider>
            </>);

}

export default Accommodation;
