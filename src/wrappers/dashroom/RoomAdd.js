import React  , {useState , useEffect , useRef } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Grid , Button , TextField , InputLabel  
, List , ListItem , ListItemButton , ListItemIcon , ListItemText
, MenuItem , FormControl , Select  , Checkbox , IconButton, Chip , Typography ,Box, Badge 
, Alert , AlertTitle , Switch ,FormGroup , FormControlLabel, Stack} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CommentIcon from '@mui/icons-material/Comment';
import ImageIcon from '@mui/icons-material/Image';
import Editor from '../../component/Editor';
import endpoint from '../../api/endpoint';
import CloseIcon from '@mui/icons-material/Close';


const RoomAdd = () => {

 let navicate = useNavigate();  
 const [chipData, setChipData] = useState([]);
 const [checked, setChecked] = useState([]);
 const [isStatus, setIsStatus] = useState(false)
 const alertRef = useRef(null);
 const [msgSystem, setMsgSystem] = useState("");
 const [chkSwitch , setchkSwitch] = useState(true); 
 const [reqStatus , setReqStatus] = useState(false);
 const [roomCate , setRoomCate] = useState([]);
 const [amenList , setAmenList] = useState([]);
 const [facilities , setFacilties] = useState([]);
 const [rCate , setRcate] = useState('')
 const [sizeRoom , setSizeRoom] = useState('');
 const [roomRecom, setRoomRecom] = useState('');
 const [sizeAdults , setSizeAdults] = useState('');
 const [detailRoom , setDetailRoom] = useState('');
 const [amenData , setAmenData] = useState('');
 const [fileTemp , setFileTemp] = useState([]);
 const [statusImgFront , setStatusImgFront] = useState(false);
 const [statusImg , setStatusImg] = useState(false);
 const [statusForm , setStatusForm] = useState(false)


 useEffect(() => {

    let callSuccess = true;

    setReqStatus(false);

    const reqRoomCate = async () => {

        var listarr  = [];
        var renewaMen = [];

        try {
          const response = await Promise.all([endpoint.get("/roomcate") , endpoint.get("/roomcate/amenities") , endpoint.get("/roomcate/facilities")])
        
          if(response[0].status === 200 && response[0].statusText === "OK"){
  
              setRoomCate(response[0].data.list)
          }
          if(response[1].status === 200 && response[1].statusText === "OK"){
  
            response[1].data.list.forEach((vals) => {

                renewaMen.push({"amenid" : vals.amenid , "amenname" : vals.amenname , "amennameen" : vals.amennameen , "disable" : false});


            })
            //console.log(renewaMen);
            setAmenList(renewaMen)
            //console.log(response[1].data.list)

          }
          if(response[2].status === 200 && response[2].statusText === "OK"){
  
            
             for(var i = 0; i < response[2].data.list.length; i++){

                    listarr.push(response[2].data.list[i].facid);
              }
             setChecked(listarr);
             setFacilties(response[2].data.list)
         }

          setReqStatus(true);
        
          
        } catch (err) {
          console.error(err)
        }
    }


    if(callSuccess){
        reqRoomCate();
    }

    return () => {
         callSuccess = false;
     }
 },[])



 const handleToggle = (value) => () => {

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
    
      newChecked.push(value);

    } else {
      newChecked.splice(currentIndex, 1);
    }

    //console.log(newChecked)
    setChecked(newChecked);
  };

 const handleDelete = (id) => {

   
    amenList.forEach((vals) => {

        
        if(vals.amenid === id){

            
            vals.amenid = parseInt(vals.amenid);
            vals.disable = false;

        }

        return vals;


    })
    //console.log(chipToDelete)
    const filterData = chipData.filter((list) => list.id !==  id );
    setChipData(filterData);

}
const handleChange = (e) => {

    
        setRcate(e.target.value)

 }
 const handleChangeEditor  = (value) => {

        setDetailRoom(value)

 }
 const addAMENITIES = () =>{


    let dataFor = {};
    
    amenList.forEach((vals , keys) => {

        if(vals.amennameen === amenData){

           dataFor["amenid"] = vals.amenid;
           dataFor["amenname"] = vals.amenname;
           dataFor["amennameen"] = vals.amennameen;
           vals.disable = true;
           

           return vals;

        }


   });

    setAmenData('');
    setChipData([...chipData , {id:dataFor.amenid , label:dataFor.amenname , val:dataFor.amennameen}])
 }
 const uploadFrontImg = async (e) => {

    setStatusImgFront(false);
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    //var arrFront = [];

    if (!allowedTypes.includes(file?.type)) {
        setIsStatus(true);
        setStatusImgFront(true);
        setMsgSystem("Only JPEG, PNG, and GIF images are allowed.");
        return;
    }

    else{

        const reader = new FileReader();

        reader.onloadend = () => { 


            if(fileTemp.length === 0){

                setFileTemp([...fileTemp , {filebase64:reader.result , fileimg:file , filepos:"front"}])

            }else{

                fileTemp.forEach((im , key) => {

                    if(im.filepos === "front"){
    
                        im["filebase64"] = reader.result;
                        im["fileimg"] = file;
                        im["filepos"] = "front";
                       
    
                    }
                 })
             }

            
             setStatusImgFront(true);
        }

         reader.readAsDataURL(file) 
         
     }
 }

 const chkAll = (e) => {
    //setStatusChk(e.target.checked)
    
    if(e.target.checked){

        var newArr = [];

        facilities.forEach((vals) => {

            newArr.push(vals.facid);

        })
        setChecked(newArr);
        

    }else{

        setChecked([]);
    }

 }

 const upMutiroom = (e) => {

   console.log('mutiroom')
    setStatusImg(false);
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    //console.log(e.target.files)

    if (!allowedTypes.includes(file?.type)) {
        setIsStatus(true);
        setStatusImg(true);
        setMsgSystem("Only JPEG, PNG, and GIF images are allowed.");
        return;
    }
    else{

        const reader = new FileReader();

        reader.onloadend = () => { 

            console.log(fileTemp)
            //console.log(reader.result)
            setFileTemp([...fileTemp , {filebase64:reader.result , fileimg:file , filepos:"small"}])
           
            //file["namefolder"]  = "cate";
            setStatusImg(true);
        }

         reader.readAsDataURL(file) 

          

    }
  

 }
 const delMutiPer = (e) =>{

    setStatusImg(false);
    var new_arr = [];

    fileTemp.forEach((file , keys) => {

        if(keys.toString() !== e.currentTarget.id)
        {
            new_arr.push(file);
            
        }
      });

      setFileTemp(new_arr);

      console.log(fileTemp)

      setStatusImg(true);

 }

 /*const validMessage = (e) => {

   
    e.target.setCustomValidity("กรุณาเลือกข้อมูล");

}*/
 const submitRoom = async (e) => {

    e.preventDefault();


    if(rCate && sizeRoom && sizeAdults && detailRoom && roomRecom && chkSwitch){


        const frmData = new FormData();

        //console.log(chipData)
        var amenlist = [];

        frmData.append('cate', rCate);
        frmData.append('sizeroom', sizeRoom);
        frmData.append('sizeadults', sizeAdults);
        frmData.append('roomreccom', roomRecom);
        frmData.append('detailroom', detailRoom);
        frmData.append('status', chkSwitch);
        chipData.forEach((data , key) => {

            amenlist.push(data.val)

            
       })

       frmData.append('amenities', amenlist);
       frmData.append('facilities', checked);
       fileTemp.sort(function(a, b) {
            var keyA = a.filepos;
            //var keyB = b.active;
            
            if (keyA === "front") return -1; // ขยับตำแหน่งถอย 1 ลำดับ
            if (keyA === "small") return 1; // ขยับตำแหน่งขึ้นมา 1 ลำดับ
            return 0;
        });

        fileTemp.forEach((data , key) => {

             if(data.filepos === "front"){

                frmData.append('fronts', fileTemp[0].fileimg.name);
                frmData.append('files', data.fileimg);

             }else{

                frmData.append('files', data.fileimg);
             }

             
        })

        try {

            const response = await endpoint.post("/room/add" ,frmData, {delay: 500 , headers: {
                'Content-Type': 'multipart/form-data'
            }});

            if(response.data.code === 1){

                    setIsStatus(true);
                    setStatusForm(true);
                    setMsgSystem('คุณเพิ่มข้อมูลได้ถูกต้อง');

                    window.scrollTo({top:alertRef.current.scroll , behavior: 'smooth'}) 
                    setTimeout(function() {
                        
                        setStatusForm(false);
                        navicate('/backend/room');
                    
                    }, 5000);
             }
             else{

                setIsStatus(true);
                setStatusForm(false);

             }
          

            
        } catch (err) {
            console.error(err);
        }

      
    }else{
        setMsgSystem('กรุณากรอกข้อมูลให้ถูกต้อง');
        setIsStatus(true);
        //scrollIntoView
        window.scrollTo({top:alertRef.current.scroll , behavior: 'smooth'}) 
        setTimeout(function() {setIsStatus(false);}, 5000);

    }
 }

 const mutiClick = (e) => {


    console.log(fileTemp)
    console.log(e.target.value)

 }
 return (<><div ref={alertRef}></div>
            {console.log(fileTemp)}
            <Grid container sx={{m:1}}>
                <Grid item xs={4}>
                    <Link to={"/backend/room"} style={{textDecoration: "none"}}><Button id="btnback" variant="contained" color="primary"><ArrowBackIcon/> กลับ</Button></Link>
                </Grid>
            </Grid>
            <Box id="hero-section" sx={{display:isStatus ? "block" : "none" , p:2}}>
                <Alert severity={statusForm ? "success" : "error"}>
                    <AlertTitle>{statusForm ? "เพิ่มข้อมูลเรียบร้อยแล้ว" : "เกิดข้อผิดพลาด"}</AlertTitle>
                        ข้อความจากระบบ — <strong>{msgSystem}</strong>
                </Alert>
           </Box>
            <form onSubmit={submitRoom} style={{width:"97%"}}>
             <Grid container sx={{background:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , m:1.5}}>
             <Grid item xs={12} sx={{p:2}}>
                 
                    <FormControl variant="filled" fullWidth>
                            <InputLabel id="cate-select-label">หมวดหมู่ห้อง</InputLabel>
                            <Select
                            labelId="cate-label"
                            id="roomcate"
                            value={rCate}
                            label="หมวดหมู่ห้อง"
                            onChange={handleChange}
                            
                           
                            >
                            <MenuItem key={0} value=''></MenuItem>
                            {
                                reqStatus ? 
                                roomCate.map((val , keys) => {

                                      return (<MenuItem key={val.rcateid} value={val.rcatenameen}>{val.rcatenameth}</MenuItem>)

                                })

                                :null

                            }
                            </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8} sm={4} sx={{p:2}}>
                        <TextField 
                          id="sizeroom" 
                          label="ขนาดห้อง" 
                          variant="filled" 
                          value={sizeRoom} 
                          onChange={(e) => setSizeRoom(e.target.value)}
                          fullWidth/>
                </Grid>
                <Grid item xs={4} sm={2} sx={{p:2}}>

                    <Badge badgeContent={2} color="primary">
                        <Typography variant='h4'>m</Typography>
                    </Badge>
                     
                </Grid>
                <Grid item xs={8} sm={4} sx={{p:2}}>
                        <TextField 
                          id="sizeadults" 
                          label="จำนวนผู้เข้าพัก" 
                          variant="filled" 
                          value={sizeAdults} 
                          onChange={(e) => setSizeAdults(e.target.value)}
                          fullWidth/>
                </Grid>
                <Grid item xs={4} sm={2} sx={{p:2}}>
                     <Typography variant='h4'>/คน</Typography>
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                    <TextField
                        id="txtrecommend"
                        label="ข้อความแนะนำห้องพัก"
                        multiline
                        rows={3}
                        variant="filled" 
                        onChange={(e) => setRoomRecom(e.target.value)}
                        value={roomRecom}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                        <Editor 
                            initialContent={detailRoom}
                            placeholder={"รายละเอียดห้องพัก"} 
                            onChange={handleChangeEditor}
                           
                        />
                      
                </Grid>
                <Grid item xs={8} sm={10} sx={{p:2}}>
                   
                    <FormControl variant="filled" fullWidth>
                            <InputLabel id="cate-select-label">เพิ่ม AMENITIES</InputLabel>
                            <Select
                            labelId="amenities-label"
                            id="amenities"
                            value={amenData}
                            label="สิ่งอำนวยความสะดวก"
                            onChange={(e) => setAmenData(e.target.value)}
                            >
                            <MenuItem value=''></MenuItem>
                            {
                                reqStatus ?
                                amenList.map((val , keys) => {


                                    return (<MenuItem key={val.amenid} value={val.amennameen} disabled={val.disable}>{val.amenname}</MenuItem>)

                                })

                                :null

                            }
                            </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} sm={2} sx={{p:2}}>
                    <Button variant='contained' size='large' onClick={addAMENITIES}>เพิ่ม</Button>
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
                            :<Typography variant='h6' sx={{p:2}}>ไม่มีข้อมูลที่เลือก</Typography>
                        }  
                   </Box>
                  
                   </Grid>
                   <Grid item xs={12} sx={{p:2}}>
                        <Typography variant='h6'>VILLA FACILITIES</Typography>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox onChange={chkAll} defaultChecked  />} label="เลือกทั้งหมด" />
                        </FormGroup>
                        <List 
                                sx={{ 
                                    width: '100%', 
                                    maxWidth: 360, 
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: 300,
                                }}>
                                {facilities.map((value , keys) => {
                                    const labelId = `checkbox-list-label-${keys}`;

                                    return (
                                    <ListItem
                                        key={keys}
                                        secondaryAction={
                                        <IconButton edge="end" aria-label="comments">
                                            <CommentIcon />
                                        </IconButton>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} onClick={handleToggle(value.facid)} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(value.facid) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={`${value.facname}`} />
                                        </ListItemButton>
                                    </ListItem>
                                    );
                                })}
                        </List>
                   </Grid>
                   <Grid item xs={12} sx={{p:2}}>
                        <Button
                        variant="contained"
                        component="label"
                        size="small"
                        color="primary"
                        sx={{mt:1 , "&:hover": { backgroundColor:"#fff" , color:"#000"}}}
                       
                    >
                                <ImageIcon sx={{p:0.5}}/>
                                <input
                                type="file"
                                name="filethump"
                                onChange={(e) => uploadFrontImg(e)}
                                hidden
                                />
                            อัพโหลดรูปหน้าปกห้องพัก
                    </Button>
                    <Grid item xs={12} sx={{pt:2}}>
                     {
                        statusImgFront && fileTemp.length > 0 ?

                        fileTemp.map((val , keys) => {

                            return (val.filepos === "front") ? <img key={keys} src={val.filebase64} alt="img-main-product" style={{width:"100%"}} /> : null

                        })
                        :<img src={'../../image/noimg.jpg'} alt="img-blank" style={{width:"100%"}} />
                        
                     }
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{p:2}}>
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
                                onChange={(e) => upMutiroom(e)}
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

                                     return (val.filepos === "small") ? 
                                            <Box key={keys} sx={{
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
                                        :null
                                     
                                    })
                                    :null
                        }
                    </Stack>
                   </Box>
                    
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                    <FormGroup>
                        <FormControlLabel control={<Switch  checked={chkSwitch}  onChange={() => setchkSwitch(!chkSwitch) }  />} label="สถานะเปิดใช้" />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                        <Button variant='contained' type="submit" sx={{m:1}}>ยืนยัน</Button>
                        <Button variant='contained' type='reset' color="error" sx={{m:1}}>ยกเลิก</Button>
                </Grid>
             </Grid>
             </form>
        </>
  )
}

export default RoomAdd