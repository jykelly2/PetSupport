import {grayColor} from "assets/jss/material-dashboard-react.js";
import checkboxAndRadioStyle from "assets/jss/material-dashboard-react/checkboxAndRadioStyle";

const animalInfoStyle = {
  grid:{
    padding:"0px 40px 40px 40px "
  },
    marginTop: {
      marginTop: "27px !important",
    },
    buttonSpace: {
        marginTop: "2.3rem",
        marginLeft: "-1.5rem"
    },
    title:{
      marginTop: "16px",
      fontSize: "14px",
      lineHeight: "22px",
      color: grayColor[3] + " !important",//grayColor[2],
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: "400",
       marginBottom: "1rem",
    },
 
    ...checkboxAndRadioStyle 
  };

  export default animalInfoStyle;