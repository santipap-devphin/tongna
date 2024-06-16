import React , {useContext , useEffect, useState} from 'react';
import MetaTag from '../component/MetaTag';
import { useParams } from 'react-router-dom';
import Header from '../wrappers/navbar/Header';
import DataContext from '../context/DataContext';
import { ThemeProvider } from '@mui/material/styles';
import { Stack} from '@mui/material';
import Mainbreadcrumb from '../layouts/Mainbreadcrumb';
import ExpDetail from '../wrappers/experience/ExpDetail';
import endpoint from '../api/endpoint';
import Footer from '../layouts/Footer';

const  ExperienceDetail = () => {
    
    const { theme } = useContext(DataContext);
    const {id , slug} = useParams();
    const [statusCall , setStatusCall] = useState(false);
    const [listExper , setListExper] = useState({});

    useEffect(() => {

        let callSuccess = true;
        const reqExper = async () => {

            try {
                const response = await endpoint.get("/experience/once/"+id);
                if(response.data.code === 1){
                    setListExper(response.data.list);
                    setStatusCall(true);

                }
                
            } catch (err) {
                console.error(err)
            }

        }

        if(callSuccess){
            reqExper();
        }


        return () => {
            callSuccess = false;
        }



    },[id])

    return (<>
              <ThemeProvider theme={theme}>
                      <MetaTag title={slug} />     
                      <Header />
                      <Stack>
                          <Mainbreadcrumb page={slug}  />
                          <ExpDetail data={listExper} loads={statusCall} />
                      </Stack>
                      <Footer />
              </ThemeProvider>
          </>);
}

export default ExperienceDetail