import { blackColor, hexToRgb } from "assets/jss/material-dashboard-react.js";

const tooltipStyle = {
  tooltip: {
    padding: "10px 15px",
    minWidth: "100px",
    lineHeight: "1.7em",
    border: "none",
    borderRadius: "3px",
    boxShadow:
      "0 8px 10px 1px rgba(" +
      hexToRgb(blackColor) +
      ", 0.14), 0 3px 14px 2px rgba(" +
      hexToRgb(blackColor) +
      ", 0.12), 0 5px 5px -3px rgba(" +
      hexToRgb(blackColor) +
      ", 0.2)",
    maxWidth: "200px",
    textAlign: "center",
   fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
   fontWeight: "700",
    fontSize: "12.5px",
    fontStyle: "normal",
    textShadow: "none",
    textTransform: "none",
    letterSpacing: "normal",
    wordBreak: "normal",
    wordSpacing: "normal",
    wordWrap: "normal",
    whiteSpace: "normal",
    lineBreak: "auto",
  },
  marginLeft: {
    marginLeft: "25px",
  },
};
export default tooltipStyle;
