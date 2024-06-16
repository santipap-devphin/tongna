import React , {useState  , useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Typography, Grid  , Stack , Button  , Pagination , Chip }  from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GalList from './GalList';
import DoneIcon from '@mui/icons-material/Done';
import endpoint from '../../api/endpoint';

const GalleryMain = () => {

    const [statusCallApi , setStatusCallApi] = useState(false);
    const [pages , setPages] = useState(1);
    const [prvPage , setPrvPage] = useState(1);
    const [listGallery , setListGallery] = useState([]);
    const [prvGallery , setPrvGallery] = useState([]);
    const [statusReq , setStatusReq]  = useState(false);
    const [tagsAll , setTagsAll]  = useState([]);
    const [tagChk , setTagChk] = useState([])
    let tagsChoose = [];
  
    const changePage = (e , value) => {
         //console.log(value);
        //alert(value)
        setPrvPage(value)
    }
   
    useEffect(() => {

    let callSuccess = true;

    const reqRequestImg = async () => {

        try {

          const response = await endpoint.get("/imgmedia/all");
          let tags = [];
          if(response.data.code === 1){

             console.log('infuct');
             //console.log(response.data.list)
             response.data.list.forEach((ele , index) => {
                const pos = index+1;
                const page = Math.ceil(pos / 10);
                ele["page"] = page;
                
                if(typeof ele["tag"] === "object"){

                    ele["tag"].forEach((data) => {

                        tags.push(data)

                    })

                }else{
                    tags.push(ele["tag"])
                }
                //console.log(typeof ele["tag"])

            })

            var unique = tags.filter((value, index, array) => array.indexOf(value) === index);

            const pageTotal = Math.ceil(response.data.list.length / 10);
            setListGallery(response.data.list);
            setPrvGallery(response.data.list);
            setPages(pageTotal);
            setTagsAll(unique);
            setStatusReq(true);

          }
          
        } catch (err) {
            console.error(err)
        }

    }

    if(callSuccess){
        reqRequestImg();
    }

    return () => {

        callSuccess = false;
        
    }


    },[statusCallApi])

    useEffect(() => {

       let newData = [];

       console.log('intagschk');

        if(tagChk.length > 0 ){

            prvGallery.forEach((ele) => {
            
                if(typeof ele["tag"] === "object"){
    
                    ele["tag"].forEach((itm) => {
                        if(tagChk.indexOf(itm)  > -1){
                                newData.push(ele);
    
                        }
                     })
    
                }else{
    
                    if(tagChk.indexOf(ele["tag"])  > -1){
    
                        newData.push(ele);
    
                    }
                 }
    
                 ele["page"] = 1;
                 setPages(1);
    
                 const arrayUniqueByKey = [...new Map(newData.map(item =>
                    [item["imgid"], item])).values()];
                 
                 //console.log(arrayUniqueByKey)
                 setListGallery(arrayUniqueByKey);
             })

        }else{

            const pageTotal = Math.ceil(prvGallery.length / 10);
            setPages(pageTotal);

            prvGallery.forEach((ele , index) => {

                const pos = index+1;
                const page = Math.ceil(pos / 10);
                ele["page"] = page;

            })
            setListGallery(prvGallery);

        }

    },[tagChk , prvGallery])

    const handleClick = (tag) => {

        //tagsChoose.push()
        if(tagChk.indexOf(tag) > -1){

            tagChk.splice(tagChk.indexOf(tag) , 1);

            setTagChk([...tagChk])

        }else{

            tagsChoose.push(tag);
            setTagChk([...tagChk , tag])
        }
     }

  return (<>
                <Stack spacing={1} sx={{m:1}} direction="row">
                    <Typography variant='h6' sx={{color:"#000"}}>Gallery</Typography>
                    <Link to={"/backend/gallery/add"} style={{textDecoration: "none"}}><Button variant="contained" color="info"><AddIcon /> เพิ่มข้อมูล</Button></Link>
                </Stack>
              
                {/*console.log(statusReq)*/}
                {console.log(tagChk)}
               <Grid container spacing={2}>
                    <Grid item xs={12}>
                            {
                                tagsAll.length > 0 ?
                                tagsAll.map((itm , keys) => {

                                    return   tagChk.indexOf(itm) > -1 ?
                                                    <Chip
                                                        key={keys}
                                                        label={itm}
                                                        onClick={()=> handleClick(itm)}
                                                        icon={<DoneIcon />}
                                                        color="success"
                                                        sx={{m:0.2}}
                                                />
                                                : 
                                                <Chip
                                                key={keys}
                                                label={itm}
                                                onClick={()=> handleClick(itm)}
                                                sx={{m:0.2}}
                                                />
                                })
                                :null
                            }
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    {
                        statusReq ? 
                        <GalList listData={listGallery} page= {prvPage} status={setStatusCallApi} />
                        :null
                    }
                   
                </Grid>
                <Stack spacing={2} sx={{mt:1}} alignItems="center">
                        <Pagination count={pages} color="primary" onChange={changePage} />
                </Stack>
            </>
    )
}

export default GalleryMain