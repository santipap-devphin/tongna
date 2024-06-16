import React , {useEffect , useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PromotionList from './PromotionList';
import endpoint from '../../api/endpoint';

const PromotionMain = () => {

    const [statusCallApi , setStatusCallApi]= useState(true);
    const [listPromotion , setListPromotion] = useState([]);
    const [prvListPromo , setPrvListPromo] = useState([]);
    let pages = 1;
    const [searchData , setSearchData] = useState('');
    const [statusSuccess , setStatusSuccess] = useState(false);

    const locateAdd = () => {

        window.location = "/backend/promotion/add"
      }

     const changePage = () => {
     }
     const searchVal = (e) => {

        var vals = e.target.value;
        setSearchData(vals);
        if(vals !== ""){
            let newData = [];
            prvListPromo.forEach((ele) => {

                    if(ele.proTitle.toLowerCase().includes(vals)){
                        newData.push(ele)
                    }

            })
         setListPromotion(newData);

        }else{
            setListPromotion(prvListPromo);
        }

     }

     useEffect(() => {

        let callSuccess = true;

        const reqPromotion = async() => {

            try {

                const response = await endpoint.get("/promotion/all");
                console.log(response.data.list)
                if(response.data.code === 1){

                    setListPromotion(response.data.list);
                    setPrvListPromo(response.data.list);
                    setStatusSuccess(true);

                }
                
            } catch (err) {
                console.error(err)
            }


        }
        if(callSuccess){
            reqPromotion();
        }


        return () => {
            callSuccess = false;
        }


     },[statusCallApi])

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
                    statusSuccess && listPromotion.length > 0 ?

                    listPromotion.map((ele , keys) => {

                        return <PromotionList key={keys} id={ele.proID} title={ele.proTitle} des={ele.proDes} img={ele.proImg} sdate={ele.proSdate} edate={ele.proEdate} status={ele.proStatus} success={setStatusCallApi}  />

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

export default PromotionMain