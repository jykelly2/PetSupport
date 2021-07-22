import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CustomIconButton from "components/CustomButtons/CustomIconButton"
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const { color, profileImg } = props;
  return (
    <AppBar elevation={0} className={props.labelsOpen ? classes.appBar: classes.appBarIconClosed}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation="css">
          <CustomIconButton className={props.labelsOpen ? classes.menuIconOpen: classes.menuIconClosed}
            color="gray"
            simple={true}
            size={"sm"}
            aria-label="open drawer"
            onClick={props.handleIconDrawerToggle}
          >
            {props.labelsOpen? <MoreVertIcon /> : <MoreVertIcon/> }
          </CustomIconButton>
        </Hidden>
        <Hidden mdUp implementation="css">
        <CustomIconButton className={classes.menuIconOpen}
            color="inherit"
            color="gray"
            simple={true}
            size={"sm"}
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <MoreVertIcon/> 
          </CustomIconButton>
        </Hidden>
        <div className={classes.flex}>
        </div>
        {<AdminNavbarLinks profileImg={profileImg}/>}
        
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  logo: PropTypes.string,
  profileImg: PropTypes.string,
  rtlActive: PropTypes.bool,
  labelsOpen: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  handleIconDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};


          {/* {window.innerWidth >= 960 ?
      <div className={classes.searchWrapper}>
        <Button color="white" aria-label="edit" justIcon round>
          <SearchIcon />
        </Button>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search,
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search",
            },
          }}
        />
      </div> 
      : null
      } */}
        {/* <Paper component="form" className={classes.root}>
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
    </Paper> */}