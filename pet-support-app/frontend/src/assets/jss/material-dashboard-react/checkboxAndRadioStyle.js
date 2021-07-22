import {
  primaryColor,
  blackColor,
  hexToRgb,
  grayColor,
  defaultFont,
} from "assets/jss/material-dashboard-react.js";

const checkboxAndRadioStyle = {
  root: {
    padding: "13px",
    "&:hover": {
      backgroundColor: "unset",
    },
  },
  labelRoot: {
    marginLeft: "-10px",
  },
  checked: {
    color: primaryColor[0] + "!important",
  },
  checkedIcon: {
    width: "20px",
    height: "20px",
    border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
    borderRadius: "3px",
  },
  uncheckedIcon: {
    width: "0px",
    height: "0px",
    padding: "10px",
    border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
    borderRadius: "3px",
  },
  radio: {
    color: primaryColor[0] + "!important",
  },
  radioChecked: {
    width: "20px",
    height: "20px",
    border: "1px solid " + primaryColor[0],
    borderRadius: "50%",
  },
  radioUnchecked: {
    width: "0px",
    height: "0px",
    padding: "10px",
    border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
    borderRadius: "50%",
  },
};

export default checkboxAndRadioStyle;
