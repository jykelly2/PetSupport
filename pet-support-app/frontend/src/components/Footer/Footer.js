import React from "react";
import PropTypes from "prop-types";
import clsx from 'clsx';
// Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { labelsOpen,mobileOpen } = props;
  return (
    <footer className={clsx({
     [classes.footer]: labelsOpen,
     [classes.footerLabelClosed]: !labelsOpen || mobileOpen})}>
        <div>
        <p className={classes.left}>
           <span>
             Copyright 
             &copy; {new Date().getFullYear()}{" "}
             Pet Support  All rights reserved
           </span>
         </p>
        <p className={classes.right}>
          <a href="#" className={classes.marginRight}>{"Terms & Conditions"}</a> {"  "} | {"  "}
           <a href="#" className={classes.marginLeft}>{"Privacy & Policy"}</a>
        </p>
         </div>
    </footer>
  );
}

Footer.propTypes = {
  mobileOpen: PropTypes.bool,
  labelsOpen: PropTypes.bool,
};

     {/* <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#home" className={classes.block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#company" className={classes.block}>
                Company
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#portfolio" className={classes.block}>
                Portfolio
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#blog" className={classes.block}>
                Blog
              </a>
            </ListItem>
          </List>
        </div> */}

/*import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3">
        <Container fluid>
          <nav>
            <ul className="footer-menu">
              <li>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Home
                </a>
              </li>
              <li>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Company
                </a>
              </li>
              <li>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Blog
                </a>
              </li>
            </ul>
            <p className="copyright text-center">
              © {new Date().getFullYear()}{" "}
              <a href="http://www.creative-tim.com">Creative Tim</a>, made with
              love for a better web
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;*/
