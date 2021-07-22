import {
  container,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  blackColor,
  whiteColor,
  grayColor,
  hexToRgb,
} from "assets/jss/material-dashboard-react.js";

const headerStyle = (theme) => ({
  logo: {
    position: "relative",
    padding: "15px 3px",
    zIndex: "4",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: "0",

      height: "1px",
      right: "15px",
      width: "calc(100% - 30px)",
      backgroundColor: "rgba(" + hexToRgb(grayColor[6]) + ", 0.3)",
    },
  },
  logoImage: {
    width: "30px", //30
    display: "inline-block",
    maxHeight: "30px", //30px
    marginLeft: "4px",
    marginRight: "25px",
  },
  img: {
    width: "185px", //175 //200
    height: "40px", //45
    marginTop:"10px",
    marginLeft: "32px", //18
  },
  logoLink: {
   textTransform: "uppercase",
    padding: "5px 0",
    display: "block",
    fontSize: "19px",
    textAlign: "left",
    fontWeight: "400",
    lineHeight: "30px",
    textDecoration: "none",
    backgroundColor: "transparent",
    "&,&:hover": {
      color: grayColor[7],//"rgba(" + hexToRgb(grayColor[6]) + ", 0.3)",
    },
  },
  appBarIconClosed: {
    backgroundColor: whiteColor, //grayColor[12],////grayColor[2],//infoColor[0],//
   position: "fixed",
   [theme.breakpoints.down("sm")]: {
    width: "100%",
    transition: "all 0ms ease 0s",
  },
  width: `calc(100% - 74.5px)`,
  minHeight: "75px", //60
  display: "block",
  color: grayColor[7],
  },
  appBar: {
   backgroundColor: whiteColor, //grayColor[12],////grayColor[2],//infoColor[0],//
   position: "fixed",
   width: `calc(100% - 262px)`,
  minHeight: "75px", //60
  display: "block",
  color: grayColor[7],
  [theme.breakpoints.down("sm")]: {
    transition: "all 0ms ease 0s",
  },
  },
  menuIconOpen:{
    transition: "all 500ms ease 0s",
    marginLeft: "15px", //11
    marginRight: "35px",
  },
  menuIconClosed:{
    transition: "all 500ms ease 0s",
    marginLeft: "15px",
    marginRight: "35px",
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      ...container,
    },
   paddingRight: "15px",
   paddingLeft: "13px",//3//13
    minHeight: "75px",
  },
  flex: {
    flex: 1,
  },
  title: {
    ...defaultFont,
    letterSpacing: "unset",
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    margin: "0",
    "&:hover,&:focus": {
      background: "transparent",
    },
  },
  appResponsive: {
    top: "8px",
  },
  primary: {
    backgroundColor: primaryColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  info: {
    backgroundColor: infoColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  success: {
    backgroundColor: successColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  warning: {
    backgroundColor: warningColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  danger: {
    backgroundColor: dangerColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
});

export default headerStyle;
