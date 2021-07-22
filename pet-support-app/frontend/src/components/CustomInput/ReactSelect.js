import React from "react";
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import {
    primaryColor,
    hexToRgb,
} from "assets/jss/material-dashboard-react.js";

export default function ReactSelect(props) {
  const {
    isSearchable,
    isMulti,
    placeholder,
    noOptionsMessage,
    defaultValue,
    onChange,
    options,
    className
  } = props;

  const selectClasses = classNames({
    [className]: className,
  })

  return (
    <Select 
    className={selectClasses}
    components={makeAnimated()}
    isSearchable={isSearchable}
    isMulti={isMulti}
    placeholder={placeholder}
    noOptionsMessage={noOptionsMessage}
    defaultValue={defaultValue}
    onChange={onChange}
    options={options}
    theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
    primary: "rgba(" + hexToRgb(primaryColor[0]) + ", 0.8)",
    primary25:"rgba(" + hexToRgb(primaryColor[0]) + ", 0.3)",
    //neutral0:"rgba(" + hexToRgb(primaryColor[0]) + ", 0.8)",
//neutral10:"rgba(" + hexToRgb(primaryColor[0]) + ", 0.3)",
    //neutral20:"rgba(" + hexToRgb(primaryColor[0]) + ", 0.8)",
    //neutral30:"rgba(" + hexToRgb(primaryColor[0]) + ", 0.8)",
    //neutral60:"rgba(" + hexToRgb(primaryColor[0]) + ", 0.8)",
    //neutral80:"rgba(" + hexToRgb(grayColor[2]) + ", 0.8)",
        },
      })}
    />
  );
}

ReactSelect.propTypes = {
    isSearchable: PropTypes.bool,
    isMulti: PropTypes.bool,
    placeholder: PropTypes.string,
    noOptionsMessage: PropTypes.func,
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    options: PropTypes.array,
    className: PropTypes.string,
};



