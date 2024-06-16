import React , {useEffect , useState , useContext} from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import BlockRoom from '../../component/BlockRoom';
import DataContext from '../../context/DataContext';
import endpoint from '../../api/endpoint';
import { Typography } from '@mui/material';

const RoomList = () => {
 
    const {convertDate} = useContext(DataContext)
    const [statusReq , setStatusReq] = useState(true);
    const [listRoom, setListRoom] = useState([]);
    const [prvListRoom, setPrvListRoom] = useState([]);
    let pages = 1;
    const [searchData , setSearchData] = useState('');
    const [statusComplete , SetstatusCompleate] = useState(false);
    const [listRoomView , setListRoomView] = useState([]);

    const locateAdd = () => {

        window.location = "/backend/room/add"
      }

     const changePage = () => {
     }
     const searchVal = (e) => {

        var vals = e.target.value;
        setSearchData(vals);

        if(vals !== ""){

            var newArr = [];

            console.log(prvListRoom)

            prvListRoom.forEach((ele) => {

                if(ele.roomname.includes(vals) || ele.roomnameen.toLowerCase().includes(vals.toLowerCase())){

                        newArr.push(ele);
                }
             })

            setListRoom(newArr);
        }else{

            setListRoom(prvListRoom)

        }
    }

     useEffect(() => {


      setStatusReq(false);
      let callSuccess = true;
      
         const reqRoomList = async () => {

         let roomView = [];

          try {

            const response = await endpoint.get("/roomcate/all")

            if(response.data.code === 1){

                //console.log(response)

                response.data.list.forEach((ele) => {

                    var strReplace = ele.roomnameen.replaceAll(" " , "-");

                    roomView.push({id:ele.id , url:strReplace.toLowerCase()});

                })

                //console.log(roomView)

                setListRoom(response.data.list);
                setPrvListRoom(response.data.list);
                setListRoomView(roomView);
                setStatusReq(true)

            }
            
          } catch (err) {
            
             console.error(err)
          }
      }
     if(callSuccess){

          reqRoomList();
      }
     return () => {

        callSuccess = false;
     }
     },[statusComplete])

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
                   statusReq && listRoom.length > 0  ? 

                   listRoom.map((room , keys)=> {

                    return <Grid key={keys} item xs={12} sm={12} md={6} lg={4} xl={4}>
                                <BlockRoom rId={room.id} rTitle={room.roomname} rReccom={room.roomrecommend} rDate={convertDate(room.createdate)}  rImg={room.imgthumb} SetstatusCompleate={SetstatusCompleate} listRoom={listRoomView} />
                            </Grid>

                    })

                   :  
                   <Grid item xs={12}>
                        <Box sx={{ p: 2, mr:2, border: '1px dashed grey' }}>
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

export default RoomList