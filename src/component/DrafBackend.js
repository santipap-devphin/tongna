import React , {Fragment, useContext , useState , useEffect} from 'react';
import MetaTag from './MetaTag';
import { useNavigate } from 'react-router-dom';
import {Typography, Grid ,Stack}  from '@mui/material';
import DataContext from '../context/DataContext';
import HeaderDashBoard from '../wrappers/dashboardBack/HeaderDashBoard';
import FooterDashBoard from '../wrappers/dashboardBack/FooterDashBoard';
import MobileDashboard from '../wrappers/dashboardBack/MobileDashboard';
import DeskTopDahBoard from '../wrappers/dashboardBack/DeskTopDahBoard';
import { ThemeProvider } from '@mui/material/styles';
import endpoint from '../api/endpoint';
import SweetAlert2 from 'react-sweetalert2';


function DrafBackend({titlepage , children}) {

  const {theme , scaleTablet , matches} = useContext(DataContext);

  let navicate = useNavigate();

  const [statusTxt , setStatusTxt] = useState(false);
 
  const [swalProps, setSwalProps] = useState({
    show: true,
    title: 'ข้อความจากระบบ',
    text: "กรุณาเข้าสู่ระบบ",
    icon: 'warning',
    allowOutsideClick: false,
    showCancelButton: true,
    showConfirmButton: false,
    confirmButtonText:"OK",
    cancelButtonText:"Cancel"
  });
  
  let userInfo = JSON.parse(localStorage.getItem('info'));

  //console.log(userInfo)

  useEffect(() => {

    let callSuccess = true;

    const reqCheckLogin = async () => {

      try {

          const response = await endpoint.post("/veriflylogin" , {user:userInfo === null ? '' : userInfo.user});  
         if(response.data.code !== 1){

              localStorage.setItem('info', null);
              setStatusTxt(true);
              

            }
        } catch (err) {
          console.error(err)
      }


    }

    if(callSuccess){
      reqCheckLogin();
    }

    return () => {

      callSuccess = false;

    }
  },[userInfo , statusTxt])


   return (<ThemeProvider theme={theme}>
            <MetaTag title="ระบบจัดการ Tongna Cottage Natural Resort" />  
            <Fragment>

                {
                    statusTxt && userInfo === null ? 

                    <SweetAlert2 
                            {...swalProps}
                            didClose={() => {
                                // run when swal is closed...
                                setSwalProps({...swalProps , show:false , title:"" ,text:"", icon: '', showConfirmButton:false});
                                setTimeout(function(){ navicate("/login") }, 500);
                            }}
                            onConfirm={result =>  {
                              
                            }}
                           
                    /> :
                 null

                }
                
            
                <HeaderDashBoard />
                <Grid container sx={{backgroundColor:"#f5f5f5" ,color:"#000"}}>
                    
                            <Grid item xs={12} md={1} sx={{mt:scaleTablet && !matches ? 0 : 10}}>
                            {
                                scaleTablet && !matches   ? <DeskTopDahBoard /> : <MobileDashboard />
                            }
                            </Grid>
                        
                            <Grid item xs={12} md={11} sx={{mt:matches ? 5 : 10 , backgroundColor:"#f5f5f5"}}>

                                <Stack spacing={2} sx={{ml:matches ? 0 : 10 , mr:matches ? 0 : 5}}>
                                <Typography variant='h6'>{titlepage} </Typography>
                                <hr/>

                                 {children}
                                 <FooterDashBoard />
                                </Stack>
                            </Grid>
                    </Grid>
                    </Fragment>
            </ThemeProvider>
  )
}

export default DrafBackend