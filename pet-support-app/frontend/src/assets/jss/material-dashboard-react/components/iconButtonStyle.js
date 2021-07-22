import {
    grayColor,
    primaryColor,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    roseColor,
    whiteColor,
    blackColor,
    hexToRgb,
  } from "assets/jss/material-dashboard-react.js";

  const iconButtonStyle = {
  white: {
    "&,&:focus,&:hover": {
      backgroundColor: whiteColor,
      color: grayColor[0],
    },
  },
  simple: {
    "&,&:focus,&:hover": {
      color: whiteColor,
      background: "transparent",
      boxShadow: "none",
    },
    "&$rose": {
      "&,&:focus,&:hover,&:visited": {
        color: roseColor[0],
      },
    },
    "&$primary": {
      "&,&:focus,&:hover,&:visited": {
        color: primaryColor[0],
      },
    },
    "&$info": {
      "&,&:focus,&:hover,&:visited": {
        color: infoColor[0],
      },
    },
    "&$success": {
      "&,&:focus,&:hover,&:visited": {
        color: successColor[0],
      },
    },
    "&$warning": {
      "&,&:focus,&:hover,&:visited": {
        color: warningColor[0],
      },
    },
    "&$danger": {
      "&,&:focus,&:hover,&:visited": {
        color: dangerColor[0],
      },
    },
  },
  gray: {
    backgroundColor: grayColor[11] + "!important",
    // boxShadow:
    //   "0 2px 2px 0 rgba(" +
    //   hexToRgb(grayColor[11]) +
    //   ", 0.14), 0 3px 1px -2px rgba(" +
    //   hexToRgb(grayColor[11]) +
    //   ", 0.2), 0 1px 5px 0 rgba(" +
    //   hexToRgb(grayColor[11]) +
    //   ", 0.12)",
    // "&:hover,&:focus": {
    //   backgroundColor: grayColor[11],
    //   boxShadow:
    //     "0 14px 26px -12px rgba(" +
    //     hexToRgb(grayColor[11]) +
    //     ", 0.42), 0 4px 23px 0px rgba(" +
    //     hexToRgb(blackColor) +
    //     ", 0.12), 0 8px 10px -5px rgba(" +
    //     hexToRgb(grayColor[11]) +
    //     ", 0.2)",
    // },
  },
  rose: {
    backgroundColor: roseColor[0],
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(roseColor[0]) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(roseColor[0]) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(roseColor[0]) +
      ", 0.12)",
    "&:hover,&:focus": {
      backgroundColor: roseColor[0],
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb(roseColor[0]) +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb(roseColor[0]) +
        ", 0.2)",
    },
  },
  primary: {
    backgroundColor: primaryColor[0],
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(primaryColor[0]) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(primaryColor[0]) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(primaryColor[0]) +
      ", 0.12)",
    "&:hover,&:focus": {
      backgroundColor: primaryColor[0],
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb(primaryColor[0]) +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb(primaryColor[0]) +
        ", 0.2)",
    },
  },
  info: {
    backgroundColor: infoColor[0],
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(infoColor[0]) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(infoColor[0]) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(infoColor[0]) +
      ", 0.12)",
    "&:hover,&:focus": {
      backgroundColor: infoColor[0],
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb(infoColor[0]) +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb(infoColor[0]) +
        ", 0.2)",
    },
  },
  success: {
    backgroundColor: successColor[0],
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(successColor[0]) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(successColor[0]) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(successColor[0]) +
      ", 0.12)",
    "&:hover,&:focus": {
      backgroundColor: successColor[0],
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb(successColor[0]) +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb(successColor[0]) +
        ", 0.2)",
    },
  },
  warning: {
    backgroundColor: warningColor[0],
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(warningColor[0]) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(warningColor[0]) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(warningColor[0]) +
      ", 0.12)",
    "&:hover,&:focus": {
      backgroundColor: warningColor[0],
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb(warningColor[0]) +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb(warningColor[0]) +
        ", 0.2)",
    },
  },
  danger: {
    backgroundColor: dangerColor[0],
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(dangerColor[0]) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(dangerColor[0]) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(dangerColor[0]) +
      ", 0.12)",
    "&:hover,&:focus": {
      backgroundColor: dangerColor[0],
      boxShadow:
        "0 14px 26px -12px rgba(" +
        hexToRgb(dangerColor[0]) +
        ", 0.42), 0 4px 23px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.12), 0 8px 10px -5px rgba(" +
        hexToRgb(dangerColor[0]) +
        ", 0.2)",
    },
  }, 
  sm: {
    padding: "0.4rem ", //1.25rem
    fontSize: "0.5rem",
    lineHeight: "1",
    //borderRadius: "0.2rem",
  },
};

export default iconButtonStyle;
