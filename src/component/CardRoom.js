import  React  , {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';


const CardRoom = ({id, title , roomen , rec , adults , sizeroom , thumb}) => {

    const {urlServer} = useContext(DataContext);

    let navicate  = useNavigate();

    const haddleClk = (id , title) => {

        navicate("/accommodation/"+title+"/"+id);

    }
    return (
            <Card sx={{  boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , 
                '&:hover': {
                backgroundColor: '#fff',
                border: 0.3 , 
                borderStyle:"ridge",
                borderColor:"gray",
                cursor:"pointer",
                opacity: [0.9, 0.8, 0.7],
              },}}>
                    <CardMedia
                    sx={{ 
                        height: 260 ,
                     }}
                    image={urlServer+thumb}
                    title={title}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    {
                    <Typography variant="div" color="text.secondary">
                         <div style={{fontSize:16 , lineHeight:1.4 }} dangerouslySetInnerHTML={{ __html:rec}} />
                    </Typography>
                    }
                    </CardContent>
                     <Grid container spacing={2} sx={{pt:2 , pb:2}} >
                                <Grid item="true" md={6}>
                                    <Typography variant='p' sx={{p:1}}>{adults} GUESTS / Size: {sizeroom}</Typography>
                                </Grid>
                                <Grid item="true" md={6} sx={{textAlign:"right"}}>
                                    <Button variant='contained' sx={{mb:1,mr:1}} onClick={() => haddleClk(id , roomen)}>Detail</Button>
                              </Grid>
                               
                    </Grid>
               </Card>)

}

export default CardRoom;
