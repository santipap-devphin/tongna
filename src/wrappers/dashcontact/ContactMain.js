import React , {useEffect , useState , useContext} from 'react';
import DataContext from '../../context/DataContext';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import endpoint from '../../api/endpoint';

const ContactMain = () => {

    let pages = 1;
    const [listMsg , setListMsg] = useState([]);
    const [prvListMsg , setPrvListMsg] = useState([]);
    const [loads , setLoads] = useState(false);
    const [searchData , setSearchData] = useState('');
    const {convertDate} = useContext(DataContext);

    const changePage = () => {
    }
    const searchVal = (e) => {

       var vals = e.target.value;
       setSearchData(vals)
       if(vals !== ""){
        let newData = [];
        prvListMsg.forEach((ele) => {

            if(ele.day.toLowerCase().includes(vals) || ele.months.toLowerCase().includes(vals) || ele.name.toLowerCase().includes(vals)){
                newData.push(ele);
            }   

        })
        setListMsg(newData);

       }else{
        setListMsg(prvListMsg);
       }

    }

    useEffect(() => {
    let callSuccess = true;
    const reqContact = async () => {

        try {
            const response = await endpoint.get("/contact/all");
            //console.log(response.data.list)
            if(response.data.code === 1){

                response.data.list.forEach((ele) => {

                    //const sp_time = ele.time.split("_");
                    const sp_data = convertDate(ele.time).split(" ");
                    ele["day"] = sp_data[0];
                    ele["months"] = sp_data[1];
                    ele["year"] = sp_data[2];

                })

                console.log(response.data.list)
                setListMsg(response.data.list);
                setPrvListMsg(response.data.list)
                setLoads(true);
             }
            
        } catch (err) {
            console.error(err)
        }


    }

    if(callSuccess){
        reqContact();
    }

    return () => {

        callSuccess = false;

    }


    },[convertDate])

  return ( <Box
            sx={{
            m:1,
            p:1,
            width: "99%",
            backgroundColor: 'transparent',
            
            }}
            >
            <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} sx={{mt:1 , mb:2}}>
                        <TextField
                            label="ค้นหา"
                            id="filled-start-adornment"
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                            }}
                            size="small"
                            variant="filled"
                            value={searchData}
                            onChange={searchVal}
                            fullWidth
                            />
                    </Grid>
            </Grid>
            <Grid container spacing={2}>

                    {
                        loads && listMsg.length > 0 ?

                        listMsg.map((ele , i) => {

                            return (<Grid key={i} item xs={12} sm={6} md={4}>
                                        <Card sx={{ minWidth: 275 }}>
                                            <CardContent>
                                                <Typography variant='h5' color="text.secondary">
                                                    ติดต่อ {convertDate(ele.time)}
                                                </Typography>
                                                <Divider />
                                                <Typography paragraph sx={{pt:1 , pb:1}}>
                                                {ele.message}
                                                </Typography>
                                            
                                                <Box >
                                                <Chip label="อีเมล์" />: {ele.email}
                                                <br /> <br />
                                                <Chip label="โทร" />: {ele.tel}
                                                <br /> <br />
                                                <Chip label="คุณ" />: {ele.name}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                            )

                        })
                        :<Grid item xs={12}> 
                            <Box sx={{ p: 2, mr:2, border: '1px dashed grey'}}>
                                <Typography variant='h6'>ไม่มีข้อมูล</Typography>
                            </Box>
                        </Grid>
                       
                    }
            </Grid>
            <Stack spacing={2} sx={{mt:3}} alignItems="center">
                    <Pagination count={pages} color="primary" onChange={changePage} />
            </Stack>
        </Box>
  )
}

export default ContactMain