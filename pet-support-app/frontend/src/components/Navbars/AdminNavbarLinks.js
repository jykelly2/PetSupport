import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Avatar from '@material-ui/core/Avatar';
import InputBase from '@material-ui/core/InputBase';
// @material-ui/icons
import NotificationIcon from "@material-ui/icons/Notifications";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SearchIcon from '@material-ui/icons/Search';
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks(props) {
  const classes = useStyles();
  const {profileImg } = props;
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const handleProfileClick = () => {
    window.location = "/admin/user/profile"
  };
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location = '/login';
  }
  return (
    <div>
       <div className={classes.manager}>
    <Hidden smDown implementation="css">
        <Paper elevation={0} className={classes.searchButtonWide}>
        <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Paper> 
    </Hidden>
    <Hidden mdUp implementation="css">
      <Button
        color={"transparent"}
         justIcon={true}
        simple={true}
        aria-label="Search"
      >
      <SearchIcon />
      </Button>
      </Hidden>
    </div>

      <Button
        color={"transparent"}
         justIcon={true}
        simple={true}
        aria-label="Dashboard"
      >
      <DashboardIcon />
      </Button>
    
      <div className={classes.manager}>
        <Button
          color={"transparent"}
          justIcon={true}
          simple={true}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
         // className={classes.buttonLink}
        >
          <NotificationIcon/>
          <span className={classes.notifications}>5</span>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Mike John responded to your email
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You have 5 new tasks
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      You{"'"}re now friend with Andrew
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another Notification
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      Another One
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
         <IconButton
         onClick={handleClickProfile}
         >
        <Avatar alt="Remy Sharp" className={classes.profileImg} src={profileImg}/>
        </IconButton>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                    href={"/user-profile"}
                      onClick={handleProfileClick}
                      className={classes.dropdownItem}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      Settings
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={handleLogout}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}

AdminNavbarLinks.propTypes = {
  image: PropTypes.string,
}

  // const resizeFunction = () => {
  //   if (window.innerWidth >= 760) {
  //     setSearchButtonWide(true)
  //   }else 
  //   setSearchButtonWide(false)
  // };
  // React.useEffect(() => {
  //   window.addEventListener("resize", resizeFunction);
  //   return function cleanup() {
  //     window.removeEventListener("resize", resizeFunction);
  //   }
  // },[]);

  {/* <Button
          color={"transparent"} 
          justIcon={true}
          simple={true}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
        </Button> */}

    // <div className={classes.searchWrapper}>
      //   <CustomInput
      //     formControlProps={{
      //       className: classes.margin + " " + classes.search,
      //     }}
      //     inputProps={{
      //       placeholder: "Search",
      //       inputProps: {
      //         "aria-label": "Search",
      //       },
      //     }}
      //   />
      //   <Button color="white" aria-label="edit" justIcon round>
      //     <Search />
      //   </Button>
      // </div> 