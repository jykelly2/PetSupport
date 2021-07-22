import React, {useState} from 'react';
//styles
import { makeStyles} from "@material-ui/core/styles"; 
import styles from "assets/jss/material-dashboard-react/views/Animals/animalDocumentStyle"
// @material-ui/core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Typography from '@material-ui/core/Typography'

import { useFormik } from 'formik';

const useStyles = makeStyles(styles);

export const AnimalDocuments = ({docFormData, setDocForm, handleBack, handleNext}) => {
    const classes = useStyles();
    const {isNeuteured, isVaccinated, isLeashTrained,isPottyTrained} = docFormData;
    const [backClicked, setClicked] = useState(false)

    const formik = useFormik({
        initialValues: {
            docIsNeuteured: isNeuteured? (isNeuteured === 'true' ? 'true' : 'false') :'',
            docIsVaccinated: isVaccinated? (isVaccinated === 'true' ? 'true' : 'false') :'',
            docIsPottyTrained: isPottyTrained? (isPottyTrained === 'true' ? 'true' : 'false') :'',
            docIsLeashTrained: isLeashTrained? (isLeashTrained === 'true' ? 'true' : 'false') :'',
        },
        enableReinitialize: true,
        //validationSchema: validationSchema,
        onSubmit: (values) => {
            const document = {
                isNeuteured: values.docIsNeuteured,
                isVaccinated: values.docIsVaccinated,
                isPottyTrained: values.docIsPottyTrained,
                isLeashTrained: values.docIsLeashTrained,        
            }
            setDocForm(document)
            if (backClicked) handleBack()
            else handleNext()
            
        },
      });
    const back = () => {
        setClicked(true)
    }
    return(
        <div>
        <form onSubmit={formik.handleSubmit} >
            <CardBody className={classes.grid}>
            <GridContainer>
                        <GridItem xs={12} sm={5} md={5} >
                        <Typography className={classes.title}>Is Neuteured*:</Typography>
                        <RadioGroup row >
                        <FormControlLabel
                        control={
                            <Radio
                            checked={formik.values.docIsNeuteured === 'true'}
                            onChange={formik.handleChange}
                            value={'true'}
                            name="docIsNeuteured"
                            aria-label="Is Neuteured"
                            icon={ <FiberManualRecord className={classes.radioUnchecked} />}
                            checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                            classes={{ checked: classes.radio,}}
                            />
                        }
                            classes={{
                            label: classes.label,
                            root: classes.labelRoot,
                            }}
                            label="Yes"
                        />
                        <FormControlLabel
                        control={
                            <Radio
                            checked={formik.values.docIsNeuteured === 'false'}
                            onChange={formik.handleChange}
                            value={'false'}
                            name="docIsNeuteured"
                            aria-label="Is Neuteured"
                            icon={<FiberManualRecord className={classes.radioUnchecked} />}
                            checkedIcon={ <FiberManualRecord className={classes.radioChecked} />}
                            classes={{checked: classes.radio,}}
                            />
                        }
                        classes={{
                            label: classes.label,
                            root: classes.labelRoot,
                        }}
                        label="No"
                        />
                        </RadioGroup>
                        </GridItem>
                        <GridItem xs={12} sm={5} md={5}>
                        <Typography className={classes.title}>Is Vaccinated*:</Typography>
                        <RadioGroup row>
                        <FormControlLabel
                        control={
                            <Radio
                            checked={formik.values.docIsVaccinated === 'true'}
                            onChange={formik.handleChange}
                            value={'true'}
                            name="docIsVaccinated"
                            aria-label="Is Vaccinated"
                            icon={ <FiberManualRecord className={classes.radioUnchecked} />}
                            checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                            classes={{ checked: classes.radio,}}
                            />
                        }
                            classes={{
                            label: classes.label,
                            root: classes.labelRoot,
                            }}
                            label="Yes"
                        />
                        <FormControlLabel
                        control={
                            <Radio
                            checked={formik.values.docIsVaccinated === 'false'}
                            onChange={formik.handleChange}
                            value={'false'}
                            name="docIsVaccinated"
                            aria-label="Is Vaccinated"
                            icon={<FiberManualRecord className={classes.radioUnchecked} />}
                            checkedIcon={ <FiberManualRecord className={classes.radioChecked} />}
                            classes={{checked: classes.radio,}}
                            />
                        }
                        classes={{
                            label: classes.label,
                            root: classes.labelRoot,
                        }}
                        label="No"
                        />
                        </RadioGroup>
                        </GridItem>
                </GridContainer>
                <GridContainer>
                        <GridItem xs={12} sm={5} md={5}>
                        <Typography className={classes.title}>Is Potty Trained*:</Typography>
                        <RadioGroup row>
                        <FormControlLabel
                        control={
                            <Radio
                            checked={formik.values.docIsPottyTrained === 'true'}
                            onChange={formik.handleChange}
                            value={'true'}
                            name="docIsPottyTrained"
                            aria-label="Is Potty Trained"
                            icon={ <FiberManualRecord className={classes.radioUnchecked} />}
                            checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                            classes={{ checked: classes.radio,}}
                            />
                        }
                            classes={{
                            label: classes.label,
                            root: classes.labelRoot,
                            }}
                            label="Yes"
                        />
                        <FormControlLabel
                        control={
                            <Radio
                            checked={formik.values.docIsPottyTrained === 'false'}
                            onChange={formik.handleChange}
                            value={'false'}
                            name="docIsPottyTrained"
                            aria-label="Is Potty Trained"
                            icon={<FiberManualRecord className={classes.radioUnchecked} />}
                            checkedIcon={ <FiberManualRecord className={classes.radioChecked} />}
                            classes={{checked: classes.radio,}}
                            />
                        }
                        classes={{
                            label: classes.label,
                            root: classes.labelRoot,
                        }}
                        label="No"
                        />
                        </RadioGroup>
                        </GridItem>
                        <GridItem xs={12} sm={5} md={5}>
                        <Typography className={classes.title}>Is Leash Trained*:</Typography>
                        <RadioGroup row>
                        <FormControlLabel
                        control={
                            <Radio
                            checked={formik.values.docIsLeashTrained === 'true'}
                            onChange={formik.handleChange}
                            value={'true'}
                            name="docIsLeashTrained"
                            aria-label="Is Leash Trained"
                            icon={ <FiberManualRecord className={classes.radioUnchecked} />}
                            checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                            classes={{ checked: classes.radio,}}
                            />
                        }
                            classes={{
                            label: classes.label,
                            root: classes.labelRoot,
                            }}
                            label="Yes"
                        />
                        <FormControlLabel
                        control={
                            <Radio
                            checked={formik.values.docIsLeashTrained === 'false'}
                            onChange={formik.handleChange}
                            value={'false'}
                            name="docIsLeashTrained"
                            aria-label="Is Leash Trained"
                            icon={<FiberManualRecord className={classes.radioUnchecked} />}
                            checkedIcon={ <FiberManualRecord className={classes.radioChecked} />}
                            classes={{checked: classes.radio,}}
                            />
                        }
                        classes={{
                            label: classes.label,
                            root: classes.labelRoot,
                        }}
                        label="No"
                        />
                        </RadioGroup>
                        </GridItem>
                </GridContainer>
                <div className={classes.buttonSpace}>
                <Button color="transparent" 
                onClick={back} 
                type="submit"> Back
                </Button>
                <Button 
                type="submit" 
                color="primary">Continue
                </Button>
                </div>
            </CardBody>
        </form>
     </div>
    );
}