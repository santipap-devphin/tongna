import React  , {useState , useEffect , useRef} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Grid , Button , TextField , InputLabel  , MenuItem , FormControl , Select   , Typography ,Box , Alert , AlertTitle , Switch ,FormGroup , FormControlLabel} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EditorExper from '../../component/EditorExper';
import endpoint from '../../api/endpoint';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const ExperAdd = () => {

    const alertRef = useRef(null);
    const [experType , setExperType] = useState([]);
    const [isStatus, setIsStatus] = useState(false)
    const [titleExper , setTitleExper] = useState('');
    const [sizeRoom , setSizeRoom] = useState('');
    const [capaRoom , setCapaRoom] = useState('');
    const [detailExper , setDetailExper] = useState('');
    const [chkSwitch , setchkSwitch] = useState(true); 
    const [cateEx, setCateEx] = useState('');
    const [reqStatus , setReqStatus] = useState(false);
    const [fileTemp , setFileTemp] = useState({});
    const [statusImg , setStatusImg] = useState(false);
    const [highLightExper , setHighLightExper] = useState('');
    const [msgSystem, setMsgSystem] = useState("");
    const [statusForm , setStatusForm] = useState(false);
    let navicate  = useNavigate();
   
    useEffect(() => {

        let callSuccess = true; 
        const reqData = async () => {
             try {

                const response = await endpoint.get("/experience/type");

                if(response.data.code === 1){

                    setExperType(response.data.list);
                    setReqStatus(true);

                }

                
            } catch (err) {
                console.error(err)
            }
         }

         if(callSuccess){

            reqData();
         }

         return () => {

            callSuccess = false; 

        }
    },[])

    const handleChangeEditor = (val) => {

        setDetailExper(val)

    }
    const alertStatus  = (message) => {

        setIsStatus(true);
        setMsgSystem(message);
        window.scrollTo({top:alertRef.current.scroll , behavior: 'smooth'}) 

        setTimeout(function() {
            setIsStatus(false);
            setStatusForm(false);
         }, 5000);

    }
    const submitExper = async (e) => {
   
       e.preventDefault();
      

       if(Object.keys(fileTemp).length > 0){

                if(cateEx && titleExper && highLightExper && detailExper){

                    const frmData = new FormData();

                    frmData.append("experCate", cateEx);
                    if(cateEx === "MEETINGROOM"){

                        frmData.append("experDetail", JSON.stringify({experSize:sizeRoom , experCapa:capaRoom}));

                    }
                    frmData.append("experTitle", titleExper);
                    frmData.append("experHighlight", highLightExper);
                    frmData.append("file", fileTemp["fileimg"]);
                    frmData.append("experContent", JSON.stringify(detailExper));
                    frmData.append("experStatus", chkSwitch);
                  


                    try {

                        const response = await endpoint.post("/experience/add" , frmData, {delay: 500 , headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        }});

                        if(response.data.code === 1 ){

               
                            setIsStatus(true);
                            setStatusForm(true);
                            setMsgSystem('คุณเพิ่มข้อมูลได้ถูกต้อง');
        
                            window.scrollTo({top:alertRef.current.scroll , behavior: 'smooth'}) 
                            setTimeout(function() {
                                
                                setStatusForm(false);
                                navicate('/backend/experience');
                            
                            }, 5000);

                        }

                        console.log(response)
                        
                    } catch (err) {
                        console.error(err)
                    }

                }else{

                    alertStatus('กรุณากรอกข้อมูลที่กำหนดให้ถูกต้อง');
                }

        }else{

            alertStatus('กรุณาเพิ่มรูปหน้าปกสำหรับ Experience');
       }
    }
   
    const handleChange = (val) => {

        setCateEx(val)
    }
   //upload file ไปที่ image Gallery
   const handleImageUpload = (targetImgElement, index , state, imageInfo, remainingFilesCount) => {

   
   // const file = e.target.files[0];
    //const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    //console.log(e.target.files)

    /*if (!allowedTypes.includes(file?.type)) {
        //setIsStatus(true);
        //setStatusImg(true);
        //setMsgSystem("Only JPEG, PNG, and GIF images are allowed.");

        alert("Only JPEG, PNG, and GIF images are allowed.");
        return;
    }else{

            console.log(file)
            const reader = new FileReader();

        reader.onloadend = () => { 

            console.log(fileTemp)
            //console.log(reader.result)
            setFileTemp([...fileTemp , {filebase64:reader.result , fileimg:file , filepos:"small"}])
           
            //file["namefolder"]  = "cate";
            setStatusImg(true);
        }

        reader.readAsDataURL(file) 

    }*/

         
   }
   const uploadImg = (e) => {

    setStatusImg(false)
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!allowedTypes.includes(file?.type)) {
       
        setStatusImg(true);
        setMsgSystem("Only JPEG, PNG, and GIF images are allowed.");
        return;
    }else{

        const reader = new FileReader();

        reader.onloadend = () => { 

            console.log(fileTemp)
            //console.log(reader.result)
            setFileTemp({...fileTemp , filebase64:reader.result , fileimg:file})
           
            //file["namefolder"]  = "cate";
            setStatusImg(true);
        }

         reader.readAsDataURL(file) 

    }
    
 }
 const goView = () => {

    //console.log(detailExper)
    if(titleExper !== ""){

        localStorage.setItem(titleExper,JSON.stringify(detailExper))
        //navicate("/preview/"+titleExper)
        window.open('/preview/'+titleExper, '_blank');

    }
    else{
        alert("ไม่มีข้อมูล");
    }
  }
 return (<><div ref={alertRef}></div>
            {console.log(fileTemp)}
            <Grid container sx={{m:1}}>
                <Grid item xs={4}>
                    <Link to={"/backend/experience"} style={{textDecoration: "none"}}><Button variant="contained" color="primary"><ArrowBackIcon/> กลับ</Button></Link>
                </Grid>
            </Grid>
            <Box id="hero-section" sx={{display:isStatus ? "block" : "none" , p:2}}>
                <Alert severity={statusForm ? "success" : "error"}>
                    <AlertTitle>{statusForm ? "เพิ่มข้อมูลเรียบร้อยแล้ว" : "เกิดข้อผิดพลาด"}</AlertTitle>
                        ข้อความจากระบบ — <strong>{msgSystem}</strong>
                </Alert>
           </Box>
            <form onSubmit={submitExper} style={{width:"97%"}}>
            <Grid container sx={{background:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , m:1.5}}>
            <Grid item xs={12} sx={{p:2}}>
                    <FormControl variant="filled" fullWidth>
                            <InputLabel id="cate-select-label">หมวดหมู่</InputLabel>
                            <Select
                            labelId="cate-label"
                            id="cate"
                            value={cateEx}
                            label="หมวดหมู่"
                            onChange={(e) => handleChange(e.target.value)}
                            >
                            <MenuItem value=''></MenuItem>
                            {
                                reqStatus && experType.length > 0 ?

                                experType.map((item , key) => {


                                    return <MenuItem key={key} value={item.expernameen}>{item.expernameth}</MenuItem>

                                })

                                :null

                            }
                           </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sx={{p:2}}>
                            <TextField 
                            id="titleexper" 
                            label="หัวข้อ experience" 
                            variant="filled" 
                            value={titleExper} 
                            onChange={(e) => setTitleExper(e.target.value)}
                            
                            fullWidth/>
                </Grid>
                {
                     cateEx === "MEETINGROOM" ?
                    <>
                        <Grid item xs={4} sx={{p:2}}>
                            <TextField 
                            id="sizeroom" 
                            label="ขนาดพื้นที่" 
                            variant="filled" 
                            value={sizeRoom}
                            onChange={(e) => setSizeRoom(e.target.value)} 
                            fullWidth/>
                        </Grid>
                            <Grid item xs={1} sx={{p:2}}>
                            <Typography variant='h4'>ตรม.</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{p:2}}>
                            <TextField 
                             id="capasityroom" 
                             label="ความจุ" 
                             variant="filled" 
                             value={capaRoom} 
                             onChange={(e) => setCapaRoom(e.target.value)}
                             fullWidth />
                        </Grid>
                        <Grid item xs={1} sx={{p:2}}>
                            <Typography variant='h4'>/คน</Typography>
                        </Grid>
                    </>
                 : null
                }
                <Grid item xs={12} sx={{p:2}}>
                <TextField
                    id="highlightexper"
                    label="ข้อความแนะนำ experience"
                    multiline
                    rows={3}
                    value={highLightExper}
                    onChange={(e) => setHighLightExper(e.target.value)}
                    variant="filled"
                    fullWidth
                />
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
                                name="thumpexper"
                                onChange={uploadImg}
                                hidden
                                />
                            อัพโหลดรูปหน้าปก Experience
                    </Button>
                    <Grid item xs={12} sx={{pt:2}}>
                    {
                        statusImg && Object.keys(fileTemp).length > 0 ?
                        <img src={fileTemp.filebase64} alt="img-main-product" style={{width:"100%"}} /> 
                        : <img src={'../../image/noimg.jpg'} alt="img-blank" />
                    }
                    </Grid>
                    
                </Grid>
               <Grid item xs={12} sx={{p:2}}>
                     <Typography variant='h6'>รายละเอียด Experience</Typography>
                     
                     <Button onClick={goView} variant='outlined' sx={{mt:1 , mb:1}} startIcon={<RemoveRedEyeIcon />}>View</Button>
                     <EditorExper
                        initialContent={detailExper}
                        onChange={handleChangeEditor}
                        ImageUpload = {handleImageUpload}
                        placeholder={""} 
                     />
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

export default ExperAdd