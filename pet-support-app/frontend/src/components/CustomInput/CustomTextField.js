import {
    primaryColor,
    dangerColor,
    successColor,
    grayColor,
    defaultFont,
  } from "assets/jss/material-dashboard-react.js";

  import TextField from '@material-ui/core/TextField';
  import { withStyles } from "@material-ui/core/styles";

const CustomTextField = withStyles({
    root: {
      '& label.Mui-focused:not(.Mui-error)': {
        color: primaryColor[0],
        fontSize: "16px",
        lineHeight: "22px",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontWeight: "400",
      },
      '& label.Mui-focused.Mui-error:': {
        color: 'red',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: primaryColor[0],
      },
      '& .MuiInput-underline:before': {
        borderColor: grayColor[4] + " !important",
        borderWidth: "1px !important",
      },
      "& .MuiInput-underline.Mui-error:after": {
        borderBottomColor: 'red',
        borderWidth: 2,
        color: 'red',
      },
      '& label:not(.Mui-focused):not(.Mui-error)':{
        color: grayColor[3] + " !important",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontWeight: "400",
        fontSize: "15px",
        lineHeight: "1.42857",
        letterSpacing: "unset",
      },
      '& label.Mui-error:not(.Mui-focused)':{
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        color: "red !important",
        fontWeight: "400",
        fontSize: "15px",
        lineHeight: "1.42857",
        letterSpacing: "unset",
      },
      marginTop: '16px',
    },
  })(TextField);


export default CustomTextField












