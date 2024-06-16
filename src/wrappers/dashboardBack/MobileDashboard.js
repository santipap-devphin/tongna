import  React , {useState , useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs , Tab, Box}  from '@mui/material';


const MobileDashboard = () => {
   const [value, setValue] =  useState(0);
   let navicate = useNavigate();
   
   useEffect(() => {

    const pathname = window.location.pathname;
    let spPath = pathname.split("/");

    var values = 0;

    switch(spPath[2]) {
      case "room":
        values = 0;
        break;
      case "experience":
        values = 1;
        break;
      case "gallery":
        values = 2;
        break;
      case "events":
        values = 3;
        break;
      case "promotion":
        values = 4;
        break;  
      case "contact":
        values = 5;
        break;
      case "category":
        values = 6;
        break;
      case "web":
        values = 7;
        break;
      default:
        values = 0;
    }
    console.log(values)
    setValue(values)


  },[])
  


  const handleChange = (event, newValue) => {
    console.log(newValue)
    let url = "";
    switch(newValue) {
      case 0:
          url = "/backend/room"
          break;
      case 1:
          url = "/backend/experience"
          break;
      case 2:
          url = "/backend/gallery"
          break;
       case 3:
          url = "/backend/events"
          break;
        case 4:
          url = "/backend/promotion"
          break;
        case 5:
          url = "/backend/contact"
          break;
        case 6:
          url = "/backend/category"
          break;
        case 7:
          url = "/backend/web"
          break;
      default:
        url = "/backend/room"
    }

    navicate(url)
    
    setValue(newValue);

  };

 return (<Box sx={{ maxWidth: { xs: "100%" , sm: "100%"  , md:"100%" } , backgroundColor:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d"}}>
          
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                >
                {/*<Tab label="แดชบอร์ด" icon={<DashboardIcon />} />*/}
                <Tab label="Room" />
                <Tab label="Experience"  />
                <Tab label="Gallery"  />
                <Tab label="Events"  />
                <Tab label="Promotion"  />
                <Tab label="ContactMsg"  />
                <Tab label="Category"  />
                <Tab label="Web"  />
               
            
            </Tabs>
        </Box>
  )
}

export default MobileDashboard