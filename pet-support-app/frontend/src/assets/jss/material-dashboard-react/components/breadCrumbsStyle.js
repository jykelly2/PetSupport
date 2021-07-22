import {
    defaultFont,
    primaryColor,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    grayColor,
  } from "assets/jss/material-dashboard-react.js";

import typographyStyle from 'assets/jss/material-dashboard-react/components/typographyStyle'

const BreadCrumbsStyle = {
    container:{
        marginTop: '15px',
        marginLeft: '6px', //8
        marginBottom: '15px', 
    },
    breadCrumb:{
        marginTop: '3px',
    },
    breadCrumbText:{
        fontSize:'14px', 
    },
    linkText:{
        color: primaryColor[0],
        fontSize:'14px',
    },
    ...typographyStyle
} 

export default BreadCrumbsStyle;