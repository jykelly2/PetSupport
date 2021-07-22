import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    primaryColor,
  } from "assets/jss/material-dashboard-react.js";
//material/custom components
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

//icons
import StepConnector from '@material-ui/core/StepConnector';
import DescriptionIcon from '@material-ui/icons/Description';
import PetsIcon from '@material-ui/icons/Pets';
import PageviewIcon from '@material-ui/icons/Pageview';
import FindInPageIcon from '@material-ui/icons/FindInPage';

const ColorlibConnector = withStyles({
    active: {
      '& $line': {
        backgroundImage:
          "linear-gradient( 95deg, " + primaryColor[6] + " 0%," + primaryColor[4] + " 50%," + primaryColor[0] + " 100%)",
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
        "linear-gradient( 95deg, " + primaryColor[6] + " 0%," + primaryColor[4] + " 50%," + primaryColor[0] + " 100%)",
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector);
  
  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundImage:
      "linear-gradient( 136deg, " + primaryColor[0] + " 0%," + primaryColor[3] + " 50%," + primaryColor[6] + " 100%)",
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:
      "linear-gradient( 136deg, " + primaryColor[0] + " 0%," + primaryColor[3] + " 50%," + primaryColor[6] + " 100%)",
    },
  });

  function getSteps() {
    return ['General', 'Documents', 'Review'];
  }
  
 function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
      1: <PetsIcon />,
      2: <DescriptionIcon />,
      3: <PageviewIcon />,
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }
  
  ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
  };

  export default function AnimalStepper(props) {
    const steps = getSteps();
      return (
         <Stepper horizontalLabel activeStep={props.activeStep} connector={<ColorlibConnector />}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )
  }