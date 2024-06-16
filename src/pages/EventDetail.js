import React , {useContext, useEffect , useState} from 'react';
import MetaTag from '../component/MetaTag';
import { useParams } from 'react-router-dom';
import Header from '../wrappers/navbar/Header';
import DataContext from '../context/DataContext';
import { ThemeProvider } from '@mui/material/styles';
import { Stack } from '@mui/material';
import Mainbreadcrumb from '../layouts/Mainbreadcrumb';
import ActDetail from '../wrappers/activity/ActDetail';
import endpoint from '../api/endpoint';
import Footer from '../layouts/Footer';

const EventDetail = () => {

    const { theme} = useContext(DataContext);
    const {id , slug} = useParams();
    const [listDetail , setListDetail] = useState({});
    const [statusDetail , setStatusDetail] = useState(false);
    const [statusReload , setStatusReload] = useState(false);

    useEffect(() => {
        let callSuccess = true;
        
        setStatusReload(false);
        
        const reqDetail = async () => {
            try {
                const response = await endpoint.get("/eventsact/once/"+id);
                if(response.data.code === 1){
                    setListDetail(response.data.list);
                    setStatusDetail(true);
                    setStatusReload(true);

                }
                
            } catch (err) {
                console.error(err)
            }
        }

        if(callSuccess){
            reqDetail();
        }

        return () => {
            callSuccess = false;
        }
    },[id , statusReload])

    return (<>
                <ThemeProvider theme={theme}>
                        <MetaTag title={slug}/>     
                        <Header />
                        <Stack>
                            <Mainbreadcrumb page={slug}  />
                            <ActDetail loads={statusDetail} data={listDetail} reload={setStatusReload} />
                        </Stack>
                        <Footer />
                </ThemeProvider>
            </>)
}

export default EventDetail