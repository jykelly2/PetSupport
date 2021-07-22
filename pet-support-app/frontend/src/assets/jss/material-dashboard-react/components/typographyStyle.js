import {
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  grayColor,
} from "assets/jss/material-dashboard-react.js";

const typographyStyle = {
  defaultFontStyle: {
    ...defaultFont,
    fontSize: "14px",
  },
  defaultHeaderMargins: {
    marginTop: "20px",
    marginBottom: "10px",
  },
  quote: {
    padding: "10px 20px",
    margin: "0 0 20px",
    fontSize: "17.5px",
    borderLeft: "5px solid " + grayColor[10],
  },
  quoteText: {
    margin: "0 0 10px",
    fontStyle: "italic",
  },
  quoteAuthor: {
    display: "block",
    fontSize: "80%",
    lineHeight: "1.42857143",
    color: grayColor[1],
  },
  mutedText: {
    color: grayColor[1],
  },
  darkGrayText:{
    color: grayColor[2]
  },
  primaryText: {
    color: primaryColor[0],
  },
  infoText: {
    color: infoColor[0],
  },
  successText: {
    color: successColor[0],
  },
  warningText: {
    color: warningColor[0],
  },
  dangerText: {
    color: dangerColor[0],
  },
  name: {
    fontSize: '14px',
    lineHeight: 1.7,
    color: grayColor[2],
    fontWeight: 550,
    marginTop: '9px',
    marginLeft: '10px'
  },
  pageTitle:{
    fontSize: '21px',
    color: grayColor[2],
    fontWeight: 600,
  },
};

export default typographyStyle;
