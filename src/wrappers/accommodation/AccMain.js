import React , {useState , useEffect , useContext} from 'react';
import DataContext from '../../context/DataContext';
import {Box , Container} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import CardAccom from '../../component/CardAccom';
import endpoint from '../../api/endpoint';

const AccMain = () =>{

   const [listRoom , setListRoom] = useState([]);
   const [statusSucc , setStatusSucc] = useState(false); 
   const {urlServer} = useContext(DataContext);

useEffect( () => {

    let callSuccess = true;

    const reqAccom = async () => {

        const response = await endpoint.get("/roomcate/all");
        if(response.data.code === 1){
            setListRoom(response.data.list);
            setStatusSucc(true)

        }
    }

    if(callSuccess){
        reqAccom();
    }

    return () => {

        callSuccess = false;

    }
},[statusSucc])


return <>
            <Box
            sx={{
            display: 'flex',
            
            }}
            >
                <Container>
                        <Grid container spacing={2} sx={{pt:"50px" , pb:"50px"}}>

                                {
                                    statusSucc && listRoom.length > 0 ?

                                    listRoom.map((itm , i ) => {

                                        return  <Grid key={i} item="true" md={4}>
                                                     <CardAccom data={itm} server={urlServer} />
                                                </Grid>
                                    })
                                    :null
                                }
                        </Grid>
                </Container>
            </Box>
          </>

}

export default AccMain;
