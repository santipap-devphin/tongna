import React  , {useState , useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {Grid , Button , TextField , InputLabel  , MenuItem , FormControl , Select  , Chip , Typography ,Box , Switch ,FormGroup , FormControlLabel, Autocomplete, Stack} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Editor from '../../component/Editor';
import endpoint from '../../api/endpoint';
import CloseIcon from '@mui/icons-material/Close';
import SweetAlert2 from 'react-sweetalert2';

const EventsAdd = () => {

    let navicate  = useNavigate();
    const [chipData, setChipData] = useState([]);
    const [listCate , setListCate] = useState([]);
    const [tagEvent , setTagEvent] = useState('');
    const [cateEvent , setCateEvent] = useState('');
    const [chkSwitch , setchkSwitch] = useState(true); 
    const [titleEvent , setTitleEvent] = useState('');
    const [detailEvent , setDetailEvent] = useState('');
    const [fileTemp , setFileTemp] = useState([]);
    const [statusImg , setStatusImg] = useState(false);
    const [statusCall , setStatusCall] = useState(false);
    let tagsAll = ['เชียงใหม่' , 'แอดเวนเจอร์' , 'ร้านอาหารแนะนำ' ,'อันซีนไทยแลนด์' , 'อุทยานแห่งชาติ'];

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
    
   
  const handleDelete = (id) => {
   
       console.log(id)
       //console.log(chipToDelete)
       const filterData = chipData.filter((list) => list.id !==  id );
   
        console.log(filterData);
        setChipData(filterData);
   
   }
   
    const submitEvent = async (e) => {
   
       e.preventDefault();
       let newMsg = "";
       var tagall = [];

        if(cateEvent && titleEvent && fileTemp.length > 0 && detailEvent.length > 0 && chipData.length > 0){

            const frmData = new FormData();
            frmData.append("cate", cateEvent);
            frmData.append("title", titleEvent);
            frmData.append("des", JSON.stringify(detailEvent));
            if(chipData.length  > 0 ){

                chipData.forEach((ele) => {

                    tagall.push(ele.label);

                })

            }else{

                tagall.push(chipData[0].label);
            }

            if(fileTemp.length > 0){

                fileTemp.forEach((data) => {

                    frmData.append('files', data.fileimg);
                 })

            }else{
                frmData.append('files', fileTemp[0].fileimg);
            }

            
            frmData.append("tags", JSON.stringify(tagall));
            frmData.append("status", chkSwitch);
          
            try {
                const response = await endpoint.post("/eventsact/add"  , frmData, {delay: 500 , headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }})

                if(response.data.code === 1){

                    setSwalProps({...swalProps , show:true , title:"เพิ่มข้อมูลเรียบร้อยแล้ว" , icon:"success" ,  showConfirmButton:false})

                    setTimeout(function() {setSwalProps({...swalProps , show:false , title:"" , icon:"" , showConfirmButton:false})}, 3000);

                    setTimeout(function() { navicate('/backend/events');}, 5000);

                }
                
            } catch (err) {
                    console.error(err);
            }
        }else{

            
            if(cateEvent === ""){

                newMsg = "กรุณาเลือกหมวดหมู่กิจกรรม";

            }else if(titleEvent === ""){
                newMsg = "กรุณากรอกหัวข้อกิจกรรม";
            }
            else if(fileTemp.length === 0){
                newMsg = "กรุณาอัพโหลดรูปภาพกิจกรรม";
            }
            else if(detailEvent.length === 0){
                newMsg = "กรุณากรอกรายละเอียดของกิจกรรม";
            }
            else if(chipData.length === 0){
                newMsg = "กรุณาเพิ่มแท๊กกิจกรรมอย่างน้อย 1 แท๊ก";
            }


            setSwalProps({...swalProps , show:true , title:newMsg , showConfirmButton:false});
            setSwalProps({...swalProps , show:false , title:"" , showConfirmButton:false});

            return;
        }

   
    }
     const addEvents = () =>{

        console.log(chipData)

        var tagname = tagEvent;
        let check = 0;

        console.log(check)

        if(chipData.length > 0 ){

            chipData.forEach((ele => {

                if(ele.label === tagEvent){

                        alert("คุณได้เพิ่ม TAg ซ้ำกัน");
                        tagname = "";
                        check = 1;
                    
                        
                }
             }))
        }

       

        if(check === 0){
            setChipData([...chipData , {id:chipData.length > 0 ? chipData[chipData.length-1].id +1 : 1, label:tagname}])
        }

        setTagEvent('')



    }
    const uploadImgEvent = (e) => {

        console.log('mutiroom')
        setStatusImg(false);
        const file = e.target.files[0];
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        //console.log(e.target.files)
    
        if (!allowedTypes.includes(file?.type)) {
          
            setStatusImg(true);
            setSwalProps({...swalProps , show:true , title:"ข้อความระบบ" , text:"Only JPEG, PNG, and GIF images are allowed."})
            setSwalProps({...swalProps , show:false , title:"" ,  icon:"", text:""})
            return;
        }
        else{
    
            const reader = new FileReader();
    
            reader.onloadend = () => { 
    
                console.log(fileTemp)
                //console.log(reader.result)
                setFileTemp([...fileTemp , {filebase64:reader.result , fileimg:file}])
               
                //file["namefolder"]  = "cate";
                setStatusImg(true);
            }
    
             reader.readAsDataURL(file) 
    
              
    
        }
    }
    const mutiClick = (e) => {


        console.log(fileTemp)
        console.log(e.target.value)
    
     }
     const delMutiPer = (e) => {

        setStatusImg(false);
        var new_arr = [];
    
        fileTemp.forEach((file , keys) => {
    
            if(keys.toString() !== e.currentTarget.id)
            {
                new_arr.push(file);
                
            }
          });
    
          setFileTemp(new_arr);
          setStatusImg(true);
    
     }
     const handleChangeEditor = (value) => {

        setDetailEvent(value)

     }

     useEffect(() => {

        let callSuccess = true;
        

        const reqCateEvent = async () => {

            try {

                const response = await endpoint.get("/eventsact/cate");
                if(response.data.code === 1){

                    setListCate(response.data.list);
                    setStatusCall(true)

                }
                
            } catch (err) {
                console.error(err)
            }

        }

        if(callSuccess){
            reqCateEvent();
        }

        return () => {

            callSuccess = false;

        }


     },[])

     const preViewData = (e , title) => {

        e.preventDefault();

        if(detailEvent === ""){

            alert("กรุณา เพิ่มข้อมูลก่อน");
        }
        else if(fileTemp.length === 0){
            alert("กรุณา เพิ่มข้อมูลรูปภาพก่อน");
        }
        else{

            localStorage.setItem(title , JSON.stringify(detailEvent));
            localStorage.setItem("imglist-"+title , JSON.stringify(fileTemp));
            window.open("/preview-events/"+title)
        }
     }


  return (<>
            <Grid container sx={{m:1}}>
                <Grid item xs={4}>
                    <Link to={"/backend/events"} style={{textDecoration: "none"}}><Button variant="contained" color="primary"><ArrowBackIcon/> กลับ</Button></Link>
                </Grid>
            </Grid>
            <SweetAlert2 
                    {...swalProps}
                    didClose={() => {
                        // run when swal is closed...
                        setSwalProps({...swalProps , show:false })
                    }}
                    onConfirm={result =>  {
                        // run when clieked in confirm and promise is resolved...
                        if(result.isConfirmed){

                            navicate("/backend/events");
                        }
                    }}
             />
            <form onSubmit={submitEvent} style={{width:"97%"}}>
            <Grid container sx={{background:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , m:1.5}}>
            <Grid item xs={12} sx={{p:2}}>
                    <FormControl variant="filled" fullWidth>
                            <InputLabel id="cate-select-label">หมวดหมู่</InputLabel>
                            <Select
                                labelId="cate-label"
                                id="cate"
                                value={cateEvent}
                                label="หมวดหมู่"
                                onChange={(e) => setCateEvent(e.target.value)}
                                >
                                <MenuItem value=''></MenuItem>

                                {
                                    statusCall && listCate.length > 0 ?

                                    listCate.map((data , keys) => {

                                       return <MenuItem key={keys} value={data.eventnameen}>{data.eventnameth}</MenuItem>

                                    })
                                    :null

                                }
                            </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                            <TextField 
                            id="titleevent" 
                            label="หัวข้อ Events" 
                            variant="filled" 
                            value={titleEvent} 
                            onChange={(e) => setTitleEvent(e.target.value)}
                            fullWidth/>
                </Grid>
                 <Grid item xs={12} sx={{p:2}}>
                     <Typography variant='p' sx={{color:"red"}}> ***** หมายเหตุ รูปแรกที่อัพโหลด จะเป็นรูปหน้าปกของ Events</Typography>
                     <br />
                    <Button
                        variant="contained"
                        component="label"
                        size="small"
                        color="secondary"
                        sx={{mt:1 , "&:hover": { backgroundColor:"#fff" , color:"#000"}}}
                       
                    >
                                <CloudUploadIcon sx={{p:0.5}}/>
                                <input
                                type="file"
                                name="filelist"
                                onChange={(e) => uploadImgEvent(e)}
                                onClick={(e) => mutiClick(e)}
                                hidden
                                />
                            อัพโหลดรูปห้องพัก
                    </Button>
                  
                    <Box
                        sx={{
                            display:fileTemp.length > 0 ? "block" : "none",
                            }}
                        
                    >
                    <Stack 
                        direction={{ xs: 'column', sm: 'row' }}
                        sx={{
                            mt:2 , 
                            border: '1px dashed grey',
                            p:2 , 
                            background:"#f0f0f0"
                        }} 
                        spacing={4}>
                        {

                            statusImg && fileTemp.length > 0 
                            ?
                            fileTemp.map((val , keys) => {

                                     return <Box key={keys} sx={{
                                                width:200 , 
                                                height:200, 
                                                backgroundImage: `url(${val.filebase64})`,
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                            
                                            }}
                                            >
                                            <Button 
                                                id={keys}
                                                variant="contained" 
                                                color="error"
                                                size='small'
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: 'gray',
                                                        opacity: [0.9, 0.8, 0.7],
                                                    },
                                                }}
                                                style={{
                                                    float:"right"
                                                    
                                                }}
                                                onClick={delMutiPer}
                                            >
                                            <CloseIcon fontSize='small' />
                                            </Button>
                                        </Box>
                                    })
                                    :null
                        }
                    </Stack>
                   </Box>
                    
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                    <Typography variant='h6'>รายละเอียด Events</Typography>
                    <Button
                        variant="contained"
                        component="label"
                        size="small"
                        color="warning"
                        sx={{mt:1 , mb:1 , "&:hover": { backgroundColor:"#fff" , color:"#000"}}}
                        onClick={(e) => preViewData(e , titleEvent)}
                    >  
                    <RemoveRedEyeIcon />
                           Preview
                    </Button>
                    <Editor
                        initialContent={detailEvent}
                        placeholder={""} 
                        onChange={handleChangeEditor}
                     />
                </Grid>

                <Grid item xs={9} sm={10} sx={{p:2}}>
                <Autocomplete
                        freeSolo
                        id="tagimg"
                        options={tagsAll.length > 0 ? tagsAll.map((option) => option) : []}
                        variant="filled"
                        renderInput={(params) => <TextField {...params} variant="filled" label="แท็กกิจกรรม"/>}
                        onChange={(e , value) => {

                            if(value === null){
                                setTagEvent('')
                            }else{
                                setTagEvent(value)
                             }
                        }}
                        onInputChange={(event, newInputValue) => {
                            setTagEvent(newInputValue);
                            
                         }}
                        value={tagEvent}
                        inputValue={tagEvent}
                        />
                        
                </Grid>
                <Grid item xs={3} sm={2} sx={{p:2}}>
                    <Button variant='contained' size='large' onClick={addEvents}>เพิ่ม</Button>
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                    <Box
                        sx={{
                            width: "100%",
                            backgroundColor: '#f0f0f0',
                          
                    }}
                    >
                       {
                            chipData.length > 0 ?
                            chipData.map((data ,key) => {
                                //console.log(data)
                              
                                let vals = data.label;
                            /* if (data.label === 'React') {
                                    icon = <TagFacesIcon />;
                                }*/
                                
                                return (<Chip
                                            sx={{m:2}}
                                            key={key}
                                            label={vals}
                                            color="info"
                                            onDelete={() => handleDelete(data.id)}
                                        />
                                        );
                            })
                            :<Typography variant='h6' sx={{p:2}}>ไม่มีข้อมูล</Typography>
                        }  
                   </Box>
                   
                   </Grid>
                <Grid item xs={12} sx={{p:2}}>
                    <FormGroup>
                        <FormControlLabel control={<Switch  checked={chkSwitch}  onChange={() => setchkSwitch(!chkSwitch) }  />} label="สถานะเปิดใช้" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                        <Button variant='contained' type="submit" sx={{m:1}}>ยืนยัน</Button>
                        <Button variant='contained' color="error" sx={{m:1}}>ยกเลิก</Button>
                </Grid>
            </Grid>
            </form>
        </>
    )
}

export default EventsAdd