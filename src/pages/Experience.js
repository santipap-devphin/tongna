import React , {useContext} from 'react';
import MetaTag from '../component/MetaTag';
import Header from '../wrappers/navbar/Header';
import DataContext from '../context/DataContext';
import { ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Mainbreadcrumb from '../layouts/Mainbreadcrumb';
import ExpMain from '../wrappers/experience/ExpMain';
import Footer from '../layouts/Footer';

const Experience = () => {

  const { theme } = useContext(DataContext);

  return (<>
            <ThemeProvider theme={theme}>
                    <MetaTag title={"Tongna Cottage ได้มอบประสบการณ์แสนพิเศษ"} />     
                    <Header />
                    <Stack>
                        <Mainbreadcrumb page={"Experience"}  />
                        <ExpMain />
                    </Stack>
                    <Footer />
            </ThemeProvider>
        </>);
}

export default Experience;
