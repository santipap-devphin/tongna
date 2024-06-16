import React , {useState , useContext} from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DataContext from '../context/DataContext';
import SweetAlert2 from 'react-sweetalert2';
import endpoint from '../api/endpoint';

const CardExperience = ({exID , exTitle , exDate , exImg , exCate , exHighlight , setstatusCompleate}) => {

  const [chkSwitch , setchkSwitch] = useState(true);
  const {convertDate , urlServer} = useContext(DataContext);

  const [swalProps, setSwalProps] = useState({});
  const [swalPropsSub, setSwalPropsSub] = useState({
    show: false,
    title: 'ลบข้อมูลเสร็จสิ้น',
    text: '',
    icon: 'success'
   });

   const clkOpenModal = (vals) => {

    setSwalProps({
        show: true,
        title: 'ยืนยันการลบข้อมูล'+ vals,
        text: 'กรุณากด OK เพื่อยืนยัน',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText:"OK",
        cancelButtonText:"Cancel"
    });
  }

  async function delExper(id) {
   
    try {

       const response = await endpoint.delete("/experience/del/"+id)
       if(response.data.code === 1){

           setSwalProps({...swalProps , show:false })
           setSwalPropsSub({...swalPropsSub , show:true })

           setTimeout(function() {
               
               setSwalPropsSub({...swalPropsSub , show:false })
               setstatusCompleate(true)

          }, 1000);

       }
       
   } catch (err) {
        console.error(err)
   }


}

  const label = { inputProps: { 'aria-label': 'Switch active' } };

  return (<Card sx={{boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" }}>
            <SweetAlert2 
                    {...swalProps}
                    didClose={() => {
                        // run when swal is closed...
                        setSwalProps({...swalProps , show:false })
                    }}
                    onConfirm={result =>  {
                        // run when clieked in confirm and promise is resolved...
                        if(result.isConfirmed){

                                delExper(exID)
                        }
                    }}
             />
            <CardHeader
                title={exTitle}
                subheader={convertDate(exDate)}
            />
            <CardMedia
                component="img"
                height="194"
                image={urlServer + exImg}
                alt={exTitle}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                        {exHighlight}
                 </Typography>
                <Typography variant="p" color="text.secondary">
                    
                    <Chip key={0} label={exCate} sx={{mt:1,mr:1}} />

                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Switch {...label} checked={chkSwitch} onChange={() => setchkSwitch(!chkSwitch)} />  
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                        <Link to={`/experience/${exTitle}/${exID}`} style={{textDecoration: "none"}}>
                            <IconButton aria-label="views" >
                                <RemoveRedEyeIcon />
                            </IconButton>
                        </Link>
                        <Link to={`/backend/experience/edit/${exID}`} style={{textDecoration: "none"}}>
                            <IconButton aria-label="edit" >
                                <EditIcon />
                            </IconButton>
                        </Link>
                    <IconButton aria-label="del" onClick={() => clkOpenModal(exID)}>
                        <DeleteIcon />
                    </IconButton>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
  )
}

export default CardExperience