import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from "assets/jss/material-dashboard-react.js";

const dashboardStyle = {
  stats: {
  color: grayColor[0],
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  fontWeight: "400",
  display: "inline-flex",
  fontSize: "12px",
  lineHeight: "22px",
  "& svg": {
    top: "4px",
    width: "16px",
    height: "16px",
    position: "relative",
    marginRight: "3px",
    marginLeft: "3px",
  },
  "& .fab,& .fas,& .far,& .fal,& .material-icons": {
    top: "4px",
    fontSize: "16px",
    position: "relative",
    marginRight: "3px",
    marginLeft: "3px",
  },
},
  infoCategory: {
    fontFamily: "'Helvetica', 'Arial', 'sans-serif'",
    fontSize: "14px",
    fontWeight: "600",
    color: grayColor[0],
    margin: "0",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
  },
  cardTitle: {
    fontFamily: "'Helvetica', 'Arial', 'sans-serif'",
    fontSize: "16px",
    fontWeight: "900",
    color: "rgba(0, 0, 0, 0.87)",
    padding: "0.3rem 0rem 0rem 0.5rem",
    marginRight:"auto"
  },
  infoStats:{
    color: grayColor[2],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "500",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  flexEven:{
    display:"flex",
    justifyContent: "space-evenly"
  },
  flex:{
    display: "flex",
  },
  tableButton: {
    //marginRight: "10px",
    justifyContent: "flex-end",
  },
  textCenter:{
    textAlign: "center"
  },
  greenColor:{
    color: 'green'
  }
};

export default dashboardStyle;

// successText: {
//   color: successColor[0],
// },
// upArrowCardCategory: {
//   width: "16px",
//   height: "16px",
// },
