import React  , {useState , useEffect , useContext} from 'react';
import dayjs from 'dayjs';
import { Link , useNavigate , useParams} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Grid , Button , TextField  , Typography ,Box, Switch ,FormGroup , FormControlLabel, Stack} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import Editor from '../../component/Editor';
import CloseIcon from '@mui/icons-material/Close';
import SweetAlert2 from 'react-sweetalert2';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import endpoint from '../../api/endpoint';
import DataContext from '../../context/DataContext';

function PromotionEdit() {

    const {id} = useParams();
    let paramID = id;
    const {urlServer} = useContext(DataContext);

    const addZero = (date) => {
        let data;
        if(date < 10){
             data = "0"+date;
        }else{
            data = date;
        }
        return data;
    }
    let navicate =  useNavigate();
    const [chkSwitch , setchkSwitch] = useState(true); 
    
    const [titlePro, setTitlePro] = useState('');
    const [fileTemp, setFileTemp] = useState([]);
    const [detailPro , setDetailPro] = useState('');
    const [statusImg , setStatusImg] = useState(false)
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

   
    const [sDate, setsDate] = useState();
    const [eDate, seteDate] = useState();

    const submitPromotion = async (e) => {
   
        e.preventDefault();
        let newMsg = "";
        let imgOld = [];

        let newSdate = sDate.toLocaleDateString().split("/");
        let reNewS = (parseInt(newSdate[2]) - 543)+"-"+ addZero(newSdate[1])+"-"+ addZero(newSdate[0]);
        let newEdate = eDate.toLocaleDateString().split("/");
        let reNewE = (parseInt(newEdate[2]) - 543)+"-"+ addZero(newEdate[1])+"-"+ addZero(newEdate[0]);
      
        
        if((reNewE > reNewS) === true){

             if(titlePro && fileTemp.length > 0 && detailPro){
 
                 const frmData = new FormData();
                 frmData.append("id", paramID);
                 frmData.append("title", titlePro);
                 frmData.append("des", JSON.stringify(detailPro));
                 frmData.append("status", chkSwitch);
                 frmData.append("sdate", reNewS);
                 frmData.append("edate", reNewE);

                 if(fileTemp.length > 0){

                    fileTemp.forEach((itm) => {

                        if(itm.filebase64 === ""){

                             imgOld.push(itm.fileimg);

                        }else{
                            frmData.append('files', itm.fileimg);
                        }
                        
                    })
                 }

                 frmData.append('imgold',JSON.stringify(imgOld));
                 
                 try {
 
                     const response = await endpoint.post("/promotion/update"  , frmData, {delay: 500 , headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'multipart/form-data'
                     }});
 
                     if(response.data.code === 1){
 
                         setSwalProps({...swalProps , show:true , title:"ปรับปรุงข้อมูลเรียบร้อย" , showConfirmButton:true})
 
                         setTimeout(function() {setSwalProps({...swalProps , show:false , title:"" , showConfirmButton:false})}, 3000);
 
                         setTimeout(function() { navicate('/backend/promotion');}, 5000);
                     }
                     
                 } catch (err) {
                     console.error(err)
                 }
 
                 
             }else{
 
                 if(titlePro === ""){
 
                     newMsg = "กรุณากรอกหัวข้อโปรโมชั่น";
 
                 }else if(fileTemp.length === 0){
 
                     newMsg = "กรุณาอัพโหลดรูปภาพอย่างน้อง 1 รูป"
 
                 }else if(detailPro === ""){
                     newMsg = "กรุณากรอกรายละเอียดโปรโมชั่น"
                 }
 
                 setSwalProps({...swalProps , show:true , title:"ข้อความระบบ" ,text:newMsg ,icon:"error" , showConfirmButton:false});
 
                 return;
             }
 
 
        }else{
 
             setSwalProps({...swalProps , show:true ,icon:"error", title:"ข้อความระบบ" , text:"กรุณาเลือกวันสิ้นสุดโปรโมชั่น มากกว่า วันเริ่มโปรโมชั่น"})
        }
   }
   
   const changeImg = (e) => {

        console.log('mutiroom')
        setStatusImg(false);
        const file = e.target.files[0];
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        //console.log(e.target.files)

        if (!allowedTypes.includes(file?.type)) {
        
            setStatusImg(true);
            setSwalProps({...swalProps , show:true , title:"ข้อความระบบ" , text:"Only JPEG, PNG, and GIF images are allowed."})
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

    const handleEditTor = (value) => {
        setDetailPro(value)
    }
    const handleChangeSDate = (value) => {

        setsDate(value["$d"]);
  };
  const handleChangeEDate = (value) => {

         seteDate(value["$d"]);

  };
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
 const mutiClick = (e) => {
    console.log(fileTemp)
    console.log(e.target.value)
}

 useEffect(() => {

    let callSucess = true; 
    let newImg = [];
    const reqPromotionOnce = async () => {


        try {
            const response = await endpoint.get("/promotion/once/"+paramID);
            if(response.data.code === 1){

                setTitlePro(response.data.list.proTitle);
                setDetailPro(JSON.parse(response.data.list.proDes))
                setchkSwitch(response.data.list.proStatus === "true" ? true : false);

                if(response.data.list.proImg.length > 0){

                    response.data.list.proImg.forEach((ele) => {

                        newImg.push({filebase64:"", fileimg:ele})

                    })

                }
                setFileTemp(newImg);
                setsDate(new Date(response.data.list.proSdate));
                seteDate(new Date(response.data.list.proEdate));
                setStatusImg(true);
                
            }
            
        } catch (msg) {
            console.error(msg)
        }
        
    }

    if(callSucess){
        reqPromotionOnce();
    }
    return () => {
        callSucess = false;
    }


 },[paramID])
return (<>
            <SweetAlert2 
                {...swalProps}
                didClose={() => {
                    // run when swal is closed...
                    setSwalProps({...swalProps , show:false })
                }}
                onConfirm={result =>  {
                    // run when clieked in confirm and promise is resolved...
                    if(result.isConfirmed){

                        navicate("/backend/promotion");
                    }
                }}
            />
            <Grid container sx={{m:1}}>
                <Grid item xs={4}>
                    <Link to={"/backend/promotion"} style={{textDecoration: "none"}}><Button variant="contained" color="primary"><ArrowBackIcon/> กลับ</Button></Link>
                </Grid>
            </Grid>
                <form onSubmit={submitPromotion} style={{width:"97%"}}>
                <Grid container sx={{background:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , m:1.5}}>
            
                    <Grid item xs={12} sx={{p:2}}>
                                <TextField 
                                id="titlepro" 
                                label="หัวข้อ Promotion" 
                                variant="filled" 
                                value={titlePro} 
                                onChange={(e) => setTitlePro(e.target.value)}
                                fullWidth/>
                    </Grid>
                    
                    <Grid item xs={12} sx={{p:2}}>
                            <Typography variant='p' sx={{color:"red"}}> ***** หมายเหตุ รูปแรกที่อัพโหลด จะเป็นรูปหน้าปกของ Promotion</Typography>
                            <br />
                            <Button
                            variant="contained"
                            component="label"
                            size="small"
                            color="primary"
                            sx={{mt:1 , "&:hover": { backgroundColor:"#fff" , color:"#000"}}}
                        >
                                    <ImageIcon/>
                                    <input
                                    name="filepromotion"
                                    type="file"
                                    onChange={changeImg}
                                    onClick={(e) => mutiClick(e)}
                                    hidden
                                    />
                                อัพโหลดรูป Promotion
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
                                                backgroundImage: `url(${val.filebase64 === "" ? urlServer+ val.fileimg :val.filebase64})`,
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
                        <Typography variant='h6'>รายละเอียด Promotion</Typography>
                        <Editor 
                            initialContent={detailPro}
                            placeholder={""} 
                            onChange={handleEditTor}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{p:2}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={[
                                    'DatePicker',
                                    'MobileDatePicker',
                                    'DesktopDatePicker',
                                    'StaticDatePicker',
                                    ]}
                                >
                            
                                <DemoItem label="วันที่เริ่ม">
                                    <MobileDatePicker value={dayjs(sDate)} onChange={handleChangeSDate} />
                                </DemoItem>
                            </DemoContainer>
                            </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6} sx={{p:2}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={[
                                    'DatePicker',
                                    'MobileDatePicker',
                                    'DesktopDatePicker',
                                    'StaticDatePicker',
                                    ]}
                                >
                            
                                <DemoItem label="วันที่สิ้นสุด">
                                    <MobileDatePicker value={dayjs(eDate)} onChange={handleChangeEDate} />
                                </DemoItem>
                            </DemoContainer>
                            </LocalizationProvider>
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

export default PromotionEdit