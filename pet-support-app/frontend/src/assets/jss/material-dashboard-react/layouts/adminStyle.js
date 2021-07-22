import {
  transition,
  container,
  whiteColor,
  grayColor,
  lightBlueColor,
  hexToRgb
} from "assets/jss/material-dashboard-react.js";

const appStyle = (theme) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - 260px)`,
      transition: "all 500ms ease 0s",
    },
    backgroundColor: "rgba(" + hexToRgb(lightBlueColor) + ", 1)",//"rgba(" + hexToRgb(grayColor[12]) + ", 0.6)",
    overflow: "auto",
    position: "relative",
    float: "right",
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
  },
  mainPanelLabelClosed: {
    transition: "all 500ms ease 0s",
    backgroundColor:  "rgba(" + hexToRgb(lightBlueColor) + ", 1)",
    overflow: "auto",
    position: "relative",
    float: "right",
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
  },
  contentLabelClosed: {
    marginTop: "60px", 
    padding: "25px 10px 5px 85px", 
    minHeight: "calc(100vh - 163px)", 
  },
  content: {
    marginTop: "60px", 
    padding: "25px 12px 5px 12px", 
    minHeight: "calc(100vh - 163px)", 
  },
  container,
});

export default appStyle;
