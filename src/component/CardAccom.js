import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import WifiIcon from '@mui/icons-material/Wifi';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PoolIcon from '@mui/icons-material/Pool';
import SpaIcon from '@mui/icons-material/Spa';


const CardAccom = ({data , server}) => {

let navicate = useNavigate();
const [expanded, setExpanded] = useState(false);

let roomID = data.id;
let roomSlug = data.roomnameen;

const handleExpandClick = () => {
    //nsole.log(expanded)
    setExpanded(!expanded);
  };
const goToUrl = (e , id) => {

    e.preventDefault();
    navicate(`/accommodation/${roomSlug}/`+id)
}

return  (<Card sx={{ boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , 
            '&:hover': {
            backgroundColor: '#fff',
            border: 0.5 , 
            borderRadius: "15px",
            borderStyle:"ridge",
            borderColor:"gray",
            cursor:"pointer",
            opacity: [0.9, 0.8, 0.7],
            },}}>
             <Box
                sx={{
                    display:"flex",
                    position:"absolute",
                    right:1,
                    zIndex:9
                    
             }}
            >
               <Button variant="contained" href="#outlined-buttons" size='small' style={{background:"#fff" , color:"#000"}} onClick={(e) => goToUrl(e , roomID)}>
                        รายละเอียด
              </Button>    
             </Box>
            <CardMedia
            component="img"
            height="200"
            image={server+data.imgthumb}
            alt={data.roomnameen}
            />
             <CardContent>
                <Typography variant='h5' sx={{p:0.5,color:"#006f70"}}> {data.roomnameen} </Typography>
                <Typography sx={{p:0.5}} paragraph> {data.roomrecommend.substring(0,150)+ "....." } </Typography>
                <Typography sx={{p:0.5 , color:"#006f70"}}>ผู้เข้าพัก {data.sizeadults} ท่าน /ขนาดห้อง {data.sizeroom} ตารางเมตร </Typography>
             </CardContent>
          
            
            <Grid container spacing={2} sx={{ml:"5px",mr:"5px" , mb:"5px"}}>
                <Grid item="true" md={8}>
                    <Stack  spacing={2} direction="row">
                        <WifiIcon />
                        <LocalDiningIcon />
                        <PoolIcon />
                        <SpaIcon />
                    </Stack>
                </Grid>
                 <Grid item="true" md={4}>
                    <ExpandMoreIcon
                        expand={expanded.toString()}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        style={{float:"right"}}
                    />
                </Grid>
            </Grid>
           
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3  , pb:3}}>
            <Divider>
                <Chip label="สิ่งอำนวยความสะดวก" sx={{fontSize:18}} />
            </Divider>

            {
                data.amenities.length > 0 ?

                data.amenities.map((ele , i) => {

                         return <Stack key={i} spacing={2} direction="row" alignItems="center">
                                    <Typography variant='h6' sx={{textAlign:"left"}}>{ele}</Typography>
                                    <CheckCircleIcon sx={{color:"green"}}/>
                                </Stack>


                })
                :null
             }
            </Box>
            </Collapse>
            </Card>
            );

        }

export default CardAccom;
