import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  grid: {
    margin: "0 -15px !important",
    width: "unset",
  },
};

const useStyles = makeStyles(styles);

export default function GridContainer(props) {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  const gridClasses = classNames({
    [className]: className,
    [classes.grid]: true
  })

  return (
    <Grid container {...rest} className={gridClasses} > 
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
