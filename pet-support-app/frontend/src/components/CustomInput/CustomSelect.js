import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Chips from 'components/Table/Chips'

const useStyles = makeStyles(styles);

export default function CustomSelect(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    options,
    labelProps,
    inputProps,
    error,
    success,
    rtlActive,
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootFocused]: true,
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
    [" " + classes.labelRTL]: rtlActive,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });
  let newInputProps = {
    maxLength:
      inputProps && inputProps.maxLength ? inputProps.maxLength : undefined,
    minLength:
      inputProps && inputProps.minLength ? inputProps.minLength : undefined,
    step: inputProps && inputProps.step ? inputProps.step : undefined,
  };
  return (
    <FormControl 
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Select
      input={
        <Input
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        />
        }
      //value={value}
        // renderValue={(value) => (           
        //     <div >
        //       <Chip key={value} label={value} />
        //         {/* <Chips.StringChips params={{'value':value}} /> */}
        //     </div>
        // )}
        id={id}
        {...inputProps}
        inputProps={newInputProps}
      >
           {Object.keys(options).map((key) => (
                        <MenuItem key={key} value={options[key]} >
                        {options[key]}
                        </MenuItem>
                    ))}
      </Select>
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

CustomSelect.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  options: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  rtlActive: PropTypes.bool,
};

// import {
//   primaryColor,
//   dangerColor,
//   successColor,
//   grayColor,
//   defaultFont,
// } from "assets/jss/material-dashboard-react.js";

//  import Select from '@material-ui/core/Select';
//  import MenuItem from '@material-ui/core/MenuItem';
//  import Chip from '@material-ui/core/Chip';
// import { withStyles } from "@material-ui/core/styles";

// const CustomSelect = withStyles({
//   root: {
//     '& label.Mui-focused:not(.Mui-error)': {
//       color: primaryColor[0],
//     },
//     '& label.Mui-focused.Mui-error:': {
//       color: 'red',
//     },
//     '& .MuiInput-underline:after': {
//       borderBottomColor: primaryColor[0],
//     },
//     '& .MuiInput-underline:before': {
//       borderColor: grayColor[4] + " !important",
//       borderWidth: "1px !important",
//     },
//     "& .MuiInput-underline.Mui-error:after": {
//       borderBottomColor: 'red',
//       borderWidth: 2,
//       color: 'red'
//     },
//       marginTop: '27px',
//   },
// })(Select);


// export default CustomSelect
