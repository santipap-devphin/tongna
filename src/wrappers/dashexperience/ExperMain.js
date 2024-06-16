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
import ExperList from './ExperList';
import endpoint from '../../api/endpoint';


function ExperMain() {

    const [experList , setExperList] = useState([]);
    const [statusCompleate, setStatusCompleate] = useState(false);
    const [prvListExper , setPrvListExper] = useState([]);
    const [chkStatus , setChkStatus] = useState(false);
    let pages = 1;
    const [searchData , setSearchData] = useState('');
    
     useEffect(() => {

      let callSuccess  = true;
  
      const reqRequest = async () => {
  
  
          try {
  
              const response = await Promise.all([endpoint.get("/experience/content") , endpoint.get("/experience/type")])
              //console.log(response)
              let NewData = [];
              if(response.length === 2){
                  
                  response[0].data.list.forEach((ele) => {

                    response[1].data.list.forEach((vals) => {


                            if(ele.experCate === vals.experid){

                              ele["experCateName"] = vals.expernameen;

                            }
                     })

                    NewData.push(ele);


                  })
                  console.log(NewData)
                  setExperList(NewData);
                  setPrvListExper(NewData);
                  setChkStatus(true)
              }
            
              
          } catch (err) {
               console.error(err)
          }
      }
  
      if(callSuccess){
  
          reqRequest();
  
      }
  
      return () => {
  
          callSuccess = false;
  
      }
  
    },[statusCompleate])

    const locateAdd = () => {

        window.location = "/backend/experience/add"
      }

     const changePage = () => {
     }
     const searchVal = (e) => {

        var vals = e.target.value;
        setSearchData(vals);

        if(vals !== ""){

          let newList = [];

          prvListExper.forEach((itm) => {

            if(itm.experCateName.toLowerCase().includes(vals) || itm.experTitle.toLowerCase().includes(vals)){

                  newList.push(itm)
             }
          })

          setExperList(newList)


        }else{

          setExperList(prvListExper)
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
            {
              chkStatus ? <ExperList listExper={experList} status={setStatusCompleate} /> : "ไมมีข้อมูล"
            }
            
            <Stack spacing={2} sx={{mt:3}} alignItems="center">
                    <Pagination count={pages} color="primary" onChange={changePage} />
            </Stack>

          </Box>
  )
}

export default ExperMain