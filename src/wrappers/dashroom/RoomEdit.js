import React  , {useState , useEffect , useRef , useContext} from 'react';
import DataContext from '../../context/DataContext';
import { Link , useNavigate , useParams} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Grid , Button , TextField , InputLabel  
, List , ListItem , ListItemButton , ListItemIcon , ListItemText
, MenuItem , FormControl , Select  , Checkbox , IconButton
, Chip , Typography ,Box, Badge 
, Alert , AlertTitle , Switch ,FormGroup , FormControlLabel, Stack} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import Editor from '../../component/Editor';
import endpoint from '../../api/endpoint';

const RoomEdit = () => {
    const alertRef = useRef(null);
    const [chipData, setChipData] = useState([]);
    const [checked, setChecked] = useState([]);
    const [statusImgThm  , setStatusImgThm] = useState(true);
    const [statusImgList , setStatusImgList] = useState(false);
    const [imgOldData , setImgOldData] = useState([]);
    const [chkSwitch , setchkSwitch] = useState(true); 
    const [statusReq , setStatusReq] = useState(false);
    const [roomCate , setRoomCate] = useState([]);
    const [amenList , setAmenList] = useState([]);
    const [facilities , setFacilties] = useState([]);
    const [rCate , setRcate] = useState('')
    const [sizeRoom , setSizeRoom] = useState('');
    const [roomRecom, setRoomRecom] = useState('');
    const [sizeAdults , setSizeAdults] = useState('');
    const [detailRoom , setDetailRoom] = useState('');
    const [amenData , setAmenData] = useState('');
    const [fileTempFront , setFileTempFront] = useState({});
    const [fileTemp , setFileTemp] = useState([]);
    const [isStatus, setIsStatus] = useState(false)
    const [msgSystem, setMsgSystem] = useState("");
    const [statusForm , setStatusForm] = useState(false)

    const {urlServer} = useContext(DataContext);
    const {id} = useParams();
    let navicate = useNavigate();

    let roomID = id;

     const handleToggle = (value) => () => {
       const currentIndex = checked.indexOf(value);
       const newChecked = [...checked];
   
       if (currentIndex === -1) {
         newChecked.push(value);
       } else {
         newChecked.splice(currentIndex, 1);
       }
   
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
       const filterData = chipData.filter((list) => list.id !==  id );
       setChipData(filterData);
   
   }
    const handleChangeEditor = (val) => {

        setDetailRoom(val)

    }
    const handleChange = (e) => {
   
        setRcate(e.target.value)
   
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
    const uploadImgFront = (e) => {

        setStatusImgThm(false)
        const file = e.target.files[0];
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        
        if (!allowedTypes.includes(file?.type)) {

            alert("error");
            setIsStatus(true);
            setMsgSystem("Only JPEG, PNG, and GIF images are allowed.");
            window.scrollTo({top:alertRef.current.scroll , behavior: 'smooth'}) 
            setTimeout(function() {setIsStatus(false);}, 5000);
            return;
        }
        else{

            const reader = new FileReader();
    
            reader.onloadend = () => { 

                setFileTempFront({...fileTempFront , filebase64:reader.result , fileimg:file  , filepos :  "front"})

                setStatusImgThm(true)
    
            }
             reader.readAsDataURL(file) 
             
         }
    }
    useEffect(() => {

        let callSuccess = true;
        setStatusReq(false);
        var renewaMen = [];
        var chipEdit = [];
        var listChk = [];
        var imgAr = [];

        const reqRoomPerID = async () => {

                try {
                    const response = await Promise.all(
                    [
                        endpoint.get("/roomcate") , 
                        endpoint.get("/roomcate/amenities") , 
                        endpoint.get("/roomcate/facilities") , 
                        endpoint.post("/roomcate/roomid/"+roomID)
                    ])
                    //console.log(response)
                    if(response.length === 4){

                        setRoomCate(response[0].data.list)

                        response[1].data.list.forEach((vals) => {

                        if(response[3].data.list.amenities.indexOf(vals.amenname) > -1){

                                 renewaMen.push({"amenid" : vals.amenid , "amenname" : vals.amenname , "amennameen" : vals.amennameen , "disable" : true});
                                 chipEdit.push({id:vals.amenid , label:vals.amenname , val:vals.amennameen})

                            }else{
                                renewaMen.push({"amenid" : vals.amenid , "amenname" : vals.amenname , "amennameen" : vals.amennameen , "disable" : false});
                            }
                         })

                        setAmenList(renewaMen);
                        setChipData(chipEdit);
                        //console.log(response[3].data.list.facilities)
                        response[2].data.list.forEach((vals) => {
                            //console.log(vals.facname)

                            //console.log(response[3].data.list.facilities)
                           if(response[3].data.list.facilities.indexOf(vals.facname) > -1){
                              
                                listChk.push(vals.facid)
                            
                           }
                        })
                        console.log(response[3].data.list)
                        setChecked(listChk);
                        setFacilties(response[2].data.list)
                        setRcate(response[3].data.list.roomnameen);
                        setSizeRoom(response[3].data.list.sizeroom);
                        setSizeAdults(response[3].data.list.sizeadults);
                        setDetailRoom(response[3].data.list.roomdetail);
                        setRoomRecom(response[3].data.list.roomrecommend);
                        
                        setFileTempFront({filebase64:"" , fileimg:urlServer+response[3].data.list.imgthumb , filepos:"front"})

                        response[3].data.list.imglist.forEach((name  , key) => {
                            
                            imgAr.push({filebase64:"" ,fileimg:urlServer+name, filepos:"small" });
                        })
                        //console.log(imgAr)
                        setImgOldData(imgAr);
                        setStatusReq(true);
                        setStatusImgList(true);

                    }
                } catch (err) {
                        console.error(err)
                }

        }

        if(callSuccess){
            reqRoomPerID();
        }
         return () => {

            callSuccess = false;

        }

    },[roomID , urlServer])

    const upMutiroom = (e) => {

        setStatusImgList(false);
        const file = e.target.files[0];
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file?.type)) {

            setStatusImgList(true);
            setMsgSystem("Only JPEG, PNG, and GIF images are allowed.");
            window.scrollTo({top:alertRef.current.scroll , behavior: 'smooth'}) 
            setTimeout(function() {setIsStatus(false);}, 5000);
            return;
        }else{

            const reader = new FileReader();
    
            reader.onloadend = () => { 

                setImgOldData([...imgOldData , {filebase64:reader.result , fileimg:file, filepos:"small"}])
                setFileTemp([...fileTemp ,{filebase64:reader.result , fileimg:file, filepos:"small"}])

                setStatusImgList(true)
    
            }
            reader.readAsDataURL(file) 


        }

    }

    const delMutiPer = (e) => {

       // console.log(e.currentTarget.id)
        setStatusImgList(false);
        var new_arr = [];

        imgOldData.forEach((file , keys) => {

            if(keys.toString() !== e.currentTarget.id)
            {
                new_arr.push(file);
                
            }
          });
          setImgOldData(new_arr);
          setStatusImgList(true);
    }
    const submitRoom = async (e) => {
        e.preventDefault();
        if(rCate && sizeRoom && sizeAdults && detailRoom && roomRecom && chkSwitch){

            const frmData = new FormData();
            var amenlist = [];
            var imgOld = [];
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
         
            imgOldData.forEach((data , key) => {
    
                    if(data.filebase64 === ""){
                        var sp_url = data.fileimg.split(urlServer);
                        imgOld.push(sp_url[1]);
                    }
    
                 
            })

            console.log(imgOld);

            if(fileTempFront["filebase64"] !== ""){

                    frmData.append('fronts', fileTempFront.fileimg.name);
                    frmData.append('filesnew', fileTempFront.fileimg);
            }

            if(fileTemp.length > 0){

                 fileTemp.forEach((data , key) => {

                    frmData.append('filesnew', data.fileimg);
                    
                })
            }

           
           frmData.append('imgold', imgOld);

            try {

                const response = await endpoint.post("/roomupdate/edit/"+id ,frmData, {delay: 500 , headers: {
                    'Content-Type': 'multipart/form-data'
                }});
                
                 console.log(response)
                if(response.data.code === 1){
    
                        setIsStatus(true);
                        setStatusForm(true);
                        setMsgSystem('ปรับปรุงข้อมูลเรียบร้อยแล้ว');
    
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


        }


        console.log('submit');


    }

  return (
    <>      <div ref={alertRef}></div>
            <Grid container sx={{m:1}}>
                <Grid item xs={4}>
                    <Link to={"/backend/room"} style={{textDecoration: "none"}}><Button variant="contained" color="primary"><ArrowBackIcon/> กลับ</Button></Link>
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
                            id="cate"
                            value={rCate}
                            label="หมวดหมู่ห้อง"
                            onChange={handleChange}
                            >
                            <MenuItem value=''></MenuItem>
                            {
                                statusReq ? 
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
                          id="numcustomer" 
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
                            labelId="cate-label"
                            id="amemties"
                            value={amenData}
                            label="สิ่งอำนวยความสะดวก"
                            onChange={(e) => setAmenData(e.target.value)}
                            >
                            <MenuItem value=''></MenuItem>
                           {
                                amenList.map((val , keys) => {


                                    return (<MenuItem key={val.amenid} value={val.amennameen} disabled={val.disable}>{val.amenname}</MenuItem>)

                                })

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
                            :<Typography variant='h6' sx={{p:2}}>ไม่มีข้อมูล</Typography>
                        }  
                   </Box>
                
                   </Grid>
                   <Grid item xs={12} sx={{p:2}}>
                        <Typography variant='h6'>VILLA FACILITIES</Typography>
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
                                <ImageIcon/>
                                <input
                                type="file"
                                name="filethumb"
                                onChange={uploadImgFront}
                                hidden
                                />
                            อัพโหลดรูปหน้าปกห้องพัก
                    </Button>
                    
                   
                    <Grid item xs={12} sx={{pt:2}}>
                        {
                            statusImgThm && statusReq
                            ?
                            <img src={fileTempFront["filebase64"] === "" ? fileTempFront.fileimg : fileTempFront.filebase64} alt="img-main-product" style={{width:"100%"}} />
                            :<img src={'../../../image/noimg.jpg'} alt="img-blank" />
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
                                hidden
                                />
                            อัพโหลดรูปห้องพัก
                    </Button>
                    <Box
                        sx={{
                            display:imgOldData.length > 0 ? "block" : "none",
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

                            statusImgList && imgOldData.length > 0 
                            ?
                            imgOldData.map((val , keys) => {

                                     return (val.filepos === "small") ?
                                                <Box key={keys} sx={{
                                                width:200 , 
                                                height:200, 
                                                backgroundImage: `url(${val.filebase64.length === 0 ? val.fileimg : val.filebase64})`,
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
                        <Button variant='contained' color="error" sx={{m:1}}>ยกเลิก</Button>
                </Grid>
             </Grid>
             </form>
        </>
  )
}

export default RoomEdit