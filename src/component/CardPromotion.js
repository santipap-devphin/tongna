import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CardPromotion = ({data}) => {

    return ( <Card sx={{ boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , 
                        '&:hover': {
                        backgroundColor: '#fff',
                        border: 0.5 , 
                        borderRadius: "15px",
                        borderStyle:"ridge",
                        borderColor:"gray",
                        cursor:"pointer",
                        opacity: [0.9, 0.8, 0.7],
                    },}}>
                           
                        <img src={data.src} style={{width:"100%" , height: 260}} alt={data.alt} />
                        <CardContent>
                            <Typography style={{textAlign:"center"}} gutterBottom variant="h5" component="div">
                                    {data.des.toUpperCase()}
                            </Typography>
                        </CardContent>
             </Card>)
    }

export default CardPromotion;