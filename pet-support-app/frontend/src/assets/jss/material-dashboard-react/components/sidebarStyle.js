import {
  drawerWidth,
  transition,
  boxShadow,
  defaultFont,
  primaryColor,
  primaryBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  lightBlueColor,
  grayColor,
  blackColor,
  hexToRgb,
} from "assets/jss/material-dashboard-react.js";

import tooltipsStyle from "assets/jss/material-dashboard-react/tooltipStyle"

const sidebarStyle = (theme) => ({
  drawerPaper: {
    border: "none",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    zIndex: "1",
    borderRight: "1px solid  rgba(145, 158, 171, 0.24)",//grayColor[11],
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      position: "fixed",
      height: "100%",
      marginTop: "0px",//50
    },
  },
  drawerOpen: {
    width: '260px',
    transition: "all 500ms ease 0s",
  },
  drawerClose: {
    transition: "all 500ms ease 0s",
    overflowX: 'hidden',
    width: theme.spacing(8) + 1, // 6
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1, // 7
    },
  },
  background: {
    position: "absolute",
    zIndex: "1",
    height: "100%",
    width: "100%",
    display: "block",
    top: "0",
    left: "0",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    "&:after": {
      position: "absolute",
      zIndex: "3",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      background: whiteColor,// grayColor[12],//grayColor[2], "rgba(" + hexToRgb(grayColor[12]) + ", 1)",
      //opacity: "0.85",
    },
  },
  img:{
    width: "187px", //175 //200
    height: "40px", //45
    marginTop:"3px",
    marginLeft: "14px", //18
    marginBottom: "10px",
    transition: "all 500ms ease 0s",
  },
  imgLabelClosed: {
    width: "185px", //175 //200
    height: "40px", //45
    marginTop:"3px",
    marginLeft: "20px", //18
    marginBottom: "5px",
    transition: "all 500ms ease 0s",
  },
  divider:{
    margin: '5px 5px 3px 5px',  //top right bottom left
    height: "1px",
    borderRadius:"3px",
  },
  profileBoxLabelClosed:{
    width: "50px",
    margin: "32px 8px 5px 8px",
    padding: "10px 5px 10px 5px",
    backgroundColor: "rgba(145, 158, 171, 0.12)",//grayColor[11],
    borderRadius: "13px",
    alignItems: "center",
    justifyContent: 'center',
     [theme.breakpoints.up("md")]: {
      transition: "all 500ms ease 0s",
    },
  },
  profileBox:{
    width: "215px",
    margin: "20px 10px 5px 10px",
    padding: "10px 0px 10px 15px",
    backgroundColor: "rgba(145, 158, 171, 0.12)",//grayColor[11],
    borderRadius: "13px",
    alignItems: "center",
  },
  profileImg: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },

  nameText:{
    marginTop:"5px",
    marginLeft:"15px",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: "600",
    lineHeight: "1.3em",
    fontSize: "14.5px",
    color: grayColor[7],
  },
  roleText:{
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: "400",
    lineHeight: "2em",
    fontSize: "14px",
    color: grayColor[9],
  },
  flex: {
    display:'flex',
    flexWrap: 'wrap',
  },
  list: {
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0",
    listStyle: "none",
    position: "unset",
  },
  linkCategory:{
    marginTop: "15px",
    marginBottom:"0px",
    marginLeft: "17px",
    fontSize: "13.5px",
    color: grayColor[9],
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: "700",
    letterSpacing: "0.5px !important",
    display:"block"
  },
  linkCategoryTransition:{
    display:"none",
  },
  item: {
    position: "relative",
    display: "block",
    textDecoration: "none",
    "&:hover,&:focus,&:visited,&": {
      color: grayColor[7],//whiteColor,
    },
  },
  itemLink: {
    width: "auto",
    transition: "all 100ms linear",
    margin: "10px 0px 0",
    height:"50px",
    "&:hover,&:focus": {
      transition: "all 150ms ease 0s",
      margin: "8px -1px 0",
    },
    position: "relative",
    display: "block",
    backgroundColor: "transparent",
  },
  itemMargin:{
    marginLeft: "0px",
    transition: "all 150ms ease 0s",
    "&:hover,&:focus": {
      transition: "all 150ms ease 0s",
      marginLeft: "1px",
    },
  },
  itemIcon: {
    transition: "all 500ms ease 0s",
    width: "22px",
    height: "28px",
    fontSize: "24px",
    lineHeight: "30px",
    float: "left",
    marginRight: "19px", //25
    textAlign: "center",
    verticalAlign: "middle",
    color: grayColor[7],//grayColor[9],//"rgba(" + hexToRgb(whiteColor) + ", 0.8)",
  },
  itemIconLabelClosed: {
    transition: "all 500ms ease 0s",
    width: "22px",
    height: "28px",
    fontSize: "24px",
    lineHeight: "30px",
    float: "left",
    marginLeft: "10px",
    marginRight: "25px", //25
    textAlign: "center",
    verticalAlign: "middle",
    color: grayColor[7],
  },
  itemText: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: "500",
    lineHeight: "30px",
    fontSize: "14px",
    margin: "0",
    color: grayColor[7],//,grayColor[1], //whiteColor,
  },
  itemTextRTL: {
    textAlign: "right",
  },
  primaryFont: {
    color: primaryColor[0],//whiteColor,
  },
  gray:{
    backgroundColor: grayColor[9],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(grayColor[9]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(grayColor[9]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: grayColor[9],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(grayColor[9]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(grayColor[9]) +
        ",.2)",
    },
  },
  purple: {
    borderRight: "3px solid"+ primaryColor[0],
    backgroundColor: primaryColor[8],
    //...primaryBoxShadow,
    "&:hover,&:focus": {
      backgroundColor: primaryColor[8],
    },
  },
  blue: {
    backgroundColor: infoColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(infoColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(infoColor[0]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: infoColor[0],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(infoColor[0]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(infoColor[0]) +
        ",.2)",
    },
  },
  green: {
    backgroundColor: successColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(successColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(successColor[0]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: successColor[0],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(successColor[0]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(successColor[0]) +
        ",.2)",
    },
  },
  orange: {
    backgroundColor: warningColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(warningColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(warningColor[0]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: warningColor[0],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(warningColor[0]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(warningColor[0]) +
        ",.2)",
    },
  },
  red: {
    backgroundColor: dangerColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(dangerColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(dangerColor[0]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: dangerColor[0],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(dangerColor[0]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(dangerColor[0]) +
        ",.2)",
    },
  },
  sidebarWrapper: {
    position: "relative",
    height: "calc(100vh - 75px)",
    overflow: "auto",
    width: "260px",
    zIndex: "4",
    overflowScrolling: "touch",
    marginTop:"15px",
  },
  activePro: {
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      width: "100%",
      bottom: "13px",
    },
  },
  ...tooltipsStyle
});

export default sidebarStyle;


    // boxShadow:
    // "0 1px 3px -2px rgba(" +
    // hexToRgb(blackColor) +
    // ", 0.42), 0 4px 5px 0px rgba(" +
    // hexToRgb(blackColor) +
    // ", 0.12), 0 8px 1px -5px rgba(" +
    // hexToRgb(blackColor) +
    // ", 0.2)",