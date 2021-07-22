import { grayColor } from "assets/jss/material-dashboard-react.js";

const viewAnimalStyle = (theme) => ({
    title:{
      fontSize: "0.85rem",
      lineHeight: "22px",
      color: grayColor[2],
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: "600",
       marginBottom: "1rem",
    },
    info:{
      marginBottom: "1rem",
      textAlign:"left",
      fontSize: "0.85rem",
      lineHeight: "22px",
      color: grayColor[13],
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: "450",
    },
    cardTitle: {
      color: grayColor[2],
      fontSize: "16px",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "700",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "8px",
      textDecoration: "none",
      textAlign: "left"
    },
    avatar:{
      [theme.breakpoints.down('md')]: {
        width: theme.spacing(8), 
        height: theme.spacing(8),
        marginBottom: theme.spacing(2)
      },
      [theme.breakpoints.down('sm')]: {
        width: theme.spacing(12), 
        height: theme.spacing(12),
        marginRight: theme.spacing(10),
      },
      width: theme.spacing(12), 
      height: theme.spacing(12),
      marginRight: theme.spacing(10),
    },
    avatarImage:{
      width: "100%",
      height:"100%"
    },
    cardMargin:{
      marginTop: "15px !important"
    },
    flexEnd:{
      display: "flex",
      justifyContent: "flex-end ",
      [theme.breakpoints.down('xs')]: {
        justifyContent: "flex-start ",
      }
    },
    featureButton: {
      marginTop: "20.5px !important",
      marginRight: "5px",
      [theme.breakpoints.down('xs')]: {
        marginTop: "0px !important",
        padding: "0.40625rem 1.25rem",
        fontSize: "0.805rem",
      }
    },
    chip: {
      marginRight:"5px",
      marginBottom:"5px"
    },
    gridImage:{
      objectFit:'scale-down',
      width: "100%",
      height:"100%"
    },
  })

  export default viewAnimalStyle;