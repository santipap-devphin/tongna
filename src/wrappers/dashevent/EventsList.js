import React , {useState , useContext} from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DataContext from '../../context/DataContext';
import SweetAlert2 from 'react-sweetalert2';


const EventsList = ({listData , setStatusDel  , setDelID}) => {

    const {convertDate , urlServer} = useContext(DataContext);
    const [chkSwitch , setchkSwitch] = useState(true);
    
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

   const clkOpenModal = (id) => {

        setDelID(id);
        setSwalProps({...swalProps , show:true , title:"ยืนยันการลบข้อมูล" , showConfirmButton:true})

   }
 
   const label = { inputProps: { 'aria-label': 'Switch active' } };

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

                                setStatusDel(true);
                        }
                    }}
                />
                {
                    listData.length > 0 ?

                    listData.map((ite , keys) => {

                        return   <Grid key={keys} item xs={12} sm={4}>
                                        <Card sx={{boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" }}>
                                        <CardHeader
                                            title={ite.eventsTitle}
                                            subheader={convertDate(ite.eventsLog)}
                                        />
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={urlServer + ite.eventsImglist[0]}
                                            alt="Paella dish"
                                        />
                                        <CardContent>
                                      
                                         {
                                            <div dangerouslySetInnerHTML={{ __html:JSON.parse(ite.eventsDes).substring(0,300) + "....." }} />
                                         }
                                       
                                            
                                            <Typography variant="body2" color="text.secondary">
                                                หมวดหมู่ 
                                            </Typography>
                                            <Typography variant="p" color="text.secondary">
                                                
                                            <Chip label={ite.eventsCate} sx={{mt:1,mr:1}} />
                    
                                            </Typography>
                                        </CardContent>
                    
                                        <CardActions disableSpacing>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Switch {...label} checked={chkSwitch} onChange={() => setchkSwitch(!chkSwitch)} />  
                                                </Grid>
                                                <Grid item xs={6} textAlign="right">
                                                    <Link to={`/events/${ite.eventsTitle}/${ite.eventsID}`} style={{textDecoration: "none"}}>
                                                         <IconButton aria-label="views" >
                                                            <RemoveRedEyeIcon />
                                                        </IconButton>
                                                    </Link>
                                                    <Link to={`/backend/events/edit/${ite.eventsID}`} style={{textDecoration: "none"}}>
                                                         <IconButton aria-label="edit" >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Link>
                                                <IconButton aria-label="del" onClick={() => clkOpenModal(ite.eventsID)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                </Grid>
                                            </Grid>
                                        </CardActions>
                                        </Card>
                                    </Grid>
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

export default EventsList