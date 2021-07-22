import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
//import TextField from "@material-ui/core/TextField";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function CustTextField(props) {
  const classes = useStyles();
  const {
      fullWidth,
    label,
    id,
    name,
    helperText,
    error,
    value,
    onChange,
  } = props;

//   const labelClasses = classNames({
//     [" " + classes.labelRootError]: error,
//     [" " + classes.labelRootSuccess]: success && !error,
//     [" " + classes.labelRTL]: rtlActive,
//   });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: !error,
    [classes.underline]: true,
  });
  const marginTop = classNames({
    [classes.marginTop]: label === undefined,
  });

  const inputProps = {classes:{
    root: {marginTop, underlineClasses},
   // disabled: classes.disabled,
    underline: underlineClasses,
  }}

  return (
   
      <TextField
      fullWidth={fullWidth}
      classes={{ root: classes}}

        label={label}
        id={id}
        name={name}
        helperText={helperText}
        error={error}
        value={value}
        onChange={onChange}

      />
  );
}

CustTextField.propTypes = {
fullWidth: PropTypes.bool,
  label: PropTypes.string,
  //labelProps: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  //inputProps: PropTypes.object,
  //formControlProps: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};