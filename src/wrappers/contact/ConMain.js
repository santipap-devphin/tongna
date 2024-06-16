import React  , {useState} from 'react';
import {Stack , Box , Typography ,Button  , Container , Divider , Chip , TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2'; 
import SweetAlert2 from 'react-sweetalert2';
import { BsLine , BsFacebook } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
import endpoint from '../../api/endpoint';

function ConMain() {

  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [message , setMessage] = useState('');
  const [tel , setTel] = useState('');

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

    const msgAlert = (mes , icons , types) => {

        if(types === "error"){

            setSwalProps({...swalProps , show:true , icon:icons , title:"ข้อความจากระบบ" , text:mes})
            setTimeout(function(){setSwalProps({...swalProps , show:false , icon:"", title:"" , showConfirmButton:false}) }, 2000);
        }
        else if(types === "success"){

            setSwalProps({...swalProps , show:true , icon:icons , title:"ข้อความจากระบบ" , text:mes})
            setEmail('');
            setName('');
            setMessage('');
            setTimeout(function(){setSwalProps({...swalProps , show:false , icon:"", title:"" , showConfirmButton:false}) }, 2000);
            
            

        }else{

            setTimeout(function(){setSwalProps({...swalProps , show:false , icon:"", title:"", cancelButtonText:"ปิด" , showConfirmButton:false}) }, 500);

        }
    }

  const handleClk = (id) => {

    if(id === "ig"){
        
        window.open("https://www.instagram.com/tongnacottage/");

    }else if(id === "facebook"){
       
        window.open("https://www.facebook.com/tongnacottage");
    }
    else if(id === "line"){
        
        window.open("https://line.me/R/ti/p/@317avsyc");
    }
    else {
        window.open("https://www.tiktok.com/@tongnacottage");
    }
  }

  const subFrm = async (e) => {

    e.preventDefault();

    if(name && email && message && tel){

        try {
            const response = await endpoint.post("/contact/msg" , {name,email,message,tel});
            if(response.data.code === 1){

                msgAlert("ส่งข้อความสำเร็จ" , "success" , "success")

            }
            
        } catch (err) {
            console.error(err)
        }

    }else{

        if(name === ""){

            msgAlert("กรุณากรอกชื่อ-นามสกุล" , "error" , "error")

        }
        else if(email === ""){

            msgAlert("กรุณากรอกอีเมล์" , "error" , "error")

        }
        else if(message === ""){

            msgAlert("กรุณากรอกข้อความที่ต้องการติดต่อ" , "error" , "error")

        }
        else if(tel === ""){
            msgAlert("กรุณากรอกหมายเลขโทรศัพท์ติดต่อกลับ" , "error" , "error")
        }

    }

  }

  return (
        <Box
        sx={{
        display: 'flex',
        }}
        >
             <Container>
             <SweetAlert2 
                {...swalProps}
                didClose={() => {
                    // run when swal is closed...
                    setSwalProps({...swalProps , show:false })
                }}
                onConfirm={result =>  {
                    // run when clieked in confirm and promise is resolved...
                    if(result.isConfirmed){

                         setEmail('');
                         setName('');
                         setMessage('');
                    }
                }}
                 />
                <Grid container spacing={3}   sx={{mt:5 , mb:5}}>
                    <Grid item="true" xs={12} md={4}>
                         <Stack spacing={3} sx={{textAlign:"center" , background:"#F5F5F5",boxShadow: "0 0px 10px 0px rgb(0 0 0 / 10%)" , transformStyle: "preserve-3d"}}>
                            <Typography variant='h5' >Address</Typography>
                            <Typography paragraph>200 หมู่6 ตำบล ขุนคง อำเภอหางดง, ตำบล ขุนคง, หางดง, จังหวัดเชียงใหม่, ไทย</Typography>
                         </Stack>
                    </Grid>
                    <Grid item="true" xs={12} md={4}>
                        <Stack spacing={3} sx={{textAlign:"center", background:"#F5F5F5",boxShadow: "0 0px 10px 0px rgb(0 0 0 / 10%)" , transformStyle: "preserve-3d" , pb:3}}>
                            <Typography variant='h5' >Phone</Typography>
                            <Typography paragraph>061 – 154 – 5053</Typography>
                         </Stack>
                    </Grid>
                    <Grid item="true" xs={12} md={4} >
                        <Stack spacing={3} sx={{textAlign:"center" , background:"#F5F5F5",boxShadow: "0 0px 10px 0px rgb(0 0 0 / 10%)" , transformStyle: "preserve-3d"  , pb:3}}>
                            <Typography variant='h5' >Email</Typography>
                            <Typography paragraph>reception.tongna@gmail.com</Typography>
                         </Stack>
                    </Grid>
                </Grid>
                <Divider sx={{mt:5 , mb:5}}>
                    <Chip label="Contact" sx={{fontSize:24}} />
                </Divider>
              
                <form onSubmit={subFrm}>
                <Grid container spacing={3} sx={{background:"#e9f2fa" , p:2}}>

                     <Grid item="true" xs={12} md={4} >
                         <TextField 
                            label="ชื่อ-นามสกุล"  
                            variant="filled" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth/>
                     </Grid>
                     <Grid item="true" xs={12} md={4} >
                         <TextField 
                          
                            label="โทร" 
                            variant="filled" 
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                            fullWidth/>
                     </Grid>
                     <Grid item="true" xs={12} md={4} >
                         <TextField 
                            type='email'
                            label="อีเมล์" 
                            variant="filled" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth/>
                     </Grid>
                     <Grid item="true" xs={12} md={12} >
                         <TextField 
                         label="ข้อความติดต่อ" 
                         variant="filled" 
                         value={message}
                         onChange={(e) => setMessage(e.target.value)}
                         multiline
                         rows={4}
                         fullWidth/>
                     </Grid>
                     <Grid item="true" xs={12} md={12} >
                         <Button type='submit' variant="contained" style={{background:"#d9d0bd" , color:"#000"}}>ส่งข้อมูล</Button>
                     </Grid>
                 </Grid>
                 </form>

                <Stack 
                    direction="row" 
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    divider={<Divider orientation="vertical" flexItem />}
                    sx={{mt:5 , mb:5}}
                    
                    >
                            <IconButton size="large" onClick={() => handleClk("facebook")}>
                               <BsFacebook  />
                            </IconButton>
                            <IconButton size="large" onClick={() => handleClk("line")}>
                                <BsLine />  
                            </IconButton>
                            <IconButton size="large" onClick={() => handleClk("ig")}>
                                <ImInstagram  />
                            </IconButton>
                            <IconButton size="large" onClick={() => handleClk("tiktok")}>
                                <FaTiktok  />
                            </IconButton>

                </Stack>
             
               
             </Container>
            
        </Box>
  )
}

export default ConMain