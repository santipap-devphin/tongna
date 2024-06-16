import React , {useContext , useEffect , useState} from 'react';
import MetaTag from '../component/MetaTag';
import DataContext from '../context/DataContext';
import { ThemeProvider } from '@mui/material/styles';
import HeaderTop from '../wrappers/navbar/HeaderTop';
import SectionWelcome from '../wrappers/home/SectionWelcome';
import SectionRoom from '../wrappers/home/SectionRoom';
import SectionExper from '../wrappers/home/SectionExper';
import SectionAccom from '../wrappers/home/SectionAccom';
import SectionGallery from '../wrappers/home/SectionGallery';
import SectionBook from '../wrappers/home/SectionBook';
import endpoint from '../api/endpoint';
import Footer from '../layouts/Footer';

const Home = () => {

    const { theme , styles } = useContext(DataContext);
    const [changeImg , setChangeImg] = useState({key:0  , val:styles.paperContainer});
    const [updateImg , setUpdateImg] = useState(0);
    const [switchImg , setSwitchImg] = useState(false);
    const [homeCarousel , setHomeCarousel] = useState([]);
    const [welComeHotel , setWelcomeHotel] = useState('');
    const [accCom , setAccCom] = useState('');
    const [titleH , setTitleH] = useState('');
    const [listRoom , setListRoom] = useState([]);
    const [titleGallery , setTitleGallery] = useState('');
    const [listHLight , setListHLight] = useState([]);
    const [loadList , setLoadList] = useState(false);
    const [loadSucc , setLoadSucc] = useState(false);

    /*useEffect(() => {

        document.title = "โรงแรมในเชียงใหม่"

    },[])*/

    useEffect(() => 
    {
        if(updateImg === 2){

            setChangeImg({key:1  , val:styles.paperContainer2})

        }
        else if(updateImg === 3){

            setChangeImg({key:2  , val:styles.paperContainer3})
        }
        else{

            setChangeImg({key:0  , val:styles.paperContainer})
        }

        return () => {

            setSwitchImg(false);
        }
    }

    ,[switchImg , styles , updateImg])

    useEffect(() => {

        var reqStatus  = true;

        const reqWebContent = async () => {

             try {
                const response = await endpoint.get("/webs/all");
                if(response.data.code === 1){

                    setHomeCarousel(response.data.list[0].webContent);
                    setWelcomeHotel(response.data.list[1].webContent[0])
                    setAccCom(response.data.list[3].webContent[0])
                    setTitleH(response.data.list[5].webContent[0])
                    setTitleGallery(response.data.list[6].webContent[0])
                   
                    setTimeout(function() {setLoadSucc(true);}, 1000);
                  
                    //console.log(response.data)
                }
                
            } catch (err) {
                console.error(err)
            }
        }

        if(reqStatus){

            reqWebContent();
        }

         return () => {

            reqStatus = false;

        }

    },[])

    useEffect(() => {

        let CallObj = true;

        const reqObj = async () => {

            try {

                const response = await Promise.all([endpoint.get("/roomcate/all") , endpoint.get("experience/content")]);
                if(response.length === 2){
                    setListRoom(response[0].data.list);
                    setListHLight(response[1].data.list)
                    setLoadList(true);

                }
                
                
            } catch (err) {
                console.error(err)
            }


        }

        if(CallObj){
            reqObj();
        }

        return () => {

            CallObj = false;
        }


    },[])

   

    return (<ThemeProvider theme={theme}>
               <MetaTag title="โรงแรมที่พักในเชียงใหม่ Tongna Cottage Natural Resort"  />
               <HeaderTop stylePaper={changeImg.val} setUpdateImg={setUpdateImg} setSwitchImg={setSwitchImg} data={homeCarousel}/>
               <SectionWelcome content={welComeHotel} loads={loadSucc} />
               <SectionRoom titletxt={accCom} loads={loadSucc} rooms={listRoom} />
               <SectionExper titleH = {titleH} loads={loadList} hLight={listHLight} />
               <SectionAccom />
               <SectionGallery titletxt={titleGallery} loads={loadSucc} />
               <SectionBook />
               <Footer />
            </ThemeProvider>)

}

export default Home