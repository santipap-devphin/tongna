import React , {useEffect , useState} from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EventsList from './EventsList';
import endpoint from '../../api/endpoint';

const EventsMain = () => {

    const [listEvents, setListEvents] = useState([]);
    const [statusEvents , setStatusEvents] = useState(false);
    const [prvListEvent , setPrvListEvent] = useState([]);
    const [statusDel , setStatusDel] = useState(false);
    const [delID, setDelID] = useState('');
    let pages = 1;
    
    const [searchData , setSearchData] = useState('');

    useEffect(() => {

        let callSucces = true;

        const reqEvents = async () => {

            try {

                const response = await endpoint.get("eventsact/all");
                if(response.data.code === 1){

                    console.log(response)
                    setListEvents(response.data.list);
                    setPrvListEvent(response.data.list);
                    setStatusEvents(true);

                }
                console.log(response)
                
            } catch (err) {
                console.error(err);
            }

        }

        if(callSucces){

            reqEvents();

        }

        return () => {

            callSucces = false;
        }


    },[])

    useEffect(() => {

        const confirmDelte = async () => {

                    try {

                        const response = await endpoint.delete("/eventsact/del"  , {data:{id:delID}});
                        if(response.data.code === 1){
                             setListEvents(response.data.list);
                             setPrvListEvent(response.data.list);
                        }   
                        
                    } catch (err) {
                        console.error(err)
                    }


     }

     if(statusDel){

        confirmDelte();
     }
    },[statusDel , delID])
    

    const locateAdd = () => {

        window.location = "/backend/events/add"
      }

     const changePage = () => {
     }
     const searchVal = (e) => {

        var vals = e.target.value;
        setSearchData(vals)
        if(vals !== ""){
            let newData = [];
            prvListEvent.forEach((ele) => {

                if(ele.eventsTitle.toLowerCase().includes(vals) || ele.eventsCate.toLowerCase().includes(vals)){
                    newData.push(ele)
                }
            })
            setListEvents(newData)
        }else{

            setListEvents(prvListEvent)

        }

     }

  return (<Box
            sx={{
            m:1,
            p:1,
            width: "99%",
            backgroundColor: 'transparent',
            
            }}
            >
            <Grid container spacing={2} >
                    <Grid item xs={12} sm={11} sx={{mt:1 , mb:2}}>
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
                    <Grid item xs={12} sm={1} sx={{mt:1 , mb:2}}>
                        <Button variant="contained" color="info" sx={{height:48}} onClick={locateAdd}><AddIcon/>เพิ่ม</Button>
                    </Grid>
            </Grid>
            <Grid container spacing={2}>
                {
                    statusEvents ?  <EventsList listData= {listEvents} setStatusDel={setStatusDel} setDelID = {setDelID} /> : "ไม่มีข้อมูล"
                }
            </Grid>
            <Stack spacing={2} sx={{mt:3}} alignItems="center">
                    <Pagination count={pages} color="primary" onChange={changePage} />
            </Stack>
        </Box>
    )
}

export default EventsMain