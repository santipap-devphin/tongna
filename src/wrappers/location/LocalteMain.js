import React  , {useState , useContext , useEffect} from 'react';
import {Box , Typography   , Container  , Chip } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataContext from '../../context/DataContext';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import endpoint from '../../api/endpoint';

const LocalteMain = () =>  {

    const [openAcc , setOpenAcc] = useState('panel1a-header');
    const {urlServer} = useContext(DataContext);
    const [listLocation ,setListLocation] = useState([]);
    const [loadData , setLoadData]= useState(false);
   
    const Screensm = useMediaQuery('(max-width:768px)');

    useEffect(() => {

        let callSuccess = true;

        const reqWebs = async () => {

            try {
                const response = await endpoint.get("/webs/once/8");
                if(response.data.code === 1){

                    setListLocation(response.data.list);
                    
                    setLoadData(true)

                }
                
            } catch (err) {
                console.error(err)
            }


        }
        if(callSuccess){
            reqWebs();
        }

        return () => {
            callSuccess = false;
        }
    },[])

    const handleChangeAcc = (id) => {

        setOpenAcc(id)

    }
    
  return (<>
            <Box
                sx={{
                display: 'flex',
                 }}
                >
                    <Container>

                        <Typography variant='h4' sx={{pt:"20px"}}>ตำแหน่งที่ตั้งเป็นเอกลักษณ์ <Chip label="จุดเด่น" color="primary" sx={{fontSize:18}} /></Typography>
                        <Grid container spacing={2}>
                            <Grid item="true" xs={12} md={6}  sx={Screensm ? {mt:2.5 , mb:0} :{mt:5 , mb:5}}>
                                <img src={urlServer+"gallery/1698729890230_11-3-1-1024x688.jpg"} style={{width:"100%"}} alt="รูปภาพ location" />
                            </Grid>
                            <Grid item="true" xs={12} md={6} sx={Screensm ? {mt:2.5 , mb:2.5} :{mt:5 , mb:5}}>
                                    <Accordion sx={{mb:1}} expanded={openAcc === "panel1a-header"} onChange={() => handleChangeAcc('panel1a-header')}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                        <Typography sx={{fontSize:22}}>ความเป็นมา โต้งนา คอทเทจ เนเชอรัล รีสอร์ท</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {
                                                loadData ?
                                                <div dangerouslySetInnerHTML={{ __html:JSON.parse(listLocation.webContent[0].webConTh)}} />
                                                :null
                                            }
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{mb:1}} expanded={openAcc === "panel2a-header"} onChange={() => handleChangeAcc('panel2a-header')}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                        >
                                            
                                        <Typography sx={{fontSize:22}}>การเดินทางสะดวก</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        {
                                                loadData ?
                                                <div dangerouslySetInnerHTML={{ __html:JSON.parse(listLocation.webContent[1].webConTh)}} />
                                                :null
                                        }
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion sx={{mb:1}} expanded={openAcc === "panel3a-header"} onChange={() => handleChangeAcc('panel3a-header')}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3a-content"
                                        id="panel3a-header"
                                        >
                                        <Typography sx={{fontSize:22}}>ข้อมูลที่พัก</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        {
                                                loadData ?
                                                <div dangerouslySetInnerHTML={{ __html:JSON.parse(listLocation.webContent[2].webConTh)}} />
                                                :null
                                        }
                                        </AccordionDetails>
                                    </Accordion>

                                
                                   
                                </Grid>
                            </Grid>
                            
                        </Container>
                        
                    </Box>
                    <Box 
                                sx={{display: 'flex' , background:"#e9f2fa"}}
                            >
                            <Container>
                                 <Typography variant='h3' sx={{textAlign:"center" , mt:5}}>ติดต่อเรา</Typography>
                                <Grid container spacing={2}>

                                         <Grid item="true" xs={12} md={12} sx={{mt:5 , mb:10}}>
                                            <iframe 
                                                loading="lazy" 
                                                src="https://maps.google.com/maps?q=tongna%20cottage&amp;t=m&amp;z=11&amp;output=embed&amp;iwloc=near" 
                                                title="tongna cottage" 
                                                aria-label="tongna cottage"
                                                style={{width:"100%" , height:500}}
                                                >

                                            </iframe>
                                        </Grid>
                                       
                                  </Grid>
                            </Container>
                            </Box>
                </>
  )
}

export default LocalteMain