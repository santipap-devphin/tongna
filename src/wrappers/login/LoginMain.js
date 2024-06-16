import React  , {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; 
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SweetAlert2 from 'react-sweetalert2';
import endpoint from '../../api/endpoint';

const LoginMain  = () => {

    let navicate = useNavigate();
    const [userName , setUserName] = useState('');
    const [passW , setPassW] = useState('');
    
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const clearSwal = () => {

          setTimeout(function(){ setSwalProps({...swalProps , show:false , title:"" ,text:"", icon: '', showConfirmButton:false});  }, 2000);

    }
    const [swalProps, setSwalProps] = useState({
        show: false,
        title: '',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: false,
        confirmButtonText:"OK",
        cancelButtonText:"Cancel"
    });

    const submitLogin = async (e) => {

        e.preventDefault();
        let msg = "";

        if(userName && passW){

            try {
                const response = await endpoint.post("/login" , {data:{user:userName , pass:passW}});

                if(response.data.code === 1){

                        var userInfo = {user:response.data.list.user , token:response.data.list.token}

                        localStorage.setItem('info', JSON.stringify(userInfo));

                        setSwalProps({...swalProps , show:true , icon:"success" , title:"ข้อความจากระบบ" , text:"กำลังดำเนินการเข้าสู่ระบบ"})

                        setTimeout(function(){ navicate("/backend/") }, 2000);
                        

                }
                else if(response.data.code === 6){

                    setSwalProps({...swalProps , show:true , icon:"error" , title:"ข้อความจากระบบ" , text:"ไม่มี Username นี้ในระบบ"})
                    clearSwal();

                }
                else if(response.data.code === 7){
                    setSwalProps({...swalProps , show:true , icon:"error" , title:"ข้อความจากระบบ" , text:"รหัสผ่านของคุณไม่ถูกต้อง"})
                    clearSwal();

                }
                
                
            } catch (err) {
                console.log(err);
            }
            

        }else{

            if(userName === ""){

                msg = "กรุณากรอก Username";
            }
            else if(passW === ""){
                msg = "กรุณากรอก รหัสผ่าน";
            }

            setSwalProps({...swalProps , show:true , icon:"error" , title:"ข้อความจากระบบ" , text:msg})
            clearSwal();
        }
    }

  return (
    <Box
        sx={{ display: 'flex', mx: '2px', transform: 'scale(0.8)'}}
    >
        <SweetAlert2 
                    {...swalProps}
                    didClose={() => {
                        // run when swal is closed...
                       setSwalProps({...swalProps , show:false , title:"" ,text:"", icon: '', showConfirmButton:false});
                    }}
                    onConfirm={result =>  {
                        // run when clieked in confirm and promise is resolved...
                        if(result.isConfirmed){

                            //navicate("/backend/gallery");
                        }
                    }}
         />
        <Container>
            <form onSubmit={submitLogin}>
            <Grid container spacing={2} sx={{boxShadow: "0 0px 10px 0px rgb(0 0 0 / 10%)" , transformStyle: "preserve-3d"}}>
                <Grid item="true" md={4}>
                  <img src="../../image/imglogin2.jpg" style={{width:"100%"}} alt="รูปภาพเข้าสู่ระบบ" />
                 </Grid>
                 <Grid item="true" md={8}>
                    <Stack spacing={2} sx={{ p:2}}>
                       
                        <Typography variant='h3'>ยินดีต้อนรับเข้าสู่ระบบ</Typography>
                        <Typography variant='p'>Lorem ipsum is placeholder text commonly used in the graphic</Typography>
                      
                        <FormControl sx={{ m: 1}} variant="filled" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
                            <FilledInput
                                id="username"
                                type="text"
                                color="secondary"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="username"
                                    edge="end"
                                    >
                                     <AccountCircle />
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1}} variant="filled" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <FilledInput
                                id="frmpassword"
                                type={showPassword ? 'text' : 'password'}
                                color="secondary"
                                value={passW}
                                onChange={(e) => setPassW(e.target.value)}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Button type='submit' color="primary" variant="contained" style={{color:"#fff" , fontSize:20 , maxWidth:300 , marginTop:"30px"}} endIcon={<AdsClickIcon />}>ยืนยัน</Button>
                        <Typography variant='p'>ลืมรหัสผ่าน</Typography>
                    </Stack>
                 </Grid>
                              
            </Grid>
            </form>
         </Container>
        
    </Box>
  )
}

export default LoginMain