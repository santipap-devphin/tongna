import React  , {useContext} from 'react';
import DataContext from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2'; 


const CardActivity = ({lists}) => {

    let navicate = useNavigate();

    const {urlServer ,convertDate} = useContext(DataContext);

    const goTo = (e) => {

        e.preventDefault();
        navicate("/events/"+lists.eventsTitle+"/"+lists.eventsID);

    }
    return (
            <Card sx={{  boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" 
                 }}>
                    <CardMedia
                    sx={{ 
                        height: 250 ,
                     }}
                    image={urlServer+lists.eventsImglist[0]}
                    title={lists.eventsTitle}
                    />
                   
                    <CardContent>
                    <Typography variant='h6'>{lists.eventsTitle}</Typography>
                  
                    <div key={1} dangerouslySetInnerHTML={{ __html:JSON.parse(lists.eventsDes).substring(0,200) + "....." }} />
                    <Stack 
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{mt:1}}
                        spacing={3}
                       >
                        <Typography variant='p'>{convertDate(lists.eventsLog)}</Typography>
                      
                    </Stack>
                    <Button variant="outlined" onClick={(e) => goTo(e)}>อ่านต่อ ...</Button> 
                    </CardContent>
                    <Divider>
                        <Chip label="Tags" />
                    </Divider>
                    <Grid container spacing={2} sx={{p:2}}>
                            {
                                lists.eventsTag.map((itm , i) => {
                                    return   <Grid key={i} item="true" xs={12} md={3}><Chip label={itm} color="warning" /></Grid>
                                })
                            }
                    </Grid>
                </Card>)

}

export default CardActivity;
