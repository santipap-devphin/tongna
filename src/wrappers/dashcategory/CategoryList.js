import React , {useState , useEffect} from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import endpoint from '../../api/endpoint';
import SweetAlert2 from 'react-sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

const CategoryList = () => {

  const [statusCall , setStatusCall] = useState(false);
  const [statusDel , setStatusDel] = useState(false);
  const [searchData , setSearchData] = useState('');
  const [prvCate , setPrvCate] = useState([]);
  const [listAll , setListAll] = useState([]);

  const [delID , setDelID] = useState({});
  const [swalProps, setSwalProps] = useState({
    show: false,
    title: '',
    text: '',
    icon: 'warning',
    showCancelButton: true,
    showConfirmButton: false,
    confirmButtonText:"OK",
    cancelButtonText:"Cancel"
   });
  
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };
    
    const handleDelete = (id , group) => {

        setDelID({id:id , group:group});
        setSwalProps({...swalProps , show:true , title:"ยืนยันการลบข้อมูล" , icon:"warning" , showConfirmButton:true})
        setTimeout(function(){ setSwalProps({...swalProps , show:false , title:"",text:"" , icon:"" , showConfirmButton:true}) }, 2000);
    };

    useEffect(() => {

      let callSuccess = true;

      const reqCate = async () => {

        setStatusCall(false);
        try {
          const response = await endpoint.get("/cate/alls");
          let arr_group = [];
          if(response.data.code === 1 ){

            console.log(response.data)

            response.data.room.forEach((ele , index) => {

              arr_group.push({id:index+1 , cateid:ele.rcateid , nameth:ele.rcatenameth , nameen:ele.rcatenameen , type:"room" , group:ele.group})

           })
           response.data.exper.forEach((ele) => {

            arr_group.push({id:arr_group.length + 1 , cateid:ele.experid , nameth:ele.expernameth , nameen:ele.expernameen , type:"exper" , group:ele.group})

          })
          response.data.event.forEach((ele) => {

            arr_group.push({id:arr_group.length + 1 , cateid:ele.eventid , nameth:ele.eventnameth , nameen:ele.eventnameen , type:"event" , group:ele.group})

          })
            setPrvCate(arr_group);
            setListAll(arr_group)
            //console.log()
            setStatusCall(true)

          }
          
        } catch (err) {
            console.error(err)
        }
      }

      if(callSuccess){
        reqCate();
      }


      return () => {

        callSuccess = false;
        setStatusCall(false);
      }


    },[])

    useEffect(() => {

       const reqDel = async () => {

         setStatusCall(false)
          try {

          const response = await endpoint.post("/cate/del" , {id: delID["id"] , group:delID["group"]});
          let arr_group = [];
          if(response.data.code === 1){

            //console.log(response.data);
            response.data.room.forEach((ele , index) => {

              arr_group.push({id:index+1 , cateid:ele.rcateid , nameth:ele.rcatenameth , nameen:ele.rcatenameen , type:"room" , group:ele.group})

           })
           response.data.exper.forEach((ele) => {

            arr_group.push({id:arr_group.length + 1 , cateid:ele.experid , nameth:ele.expernameth , nameen:ele.expernameen , type:"exper" , group:ele.group})

          })
          response.data.event.forEach((ele) => {

            arr_group.push({id:arr_group.length + 1 , cateid:ele.eventid , nameth:ele.eventnameth , nameen:ele.eventnameen , type:"event" , group:ele.group})

          })

          setPrvCate(arr_group);
          setListAll(arr_group)
          setStatusCall(true)


          }
          
        } catch (err) {
            console.error(err)
        }

      }

      if(statusDel){
        reqDel();
      }

      return () => {

        setStatusDel(false);
      
      }


    },[statusDel , delID])

    const searchVal = (e) => {
       var vals = e.target.value;
       setSearchData(vals);

         var arrs = [];
         if(vals !== ""){
  
            for(var i = 0; i < prvCate.length; i++){
  
                    //console.log(vals)
                    if(prvCate[i].nameen.toUpperCase().includes(vals.toUpperCase())){
                         
                          /*const pos = i+1;
                          const page = Math.ceil(pos / 6);
                          prvListBlog[i]["page"] = page;*/
                          arrs.push(prvCate[i]);
                     }
  
              }
              //console.log(arrs)
              //const pageAll = Math.ceil(arrs.length / 6);
              //setPages(pageAll);
              setListAll(arrs);
            
  
        }
        else{
  
          //const pageAll = Math.ceil(prvListBlog.length / 6);
          //setPages(pageAll);
          setListAll(prvCate);
       }
   }
   const locateAdd = () => {

    window.location = "/backend/category/add"
  }

  return (<>
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
              <Grid item xs={12} sm={12}>
              <Box
                  sx={{
                  mr:1.5,
                  mt:1.5,
                  p:2,
                  boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , 
                  transformStyle: "preserve-3d" 
                }}
              >
                <SweetAlert2 
                  {...swalProps}
                  didClose={() => {
                    // run when swal is closed...
                    setSwalProps({...swalProps , show:false })
                  }}
                  onConfirm={result =>  {
                  // run when clieked in confirm and promise is resolved...
                  if(result.isConfirmed){
                     setStatusDel(true);
                  }
                  }}
              />
              <Grid container sx={{m:1}} spacing={1}>
                  <Grid item xs={12}>
                  {
                        statusCall && listAll.length > 0 ? 

                        listAll.map((ele , keys) => {

                          return     <Chip
                                        style={{marginTop:5 , marginRight:5}}
                                        key={keys}
                                        label={ele.nameen}
                                        onClick={handleClick}
                                        onDelete={() => handleDelete(ele.cateid , ele.group)}
                                        deleteIcon={<DeleteIcon />}
                                      />
                                  

                        })
                        :null
                      }
                    </Grid>
                </Grid>
            </Box>
        </Grid>
      </Grid>
      </>
   )
}

export default CategoryList