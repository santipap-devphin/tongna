import React , {useContext , useEffect, useState} from 'react';
import MetaTag from '../component/MetaTag';
import Header from '../wrappers/navbar/Header';
import DataContext from '../context/DataContext';
import { ThemeProvider } from '@mui/material/styles';
import { Stack } from '@mui/material';
import Mainbreadcrumb from '../layouts/Mainbreadcrumb';
import ActMain from '../wrappers/activity/ActMain';
import endpoint from '../api/endpoint';
import Footer from '../layouts/Footer';

const Events = () => {

    const {theme} = useContext(DataContext);
    const [statusLoad , setStatusLoad] = useState(false);
    const [listData , setListData] = useState([]);
   
    useEffect(() => {
        
    let callSuccess = true;

    const reqEvents = async () => {
        
        try {
            const response = await endpoint.get("/eventsact/all");
            //console.log(response.data.list)
            let listID = [];
            if(response.data.code === 1){

                response.data.list.forEach((ele) => {
                     listID.push({id:ele.eventsID , title:ele.eventsTitle});
                })

                console.log(listID);
                localStorage.setItem("EventIDall" , JSON.stringify(listID));
                setListData(response.data.list);
                setStatusLoad(true)

            }
            
        } catch (err) {
            console.error(err)
        }
    }

    if(callSuccess){
        reqEvents();
    }

    return () => {
        callSuccess = false;
    }
    },[])

    return (<>
                <ThemeProvider theme={theme}>
                        <MetaTag title={"ข่าวสาร กิจกรรม Tongna Cottage Natural Resort"} />     
                        <Header />
                        <Stack>
                            <Mainbreadcrumb page={"Events"}  />
                            <ActMain loads={statusLoad} data={listData} />
                        </Stack>
                        <Footer />
                </ThemeProvider>
            </>)

}

export default Events