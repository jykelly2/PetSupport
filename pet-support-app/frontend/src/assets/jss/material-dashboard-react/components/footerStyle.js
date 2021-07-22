import {
  defaultFont,
  container,
  primaryColor,
  whiteColor,
  grayColor,
} from "assets/jss/material-dashboard-react.js";

const footerStyle = (theme) => ({
  left: {
    float: "left!important",
    fontSize: "14px",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: "400",
    [theme.breakpoints.down("xs")]: {
      width:'100%',
      display: 'flex',
      justifyContent: 'center',
      margin:"15px 0px 0px 0px"
    },
  },
  right: {
    fontSize: "14px",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: "400",
    float: "right!important",
    [theme.breakpoints.down("xs")]: {
            width:'100%',
            display: 'flex',
            justifyContent: 'center',
            margin: "5px 0px 10px 0px",
      },
  },
  footer: {
    padding: "0px 37px 0px 37px",
    height: "70px",
   backgroundColor: whiteColor,
  },
  footerLabelClosed: {
    height: "70px",
    padding: "0px 40px 0px 110px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 37px 0px 37px", 
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0px 0px 0px 0px",
    },
    backgroundColor: whiteColor,
  },
  container,
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent",
  },
});

export default footerStyle;
