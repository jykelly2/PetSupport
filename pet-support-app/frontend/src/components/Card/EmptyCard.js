import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Typography from "@material-ui/core/Typography"
// styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/emptyCardStyle.js";

const useStyles = makeStyles(styles);

export default function EmptyCard(props) {
  const classes = useStyles();
  const { className, title, message, image, ...rest } = props;
  const cardClasses = classNames({
    [className]: className !== undefined,
  });
  return (
    <Card>
       <CardHeader className={classes.divImg}>
       <img className={classes.img} src={image}/>
        </CardHeader> 
        <CardBody>
            <Typography className={classes.title}>{title}</Typography>
            <Typography className={classes.message}>{message}</Typography>
        </CardBody>
    </Card>
  );
}

EmptyCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node,
};
