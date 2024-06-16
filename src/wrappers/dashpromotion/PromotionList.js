import React , {useState , useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
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
import { Stack } from '@mui/material';
import DataContext from '../../context/DataContext';
import SweetAlert2 from 'react-sweetalert2';
import endpoint from '../../api/endpoint';


const PromotionList = ({id , title , des , img , sdate , edate , status , success}) => {

    const [statusDel , setStatusDel] = useState(false);
    const [chkSwitch , setchkSwitch] = useState(status === "true" ? true : false);
    const {urlServer , convertDateThai} = useContext(DataContext);
    const [delID , setDelID] = useState('');
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
    let paramID = id;
  
    const delPromo = async () => {

        success(false);

        try {

            const response  = await endpoint.delete("/promotion/del" , {data:{id:delID}});
            if(response.data.code === 1 ){

                success(true)
            }
            
        } catch (msg) {
            console.error(msg) 
        }

    }

   const clkOpenModal = (id) => {

        setDelID(id);
       
        setSwalProps({...swalProps , show:true , title:"ยืนยันการลบข้อมูล" , showConfirmButton:true})
   }

   useEffect(() => {

    if(statusDel){

        
        delPromo();
    }



   },[statusDel ,delID])
   
   
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
            <Grid item xs={12} sm={6} md={4}>
                <Card sx={{boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" }}>
                <CardHeader
                    title={title}
                    
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={urlServer+img[0]}
                    alt={"promotion " +title}
                />
                <CardContent>
                {
                    <div dangerouslySetInnerHTML={{ __html:JSON.parse(des).substring(0,300) + "....." }} />
                }
                   <Stack 
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                     >
                   <Typography>เริ่ม {convertDateThai(sdate)}</Typography>
                   <Typography>สิ้นสุด {convertDateThai(edate)} </Typography>
                   </Stack>
                </CardContent>

                <CardActions disableSpacing>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Switch {...label} checked={chkSwitch} onChange={() => setchkSwitch(!chkSwitch)} />  
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <Link to={`/backend/promotion/edit/${paramID}`} style={{textDecoration: "none"}}>
                                <IconButton aria-label="edit" >
                                    <EditIcon />
                                </IconButton>
                            </Link>
                        <IconButton aria-label="del" onClick={() => clkOpenModal(paramID)}>
                            <DeleteIcon />
                        </IconButton>
                        </Grid>
                    </Grid>
                </CardActions>
                </Card>
            </Grid>
        </>
        )
}

export default PromotionList