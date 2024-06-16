import React , {useContext} from 'react';
import {Stack , Box , Typography ,Button  , Container} from "@mui/material";
import DataContext from '../../context/DataContext';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';


const srcset = (image, width, height, rows = 1, cols = 1) => {

    return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${
          height * rows
        }&fit=crop&auto=format&dpr=2 2x`,
      };
}
const SectionGallery = ({titletxt , loads}) => {

    console.log(titletxt)

    const {urlServer} = useContext(DataContext);

    const itemData = [
        {
          img: urlServer+'room/1695904348434m@@_poolvilla2.jpg',
          title: 'Pool Villa',
          author: '@Tongna Cottage Natural Resort',
         
        },
        {
          img: urlServer+'gallery/1697877569489_Jungle-de-cafe-water-fall-950x713.jpg',
          title: 'JUNGLE DE CAFÉ',
          author: '@JUNGLE DE CAFÉ',
         
        },
        {
            img: urlServer+'gallery/1695909883497_RecommendedFood1.jpg',
            title: 'อาหาร นานาชาติ',
            author: '@International food',
        },
        {
          img: urlServer+'gallery/1695909496316_Khantok-Set-jungledecafe-1280x768.jpg',
          title: 'อาหารพื้นเมือง แนะนำ',
          author: '@Recommend Food',
        },
        {
          img: urlServer+'gallery/1695910332839_RecommendedFood13.jpg',
          title: 'ปิ้งย่าง สไตล์ไทย',
          author: '@thai style',
        },
       
        {
          img: urlServer+'gallery/1695910282375_RecommendedFood11.jpg',
          title: 'ของหวาน และเครื่องดื่ม',
          author: '@sweet Food',
          featured: false,
        },
       
      ];



return (<Box
            sx={{
            display: 'flex',
            backgroundColor:"#f9f8f7",
            /*backgroundColor: 'primary.dark',
            '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
            },
            */
            }}
            >
                 <Container>
                 <Grid container spacing={2} sx={{pt:"30px" ,pb:"30px"}}>
                            <Grid item="true" md={12} sx={{textAlign:"center"}}>
                                <Stack>
                                    <Typography variant='h4' sx={{color:"#049899"}}>Gallery</Typography>
                                    
                                    {
                                        loads ?  <div style={{fontSize:18 }} dangerouslySetInnerHTML={{ __html:JSON.parse(titletxt.webConTh)}} /> : null
                                    }
                                   
                                    
                                </Stack>      
                            </Grid>
                           
                        </Grid>
                    <Grid container spacing={2} sx={{pb:"20px"}}>
                        <Grid item="true" md={12}>
                            <ImageList
                                sx={{
                                   
                                    // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                                    transform: 'translateZ(0)',
                                }}
                               
                                gap={1}
                                >
                                {itemData.map((item) => {
                                    const cols = item.featured ? 2 : 1;
                                    const rows = item.featured ? 2 : 1;

                                    return (
                                    <ImageListItem key={item.img} cols={cols} rows={rows}>
                                        <img
                                        {...srcset(item.img, 250, 200, rows, cols)}
                                        alt={item.title}
                                        loading="lazy"
                                        />
                                        <ImageListItemBar
                                        sx={{
                                            background:
                                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                        }}
                                        title={item.title}
                                        position="top"
                                        actionIcon={
                                            <IconButton
                                            sx={{ color: 'white' }}
                                            aria-label={`star ${item.title}`}
                                            >
                                            <StarBorderIcon />
                                            </IconButton>
                                        }
                                        actionPosition="left"
                                        />
                                    </ImageListItem>
                                    );
                                })}
                                </ImageList>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{mt:"10px" ,mb:"30px"}}>
                        <Grid item="true" md={12} sx={{textAlign:"center"}}>
                            <Button variant="outlined"  sx={{fontSize:"18px"}}>รายละเอียดเพิ่มเติม</Button>
                         </Grid>
                    </Grid>
                  
                </Container>
            
            </Box>)

}

export default SectionGallery;