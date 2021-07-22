import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import clsx from 'clsx';
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box"
import Avatar from '@material-ui/core/Avatar';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography"

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import appLogo from "assets/img/logos/logo.png"

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  let location = useLocation();
  function activeRoute(routeNames) {
    return routeNames.some(name => location.pathname.includes(name))
  }
 const { color, image, routes, user, profileImg} = props;
  var brand = (
    <div >
      <img className={props.labelsOpen || props.mobileOpen ? classes.img : classes.imgLabelClosed}
       src={appLogo} alt="logo"></img>
    </div>
  );

  var userProfile = (
    <Box className={classNames(classes.flex,{
      [classes.profileBox]: props.labelsOpen || props.mobileOpen, 
      [classes.profileBoxLabelClosed]: !props.labelsOpen & !props.mobileOpen, 
    })}>
      <Avatar alt="Remy Sharp" src={profileImg}/>

    {props.labelsOpen || props.mobileOpen ? 
      <Typography className={classes.nameText}>{user.firstname +" "+user.lastname} <br/>
    <span className={classes.roleText}>{user.role}</span></Typography>
      : null}
    </Box>
  )

  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var listItemClasses;
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.activePaths),
          });
        const primaryFontClasses = classNames({
          [" " + classes.primaryFont]: activeRoute(prop.activePaths),
        });
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classNames(classes.itemLink + listItemClasses, {
              [classes.itemMargin]: !props.labelsOpen & !props.mobileOpen,
            })}>
              <Tooltip
                id="tooltip-right"
                title={props.labelsOpen || props.mobileOpen ? "" : prop.name}
                placement="right"
                classes={{ tooltip: classes.tooltip, tooltipPlacementRight: classes.marginLeft}}
              >
                <prop.icon
                  className={classNames( primaryFontClasses, {
                    [classes.itemIcon]: props.labelsOpen || props.mobileOpen,
                    [classes.itemIconLabelClosed]: !props.labelsOpen & !props.mobileOpen,
                  })}
                />
                </Tooltip>
                {props.labelsOpen || props.mobileOpen ?
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, primaryFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive,
                })}
                disableTypography={true}
              /> : null
              }
            </ListItem>        
          </NavLink>
        );
      })}
    </List>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={"left"}
          open={props.mobileOpen}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          transitionDuration={{enter:450, exit: 200 }}
        >
          <div className={classes.sidebarWrapper}> 
          {brand}
          {userProfile}
            <Typography className={classes.linkCategory}>DASHBOARD</Typography>
            {links}
          </div> 
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={"left"}
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: props.labelsOpen,
            [classes.drawerClose]: !props.labelsOpen,
          })}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerOpen]: props.labelsOpen,
              [classes.drawerClose]: !props.labelsOpen,
            }),
          }}
        >
          <div className={classes.sidebarWrapper}>
          {brand}
         {userProfile}
            <Typography  
              className={clsx({
                [classes.linkCategory]: props.labelsOpen,
                [classes.linkCategoryTransition]: !props.labelsOpen,
              }
              )}>
              DASHBOARD
            </Typography>
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  handleIconDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["gray","purple", "blue", "green", "orange", "red"]),
  profileImg: PropTypes.string,
  routes: PropTypes.array,
  mobileOpen: PropTypes.bool,
  labelsOpen: PropTypes.bool,
  user: PropTypes.object,
};

/*import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logo from "../../assets/img/reactlogo.png";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img
                src={require("../../assets/img/reactlogo.png").default}
                alt="..."
              />
            </div>
          </a>
          <a className="simple-text" href="http://www.creative-tim.com">
            Creative Tim
          </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                       ? "active active-pro"
                       : activeRoute(prop.layout + prop.path)
                   }
                   key={key}
                >
                  
                  <NavLink 
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  > 
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;*/
