import React , {useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import imgblank from '../assets/img/mockroom.jpg';
import SweetAlert2 from 'react-sweetalert2';
import endpoint from '../api/endpoint';

const BlockRoom = ({rId ,rTitle ,rReccom, rDate , rImg  , SetstatusCompleate , listRoom}) => {

  let navicate = useNavigate();
  const {urlServer} = useContext(DataContext);

  //console.log(listRoom)

  const label = { inputProps: { 'aria-label': 'Switch active' } };

  const [swalProps, setSwalProps] = useState({});
  const [swalPropsSub, setSwalPropsSub] = useState({
    show: false,
    title: 'ลบข้อมูลเสร็จสิ้น',
    text: '',
    icon: 'success'
   });
 

  const clkOpenModal = (id) => {

    setSwalProps({
        show: true,
        title: 'ยืนยันการลบข้อมูล'+ id,
        text: 'กรุณากด OK เพื่อยืนยัน',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText:"OK",
        cancelButtonText:"Cancel"
    });

   

  }
  const locateedit = (id) => {

    window.location = "/backend/room/edit/"+id
  }

  async function delRoom(id) {
   
         try {

            const response = await endpoint.delete("/roomcate/delete/"+id)
            if(response.data.code === 1){

                setSwalProps({...swalProps , show:false })
                setSwalPropsSub({...swalPropsSub , show:true })

                setTimeout(function() {
                    
                    setSwalPropsSub({...swalPropsSub , show:false })
                    SetstatusCompleate(true)

               }, 1000);

            }
            
        } catch (err) {
             console.error(err)
        }


 }

 const showView = (id) => {

    const findData =  listRoom.find((itm) => itm.id === parseInt(id))

    navicate("/accommodation/"+findData.url+"/"+rId)
    //console.log(findData.url)
 }

  return (<>
            <Card sx={{boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" }}>
            
            <SweetAlert2 
            {...swalProps}
            didClose={() => {
                // run when swal is closed...
                setSwalProps({...swalProps , show:false })
            }}
            onConfirm={result =>  {
                // run when clieked in confirm and promise is resolved...
                 if(result.isConfirmed){

                         delRoom(rId)
                }
            }}
            />
            <SweetAlert2 {...swalPropsSub} />
            <CardHeader
                title={rTitle}
                subheader={rDate}
            />
            <CardMedia
                component="img"
                height="194"
                image={rImg !== "" ? `${urlServer+rImg}` : imgblank}
                alt="Paella dish"
            />
            <CardContent>

                <Typography paragraph>{rReccom.substring(0,400)}</Typography>
               
            </CardContent>
            <CardActions disableSpacing>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Switch {...label} checked={true} />  
                    </Grid>
                    <Grid item xs={6} textAlign="right">

                            <IconButton aria-label="view" onClick={() => showView(rId)}>
                                <RemoveRedEyeIcon />
                            </IconButton>
                             <IconButton aria-label="edit" onClick={() => locateedit(rId)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="del" onClick={() => clkOpenModal(rId)}>
                                <DeleteIcon />
                            </IconButton>
                    </Grid>
                </Grid>
            </CardActions>
            </Card>
          
        </>  
    )
}

export default BlockRoom