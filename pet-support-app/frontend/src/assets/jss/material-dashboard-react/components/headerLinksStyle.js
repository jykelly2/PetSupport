import {
  defaultFont,
  dangerColor,
  whiteColor,
  lightBlueColor,
  grayColor
} from "assets/jss/material-dashboard-react.js";

import dropdownStyle from "assets/jss/material-dashboard-react/dropdownStyle.js";

const headerLinksStyle = (theme) => ({
  ...dropdownStyle(theme),
  linkText: {
    zIndex: "4",
    ...defaultFont,
    fontSize: "14px",
    margin: "0px",
  },
  searchButtonWide: {
    width:"300px",
    alignItems:'center',
    backgroundColor: lightBlueColor,//"rgba(145, 158, 171, 0.12)",
    marginRight: "22px",
  },
  margin: {
    zIndex: "4",
    margin: "0",
  },
  searchIcon: {
    width: "17px",
    zIndex: "4",
  },
  notifications: {
    zIndex: "4",
    // [theme.breakpoints.up("md")]: {
      position: "absolute",
      top: "2px",
      border: "1px solid " + whiteColor,
      right: "4px",
      fontSize: "9px",
      background: dangerColor[0],
      color: whiteColor,
      minWidth: "16px",
      height: "16px",
      borderRadius: "10px",
      textAlign: "center",
      lineHeight: "16px",
      verticalAlign: "middle",
      display: "block",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   ...defaultFont,
    //   fontSize: "14px",
    //   marginRight: "8px",
    // },
  },
  manager: {
    display: "inline-block",
  },
  profileImg: {
    width: theme.spacing(4.25),
    height: theme.spacing(4.25),
  },
});

export default headerLinksStyle;

    // search: {
  //   "& > div": {
  //     marginTop: "0",
  //   },
  //   // [theme.breakpoints.down("sm")]: {
  //     margin: "10px 15px !important",
  //     float: "none !important",
  //     paddingTop: "1px",
  //     paddingBottom: "1px",
  //     padding: "0!important",
  //     width: "60%",
  //     marginTop: "40px",
  //     "& input": {
  //       color: grayColor[9],
  //     },
  //   // },
  // },
  // buttonLink: {
    // [theme.breakpoints.down("sm")]: {
    //   display: "flex",
    //   margin: "10px 15px 0",
    //   width: "-webkit-fill-available",
    //   "& svg": {
    //     width: "24px",
    //     height: "30px",
    //     marginRight: "15px",
    //     marginLeft: "-15px",
    //   },
    //   "& .fab,& .fas,& .far,& .fal,& .material-icons": {
    //     fontSize: "24px",
    //     lineHeight: "30px",
    //     width: "24px",
    //     height: "30px",
    //     marginRight: "15px",
    //     marginLeft: "-15px",
    //   },
    //   "& > span": {
    //     justifyContent: "flex-start",
    //     width: "100%",
    //   },
    // },
 // },
   // searchButtonSmall:{
  //   width:"100%", //200
  //   display:"flex",
  //   alignItems:'center',
  //   backgroundColor: lightBlueColor,//"rgba(145, 158, 171, 0.12)",
  //   marginTop: "5px",
  //   marginRight: "12px",
  //   float: "left",
  // },