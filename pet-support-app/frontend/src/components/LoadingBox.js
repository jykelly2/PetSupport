import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import{
  primaryColor,
} from "assets/jss/material-dashboard-react.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  barColorPrimary: {
    background: primaryColor[3]
  }
}));

export default function LoadingBox() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
       <LinearProgress classes={{ barColorPrimary: classes.barColorPrimary}}/> 
       {/* <CircularProgress /> <span>Loading...</span> */}
    </div>
  );
}
