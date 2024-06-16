import React , {useState , useEffect } from 'react';
import { Link} from 'react-router-dom';
import {Typography, Box  , IconButton , Grid, Stack}  from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SweetAlert2 from 'react-sweetalert2';
import endpoint from '../../api/endpoint';

const GalList = ({listData ,page, status}) => {

 // let navicate = useNavigate();
  const [delID  , setDelID] = useState('');
  const [conFirmDel  , setConFirmDel] = useState(false);
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
  
 useEffect(() => {

    const delImg = async () => {

        try {

          const response = await endpoint.delete("/imgmedia/del/"+delID);

          if(response.data.code === 1 ){


                   status(true);       

                   setSwalProps({...swalProps , show:true , title:"ลบข้อมูลเรียบร้อย" , showConfirmButton:true})

                   setTimeout(function() {setSwalProps({...swalProps , show:false , title:"" , showConfirmButton:false})}, 3000);

                   //setTimeout(function() { navicate('/backend/gallery');}, 5000);

          }
          
        } catch (err) {
            console.error(err)
        }

    }

    if(conFirmDel){

          delImg();

    }

    return () => {

      setConFirmDel(false);

    }
  },[delID , conFirmDel , status , swalProps])

  const modalDel  = (id) => {

    setDelID(id);
    setSwalProps({...swalProps , show:true , title:"ยืนยันการลบข้อมูล" , showConfirmButton:true})
  }


  return (<>
                <SweetAlert2 
                    {...swalProps}
                    didClose={() => {
                        // run when swal is closed...
                        setSwalProps({...swalProps , show:false })
                    }}
                    onConfirm={result =>  {
                        // run when clieked in confirm and promise is resolved...
                        if(result.isConfirmed){

                              setConFirmDel(true);
                        }
                    }}
               />
                {
                    listData.length > 0  ?
                    
                    listData.map((itm , keys) => {

                         return itm["page"] === page ? 
                                  <Grid key={keys} item xs={12} sm={6} md={4}>
                                    <Box
                                      sx={{
                                      mt:1,
                                  
                                      p:1,
                                      width: "90%",
                                      backgroundColor: '#ffffff',
                                      color:"#000",
                                      boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d",
                                      }}
                      >
                                      <img src={itm.src} style={{width:"100%"}} alt={itm.alt} />
                                      <Stack>
                                      <Typography variant='h6'>ชื่อรูป {itm.name}</Typography>
                                      <Typography paragraph>รายละเอียดรูปภาพ {itm.des}</Typography>
                                      <Typography paragraph>alt {itm.alt}</Typography>
                                      <Typography paragraph>ขนาดรูปภาพ  {itm.size.width} x {itm.size.height}</Typography>
                                      </Stack>
                                      <Stack 
                                      direction="row"
                                      justifyContent="center"
                                      alignItems="center"
                                      spacing={2}
                                      >
                                      <Link to={`/backend/gallery/edit/${itm.imgid}`} style={{textDecoration: "none"}}>
                                          <IconButton color="info" aria-label="edit" component="span" >
                                              <EditIcon fontSize='medium'/>
                                          </IconButton>
                                      </Link>
                                      <IconButton color="error" aria-label="delete" component="span" onClick={() => modalDel(itm.imgid)}>
                                              <CloseIcon fontSize='medium' />
                                      </IconButton>

                                      </Stack>
                                      </Box>
                                  </Grid>
                                 :null
                     })
                    : <Grid item xs={12}>
                          <Box sx={{ p: 2, mr:2, border: '1px dashed grey' }}>
                              <Typography variant='h6'>ไม่มีข้อมูล</Typography>
                          </Box>
                      </Grid>
                    
                  }
              </>
        
  )
}

export default GalList