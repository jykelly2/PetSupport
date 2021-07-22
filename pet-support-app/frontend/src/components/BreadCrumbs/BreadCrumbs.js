import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import styles from 'assets/jss/material-dashboard-react/components/breadCrumbsStyle'
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

export default function CustomBreadcrumbs(props) {
  const classes = useStyles();
  const {edit, plural, pageTitle} = props;
  var str = props.location.pathname
  const delimiter = '/'

  //after / , admin
  var pathArray = str.split(delimiter).slice(2)

  //remove id
  if (edit) pathArray.pop()

  //change root path to plural eg. user to users
  if (plural) {
    const rootPath = pathArray[0]+"s"
    str = str.replace(pathArray[0],rootPath)
    pathArray[0] = rootPath
  }

  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className={classes.container}>
      {pageTitle?   
      <Typography className={classes.pageTitle}>
        {pageTitle}
      </Typography> : null
      }
    <Breadcrumbs className={classes.breadCrumb} separator={"/"} aria-label="breadcrumb">
    <Link className={classes.linkText} key={'dashboard'} href={"/admin/dashboard"}>Dashboard</Link>
     {pathArray.map((link,index) => {
       const result = str.split(link)[0] + link
        // var tokens = pathArray.slice(0, index+1)
        // var result = tokens.join(delimiter);
       return index === (pathArray.length-1) ? (
        <Typography className={classes.breadCrumbText} key={link} color="inherit">{capitalizeFirstLetter(link)}</Typography>
      ): (
        <Link className={classes.linkText} key={link} href={result}>{capitalizeFirstLetter(link)}</Link>
      )
  })}
  </Breadcrumbs>
  </div>
  );
}

Breadcrumbs.propTypes = {
    className: PropTypes.string,
    pageTitle: PropTypes.string,
    location: PropTypes.object,
    edit: PropTypes.bool,
    plural: PropTypes.bool
  };