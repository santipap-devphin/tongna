import { createContext , useState} from "react";
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import months from '../data/dates.json';
const DataContext = createContext({});


export const DataProvider = ({children}) => { 

    const [datas, setDatas] = useState([]);
    let urlServer = "https://port7070-5grg9.ondigitalocean.app/";

    const theme = createTheme({
        root: {
          margin: "0px",
          padding: "0px"
        }
        , palette: {
          primary: {
            main: "#006F70",
          },
          action: {
            disabledBackground: '#696969',
            disabled: '#696969'
            
          }
          
        },
        typography: {
          fontFamily: "Kanit",
          fontWeightBold:100,
          fontWeightLight: 300,
        }
      });

    const styles = {
        paperContainer: {
            backgroundImage: `url(${'../../image/homee.jpg'})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '98.6vw',
            height: '100vh',
            transition: "all 150ms linear 0.3s",
           
        },
        paperContainer2: {
          backgroundImage: `url(${'../../image/homee2.jpg'})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '98.6vw',
          height: '100vh',
          transition: "all 150ms linear 0.3s",
         
      },
      paperContainer3: {
        backgroundImage: `url(${'../../image/homee3.jpg'})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '98.6vw',
        height: '100vh',
        transition: "all 150ms linear 0.3s",
        
    },
    }
    const scaleTablet = useMediaQuery('(min-width:768px)');
    const matches = useMediaQuery('(max-width:899px)');

    const convertDate = (data) => {
      var lastdate;
      //console.log(months)
      if(data.indexOf("_") > -1){
  
        var spdate = data.split("_");
        var dates = spdate[0];
        var mon = dates[4]+dates[5];
        var years = dates[0]+dates[1]+dates[2]+dates[3];
        var last = dates[6]+dates[7] +" " + months[parseInt(mon)-1].namemonth+" "+ years;
  
        lastdate = last;
      }
  
      return lastdate;
   }

   const convertDateThai = (date) => {

    var data = date.split("-");

    var years = parseInt(data[0]) + 543;
    var newmonths =  months[parseInt(data[1])-1].namemonth;
    var dateThai = data[2] + " " + newmonths + " " + years;


    return dateThai;
   }

    return (
        <DataContext.Provider value={{datas , setDatas , theme , styles , scaleTablet , matches , convertDate , urlServer , convertDateThai}}>
            {children}
        </DataContext.Provider>
   )

}

export default DataContext;