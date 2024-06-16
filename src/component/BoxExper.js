import React ,{useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const BoxExper = ({id , title , txtdes , thumb , size }) => {

  const {urlServer} = useContext(DataContext);
  const [expanded, setExpanded] = useState('');
  let navicate = useNavigate();
  let imgUnkhow = '../../image/hightlight.jpg';

  const mouseEnter = (panel) => {
    console.log('in');
    setExpanded(panel)
  }
  const mouseLeave = () =>{

    setExpanded('')
  }
  const goDetail = (title , id) => {

    const sp_id = id.split("panel");

    navicate("/experience/"+title+"/"+sp_id[1]);

  }
 return (
    <>
    <Box
        sx={{
        boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d",
        position:"relative",
        minHeight:size ? "385px" : "550px",
        cursor:"pointer",
        backgroundPosition: "top center",
        backgroundRepeat:"no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${thumb !== "no" ? urlServer+thumb :imgUnkhow})`,
        '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
        },
        }
        
      }
      onMouseEnter={(e) => mouseEnter(id)} onMouseLeave={mouseLeave} >

        <Box sx={{ position:"absolute" , bottom:2 , width:"95%" , p:"2.5%" }}>
        <Accordion expanded={expanded === id} sx={{p:1}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {txtdes}
            </Typography>
            <Button variant="outlined" sx={{mt:3}} onClick={() => goDetail(title , id)}>รายละเอียด</Button>
          </AccordionDetails>
        </Accordion>
       
        </Box>
     </Box>
    </>
  )
}

export default BoxExper
