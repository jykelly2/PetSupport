import {
    grayColor,
    whiteColor,
    hexToRgb,
  } from "assets/jss/material-dashboard-react.js";

const animalReviewStyle = (theme) => ({ 
    grid:{
        padding:"10px 35px 40px 35px "
      },
    accordionSummary: {
        backgroundColor: grayColor[9],
      },
    accordionDetails: {
          [theme.breakpoints.down("xs")]: {
              flexWrap: 'wrap',
          },
          marginTop: "0.6rem",
          marginLeft: "2.25rem ", 
      },
    accordionDetailPicture: {
          [theme.breakpoints.up("xs")]: {
              flexWrap: 'wrap',
          },
          marginTop: "0.6rem",
          marginLeft: "2.25rem", 
    },
    chip:{
        marginTop: "0.3rem",
        marginLeft: "0.3rem",
    },
    pictureTitle:{
        [theme.breakpoints.down("xs")]: {
             marginTop: "2.6rem !important",
         },
    },
    itemIcon: {
        width: "24px",
        height: "24px",
        float: "left",
        marginRight: "25px",
        //textAlign: "center",
        //verticalAlign: "middle",
        color: "rgba(" + hexToRgb(whiteColor) + ", 0.85)",
    },
    expandIcon:{
        color: "rgba(" + hexToRgb(whiteColor) + ", 0.85)",
    },
    heading: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
         fontSize: "17.5px",
         fontWeight: "700",
         height: "30px",
         color: whiteColor,
       },
    title:{
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontSize: "15px",
        fontWeight: "600",
        lineHeight: "22px",
        color: grayColor[2],
        marginBottom: "1.2rem",
    },
    info:{
        fontSize: "15px",
        lineHeight: "22px",
        color: grayColor[13],
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontWeight: "400",
    },
    buttonSpace: {
        marginTop: '3.5rem',
        marginLeft: '-1.2rem',
    },   
  });

  export default animalReviewStyle;