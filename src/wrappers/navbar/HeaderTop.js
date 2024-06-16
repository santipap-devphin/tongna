import React , {useState} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Header from './Header';
import { Box , Stack , Typography  , IconButton , Container  , Button , Fab } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FaTiktok} from "react-icons/fa";


const HeaderTop = ({stylePaper , setUpdateImg , setSwitchImg , data}) =>  {

  
  const [count, setCount] = useState(1);
  const [loadTxt , setLoadTxt] = useState(true);
 
  const btnNext = () =>{

      setCount(count + 1)
      setUpdateImg(count + 1)
      setLoadTxt(false);
      if(count === 3)
      {
         setCount(1)
         setUpdateImg(1)
      
      }
      setSwitchImg(true);
      setLoadTxt(true);

  }

  const btnBack = () =>{

    setCount(count - 1)
    setUpdateImg(count - 1)
    setLoadTxt(false);
    if(count === 1)
    {
        setCount(3)
        
    }

    setSwitchImg(true);
    setLoadTxt(true);

  }
  const toUrl = (social) => {

    if(social === "facebook"){
        window.open("https://www.facebook.com/tongnacottage");
    }
    else if(social === "ig"){
        window.open("https://www.instagram.com/tongnacottage/");
    }else if(social === "tiktok"){
        window.open("https://www.tiktok.com/@tongnacottage");
    }

  }
    

  return ( <Box className='sticky-bar' sx={{flexGrow:1 , ml:-1 ,mr:15 , backgroundColor: "#fff !important" , color:"#000 !important"}}>

            <Container>
                <Box sx={{display:"flex" , position:"absolute" , zIndex:2}}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 2, md: 3 }} >
                        <Grid item="true" xs={12} md={6}>
                                            <Stack 
                                                direction="row"
                                                spacing={{ xs: 1, sm: 2, md: 2 }}
                                                sx={{color:"#fff",justifyContent:"center",textAlign:"center",alignItems:"center" , pt:1}}
                                                >
                                                <Link to={"/accommodation"} style={{textDecoration: "none" , color :"#fff"}}><Typography>โรงแรม</Typography></Link>
                                                <Typography>|</Typography>
                                                <Link to={"/gallery"} style={{textDecoration: "none" , color :"#fff"}}><Typography>คาเฟ่</Typography></Link>
                                                <Typography>|</Typography>
                                                <Link to={"/events"} style={{textDecoration: "none" , color :"#fff"}}><Typography>กิจกรรม</Typography></Link>
                                                
                                            </Stack>
                        </Grid>
                        <Grid item="true" xs={12} sm={6} md={6} >
                                            <Stack 
                                                direction="row"
                                                spacing={{ xs: 1, sm: 1, md: 1 }}
                                                sx={{color:"#fff" , justifyContent:"center",textAlign:"center",alignItems:"center"}}
                                                >
                                                <IconButton size="small" aria-label="facebook" color="inherit" onClick={()=> toUrl("facebook")}>
                                                    <FacebookIcon />
                                                </IconButton>
                                                <IconButton size="small" aria-label="tiktok" color="inherit" onClick={()=> toUrl("tiktok")}>
                                                    <FaTiktok />
                                                </IconButton>
                                                <IconButton size="small" aria-label="Instagrams" color="inherit" onClick={()=> toUrl("ig")}>
                                                    <InstagramIcon />
                                                </IconButton>
                                            </Stack>
                        </Grid>
                        <Grid item="true" xs={12} sm={12} md={12}>
                            <Header />
                        </Grid>
                    </Grid>

                </Box>
                
             </Container>
             <Box style={stylePaper} sx={{position:"relative" , height:"100vh"}} >
                <Container>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 12, sm: 2, md: 3 }} >
                        <Grid item="true" xs={12} md={12} 
                       >
                        <Stack  spacing={{ xs: 3, sm: 2, md: 4 }}
                                direction={{ xs: 'column' , md:"column", sm: 'column' }} justifyContent="center" alignItems="center"
                                sx={{
                                    color:"#fff",
                                    pt:25,
                                    pb:20
                                }}
                                >
                                {
                                    loadTxt && data.length > 0 ? 
                                    <>
                                      <Box sx={{display: { xs: 'none', md: 'block' }}}>
                                        <Typography variant='h3' >{count === 1 ? "Tongna Cottage Natural Resort" : "Jungle de Cafe"}</Typography>
                                     </Box>
                                     <Box sx={{display: { xs: 'block', md: 'none' }}}>
                                        <Typography variant='h6' >{count === 1 ? "Tongna Cottage Natural Resort" : "Jungle de Cafe"}</Typography>
                                     </Box>
                                     <Box sx={{display: { xs: 'none', md: 'block' }}}>
                                         <div key={count} style={{fontSize:16 }} dangerouslySetInnerHTML={{ __html:JSON.parse(data[count-1].webConTh)}} />
                                     </Box>
                                     <Box sx={{display: { xs: 'block', md: 'none' }}}>
                                         <div key={count} style={{fontSize:12 }} dangerouslySetInnerHTML={{ __html:JSON.parse(data[count-1].webConTh)}} />
                                     </Box>
                                     <Box sx={{display: { xs: 'block', md: 'none' }}}>
                                             <Button variant="contained" color="warning" sx={{fontSize:"22px",float:"right"}}>จองห้องพัก !</Button>
                                    </Box>
                                     <Box sx={{display: { xs: 'block', md: 'none' }}}>
                                     <Fab color="primary" aria-label="back" onClick={btnBack}>
                                            <ArrowBackIcon />
                                        </Fab>
                                        <Fab color="primary" aria-label="next" onClick={btnNext}>
                                            <ArrowForwardIcon />
                                        </Fab>
                                        <Typography variant='h5' sx={{color:"#fff" , pt:1.5 , pb:1 , textAlign:"center"}}>{count}/3</Typography>
                                     </Box>

                                     </>
                                    :null
                                }
                        </Stack>
                        <Stack 
                            spacing={2}
                            direction="row"
                            sx={{display: { xs: 'none', md: 'flex' }}}
                        >
                        <Fab color="primary" aria-label="back" onClick={btnBack}>
                            <ArrowBackIcon />
                        </Fab>
                        <Fab color="primary" aria-label="next" onClick={btnNext}>
                            <ArrowForwardIcon />
                        </Fab>
                        <Typography variant='h5' sx={{color:"#fff" , pt:1.5 , pb:1}}>{count}/3</Typography>
                        </Stack>

                        </Grid>
                </Grid>
            </Container>
            </Box>
          
            <Container>
                    <Grid container spacing={2} sx={{pb:"20px"}}>
                        <Grid item="true" md={12} sx={{display: { xs: 'none', md: 'block' }}}>
                                {/**ตอนเป็น mobile version ปุ่นนี้หายไป */}
                                <Link to={"https://line.me/R/ti/p/@317avsyc"}>
                                     <Button variant="contained" color="warning" sx={{fontSize:"22px",float:"right"}}>Book Rooms Now!</Button>
                                </Link>
                            
                        </Grid>
                    </Grid>
            </Container>
        </Box>

  )
}

export default HeaderTop