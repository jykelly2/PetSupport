import React, {useState} from 'react';
import {animalTypes, dogBreeds, sizes, personalityTraits, charRegExp} from '../../utils'
import ReactSelect from 'components/CustomInput/ReactSelect'
import FileUploader from '../FileUploader'
import MessageBox from '../../components/MessageBox';
//styles
import { makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/Animals/animalInfoStyle"
// @material-ui/core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CustomTextField from '../../components/CustomInput/CustomTextField'
import CustomSelect from "components/CustomInput/CustomSelect.js";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Typography from '@material-ui/core/Typography'

import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    infoName: yup
      .string()
      .matches(charRegExp, 'Has to be characters only')
      .required('Name is required'),
    infoAge: yup
      .number()
      .min(0, "Age must be at least 0")
      .max(20, "Age can't be more than 20")
      .required('Age is required'),
});

const useStyles = makeStyles(styles);

export const AnimalInfo = ({infoFormData, setInfoForm, handleBack, handleNext}) => {
    const classes = useStyles();
    const filesLimit = 5
    const profileLimit = 1
     const {name, description, animalType,breed,age,gender,size,pictures, profilePicture, personalities} = infoFormData;

    const [open, setOpen] = useState(false);
    const [infoPictures, setPictures] = useState(pictures?pictures:'');
    const [infoProfilePicture, setProfilePicture] = useState(profilePicture?profilePicture:'');
    const [infoPersonalities, setPersonalities] = useState(personalities?personalities:'');

    const formik = useFormik({
        initialValues: {
          infoName: name? name : '',
          infoDescription: description?description:'',
          infoAnimalType: animalType?animalType:'',
          infoBreed: breed?breed:'',
          infoAge: age?age:'',
          infoGender: gender? (gender === 'male' ? 'male' : 'female') :'',
          infoSize: size?size:'',
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (!infoProfilePicture.length > 0) {
                setOpen(true)
                setTimeout(function(){ 
                  setOpen(false)
                },3000)
            }else{
            const generalInfo = {
                    name: values.infoName,
                    description: values.infoDescription,
                    animalType: values.infoAnimalType,
                    breed: values.infoBreed,
                    age: values.infoAge,
                    gender: values.infoGender ,
                    size: values.infoSize,
                    pictures: infoPictures,
                    profilePicture: infoProfilePicture,
                    personalities: infoPersonalities                 
                }
                setInfoForm(generalInfo)
                handleNext()
            }
        },
      });
    //onChange={(e) => setForm({...formData, 'name': e.target.value})}
    //setForm({...formData, 'personalities': [...e].map(o => o.value)})
    return(
        <div>
                <form onSubmit={formik.handleSubmit} >
                {open ? (
                <MessageBox color="danger" message={"Please upload a profile picture"} place={"tr"}  openDuration={3000} ></MessageBox>
                ): null}
                    <CardBody className={classes.grid}>
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={6}>
                        <CustomTextField
                            fullWidth
                            id="infoName"
                            name="infoName"
                            label="Name*"
                            value={formik.values.infoName}
                            onChange={formik.handleChange}
                            error={formik.touched.infoName && Boolean(formik.errors.infoName)}
                            helperText={formik.touched.infoName && formik.errors.infoName}
                        />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                        <CustomTextField
                            fullWidth
                            id="infoAge"
                            name="infoAge"
                            label="Age*"
                            type="number"
                            value={formik.values.infoAge}
                            onChange={formik.handleChange}
                            error={formik.touched.infoAge && Boolean(formik.errors.infoAge)}
                            helperText={formik.touched.infoAge && formik.errors.infoAge}
                        />
                        </GridItem>
                     </GridContainer>
                     <GridContainer>
                        <GridItem xs={12} sm={4} md={4}>
                            <CustomSelect
                                labelText="Animal Type*"
                                formControlProps={{
                                fullWidth: true,
                                }}
                                inputProps={{
                                id: "infoAnimalType",
                                name: "infoAnimalType",
                                onChange : (formik.handleChange),
                                value: formik.values.infoAnimalType
                                }} 
                                options={animalTypes}
                            >
                        </CustomSelect>
                        </GridItem>
                        <GridItem xs={12} sm={4} md={4}>
                            <CustomSelect
                                labelText="Breed*"
                                formControlProps={{
                                fullWidth: true,
                                }}
                                inputProps={{
                                id: "infoBreed",
                                name: "infoBreed",
                                onChange : (formik.handleChange),
                                value: formik.values.infoBreed
                                }} 
                                options={dogBreeds}
                            >
                        </CustomSelect>
                        </GridItem>
                        <GridItem xs={12} sm={4} md={4}>
                            <CustomSelect
                                labelText="Size*"
                                formControlProps={{
                                fullWidth: true,
                                }}
                                inputProps={{
                                id: "infoSize",
                                name: "infoSize",
                                onChange : (formik.handleChange),
                                value: formik.values.infoSize
                                }} 
                                options={sizes}
                            >
                        </CustomSelect>
                        </GridItem>
                     </GridContainer>
                     <GridContainer>
                        <GridItem xs={12} sm={4} md={4}>
                        <Typography className={classes.title}> Gender*:</Typography>
                        <RadioGroup row>
                        <FormControlLabel
                        control={
                            <Radio
                            checked={formik.values.infoGender === 'male'}
                            onChange={formik.handleChange}
                            value={'male'}
                            name="infoGender"
                            aria-label="Male"
                            icon={
                                <FiberManualRecord className={classes.radioUnchecked} />
                            }
                            checkedIcon={
                                <FiberManualRecord className={classes.radioChecked} />
                            }
                            classes={{
                                checked: classes.radio,
                            }}
                            />
                        }
                            classes={{
                            label: classes.label,
                            root: classes.labelRoot,
                            }}
                            label="Male"
                        />
                        <FormControlLabel
                        control={
                            <Radio
                            checked={formik.values.infoGender === 'female'}
                            onChange={formik.handleChange}
                            value={'female'}
                            name="infoGender"
                            aria-label="Female"
                            icon={
                                <FiberManualRecord className={classes.radioUnchecked} />
                            }
                            checkedIcon={
                                <FiberManualRecord className={classes.radioChecked} />
                            }
                            classes={{
                                checked: classes.radio,
                            }}
                            />
                        }
                        classes={{
                            label: classes.label,
                            root: classes.labelRoot,
                        }}
                        label="Female"
                        />
                        </RadioGroup>
                        </GridItem>
                        <GridItem xs={12} sm={8} md={8}>
                        <Typography className={classes.title}>Perosnalities: </Typography>
                            <ReactSelect 
                                options={personalityTraits}
                                defaultValue={infoPersonalities.map((personality) => {
                                    return {'value': personality, 'label': personality}
                                 })}
                                placeholder="Select peronsality traits..."
                                isSearchable
                                isMulti
                                noOptionsMessage={() => 'No personality related to search'}
                                onChange={(e) =>   setPersonalities([...e].map(o => o.value))}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                            labelText="Additional information about the animal.."
                            id="infoDescription"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 5,
                                value:formik.values.infoDescription,
                                onChange:formik.handleChange,
                            }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                        <Typography className={classes.title}>Select Profile Picture:</Typography>
                            <FileUploader pics={infoProfilePicture ? infoProfilePicture : []}filesLimit={profileLimit}  setPictures={setProfilePicture} />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                        <Typography className={classes.title}>Select Pictures:</Typography>
                            <FileUploader pics={infoPictures ? infoPictures : []}filesLimit={filesLimit}  setPictures={setPictures} />
                        </GridItem>
                    </GridContainer>
                    <div className={classes.buttonSpace}>
                    <Button color="transparent">Back</Button>
                     <Button type="submit" color="primary">Continue</Button>
                     </div>
                    </CardBody>  
                </form>

     </div>
    );
}