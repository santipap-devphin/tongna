import React  , {useState , useEffect} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Grid , Button , TextField ,  FormControl , InputLabel , Select, MenuItem , Typography , Stack} from '@mui/material';
import SweetAlert2 from 'react-sweetalert2';
import endpoint from '../../api/endpoint';
import CloseIcon from '@mui/icons-material/Close';

const CategoryAdd = () => {

    let navicate = useNavigate();

    //let CATEEN_REGEX = /^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/;
    //let CATETH_REGEX = /^[ก-๏\s]+$/;
    /*/^[ก-๙]+$/*/
    const [groupCate , setGroupCate] = useState('');
    const [cateDataTh , setCateDataTh] = useState('');
    const [cateDataEn , setCateDataEn] = useState('');
    const [validCateTh , setValidCateTh] = useState(false);
    const [validCateEn , setValidCateEn] = useState(false);
    const [listCate , setListCate] = useState([]);
    const [statusMsg , setStatusMsg] = useState(false);
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

    const msgAlert = (mes , icons , types) => {

        if(types === "error"){

            setSwalProps({...swalProps , show:true , icon:icons , title:"ข้อความจากระบบ" , text:mes})
            setTimeout(function(){setSwalProps({...swalProps , show:false , icon:"", title:"" , showConfirmButton:false}) }, 2000);
        }
        else if(types === "success"){

            setSwalProps({...swalProps , show:true , icon:icons , title:"ข้อความจากระบบ" , text:mes})
            setTimeout(function(){setSwalProps({...swalProps , show:false , icon:"", title:"" , showConfirmButton:false}) }, 2000);
            setTimeout(function() { navicate('/backend/category');}, 3000);

        }else{

            setTimeout(function(){setSwalProps({...swalProps , show:false , icon:"", title:"", cancelButtonText:"ปิด" , showConfirmButton:false}) }, 500);

        }
    }
    useEffect(() => {

       const CATETH_REGEX = /^[ก-๏\s]+$/;
       setValidCateTh(CATETH_REGEX.test(cateDataTh))

    },[cateDataTh])

    useEffect(() => {
        
        const CATEEN_REGEX = /^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/;
        setValidCateEn(CATEEN_REGEX.test(cateDataEn))

    },[cateDataEn])
   
    const submitCate = async (e) => {
   
       e.preventDefault();

        if(groupCate && cateDataTh){

                try {

                    const response = await endpoint.post("/cate/add" , {group:groupCate , cateth:cateDataTh , cateen:cateDataEn});
                    if(response.data.code === 1){

                        msgAlert("เพิ่มข้อมูลเรียบร้อยแล้ว" , "success" , "success");
                    }
                
                } catch (err) {
                    console.error(err)
                }

         }else{

        if(groupCate === ""){

            msgAlert("กรุณาเลือกข้อมูลกลุ่ม" , "error" , "error")
            
            
        }else if(cateDataTh === ""){
            msgAlert("กรุณากรอกข้อมูลหมวดหมู่" , "error" , "error")
        }
        else{
            msgAlert("กรุณา รีเพรชหน้าใหม่อีกครั้ง" , "error" , "error")
        }

       }
     }

     useEffect(() => {
        let callSuccess = true;

        const reqCate = async () => {

            try {

                const response  = await endpoint.get("/cate/all");
                if(response.data.code === 1){
                        setListCate(response.data.list);
                        setStatusMsg(true);
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
        }


     },[])
   
    

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

                            navicate("/backend/category");
                        }
                    }}
             />
                <Grid container sx={{m:1}}>
                    <Grid item xs={4}>
                        <Link to={"/backend/category"} style={{textDecoration: "none"}}><Button variant="contained" color="primary"><ArrowBackIcon/> กลับ</Button></Link>
                    </Grid>
                </Grid>
                <form onSubmit={submitCate} style={{width:"97%"}}>
                <Grid container sx={{background:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , m:1.5}}>
               
                    <Grid item xs={12} sx={{p:2}}>
                    <FormControl variant="filled" fullWidth>
                            <InputLabel id="cate-select-label">กลุ่ม</InputLabel>
                            <Select
                            labelId="cate-label"
                            id="group"
                            value={groupCate}
                            label="หมวดหมู่ห้อง"
                            onChange={(e) => setGroupCate(e.target.value)}
                            >
                            <MenuItem key={0} value=''></MenuItem>
                            {
                                statusMsg && listCate.length > 0 ? 
                                listCate.map((itm , i) => {

                                    return <MenuItem key={itm.groupid} value={itm.groupname}>{itm.groupname}</MenuItem>

                                })
                                :null

                            }
                           </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{p:2}}>
                               
                                <TextField 
                                id="cate" 
                                label="หัวข้อ Category (ภาษาไทย)" 
                                variant="filled" 
                                value={cateDataTh} 
                                onChange={(e) => setCateDataTh(e.target.value)}
                                fullWidth/>
                                 {
                                    !validCateTh && cateDataTh !== "" ? 
                                    <Stack sx={{mt:1}} direction="row">
                                            <CloseIcon fontSize='small' style={{paddingTop:"0px" , color:"red"}}/>
                                            <Typography variant='p' sx={{color:"red"}}>   กรุณากรอกข้อมูลเป็นภาษาไทยเท่านั้น</Typography>
                                    </Stack>
                                    :null
                                }
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{p:2}}>
                               
                               <TextField 
                               id="cateen" 
                               label="หัวข้อ Category (ภาษาอังกฤษ)" 
                               variant="filled" 
                               value={cateDataEn} 
                               onChange={(e) => setCateDataEn(e.target.value)}
                               fullWidth/>
                                {
                                   !validCateEn && cateDataEn !== "" ? 
                                   <Stack sx={{mt:1}} direction="row">
                                           <CloseIcon fontSize='small' style={{paddingTop:"0px" , color:"red"}}/>
                                           <Typography variant='p' sx={{color:"red"}}>   กรุณากรอกข้อมูลเป็นภาษาอังกฤษเท่านั้น</Typography>
                                   </Stack>
                                   :null
                               }
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

export default CategoryAdd