import React  from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Mainbreadcrumb = ({page}) => {

    const handleClick = (e) => {

        e.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    return (<div role="presentation" onClick={handleClick}>
                <Stack 
                    direction="row" 
                    spacing={2}
                    divider={<Divider orientation="vertical" flexItem />}
                    textAlign="center" 
                    justifyContent="center" 
                    alignItems="center"
                    sx={{pt:5,background:"#f7f5ef"}}
                    >
                <Typography variant='h3'>{page}</Typography>
                </Stack>
                <Stack 
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 2 }}
                    divider={<Divider orientation="vertical" flexItem />}
                    textAlign="center" 
                    justifyContent="center" 
                    alignItems="center"
                    sx={{p:5 , background:"#f7f5ef"}}
                    >
                    <>
                    <Link to={"/"}
                    > 
                        <Chip icon={<HomeIcon sx={{ mr: 0.5 }} fontSize="medium" />} label="Home" sx={{fontSize:22 , cursor:"pointer"}} />

                    </Link>
                    </>
                    {
                            page === "pool-villa" || page === "Villa" || page === "family-pool-villa" ?  
                           <>
                            <Link to={"/accommodation"}  style={{ textDecoration: 'none' , color:"#fff" }}> 
                            <Typography
                                    sx={{ display: 'flex', alignItems: 'center' , fontSize:20}}
                                    color="text.primary"
                                    
                                > 
                            <MeetingRoomIcon />   
                                Accommodation
                            </Typography>
                            </Link>
                            <Typography
                                    sx={{ display: 'flex', alignItems: 'center' , fontSize:20 }}
                                    color="text.primary"
                                    
                                >  
                               <KeyboardArrowRightIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                {page}
                            </Typography>
                            </> 
                            : 
                            <>
                            <Typography
                                    sx={{ display: 'flex', alignItems: 'center' , fontSize:22 }}
                                    color="text.primary"
                                    
                                >  
                                <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                {page}
                            </Typography>
                           
                            </>

                        }
                 
                </Stack>
              
            </div>)

}

export default Mainbreadcrumb