import {
  blackColor,
  whiteColor,
  hexToRgb,
} from "assets/jss/material-dashboard-react.js";

const cardStyle = {
  card: {
    border: "0",
    marginBottom: "30px",
    marginTop: "30px",
    borderRadius: "6px",
    color: "rgba(" + hexToRgb(blackColor) + ", 0.87)", //0.87
    background: whiteColor,
    width: "100%", 
    boxShadow: "0px 8px 15px 2px rgba(" + hexToRgb("#919EAB") + ", 0.40)",//0,16,32,0.24 //"0 1px 10px 0 rgba(" + hexToRgb(blackColor) + ", 0.14)", //bottom 4px
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: ".875rem",
  },
  cardPlain: {
    background: "transparent",
    boxShadow: "none",
  },
  cardProfile: {
    marginTop: "30px",
    textAlign: "center",
  },
  cardChart: {
    "& p": {
      marginTop: "0px",
      paddingTop: "0px",
    },
  },
  cardForm:{
    marginTop: "15px",
  }
};

export default cardStyle;
