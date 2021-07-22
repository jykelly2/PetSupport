import {grayColor} from "assets/jss/material-dashboard-react.js";
import checkboxAndRadioStyle from "assets/jss/material-dashboard-react/checkboxAndRadioStyle";

const animalDocumentStyle = {
  grid:{
    padding:"0px 50px 40px 50px "
  },
    marginTop: {
      marginTop: "27px !important",
    },
    buttonSpace: {
        marginTop: "2.9rem",
        marginLeft: "-1.8rem"
    },
    title:{
        marginTop: "16px",
        fontSize: "15.5px",
        lineHeight: "22px",
        color: grayColor[2], 
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontWeight: "450",
      },
    ...checkboxAndRadioStyle 
  };

  export default animalDocumentStyle;