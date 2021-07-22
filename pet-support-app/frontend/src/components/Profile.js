import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/UserActions';
import { listShelters } from '../actions/ShelterActions';
import { USER_UPDATE_RESET } from '../constants/UserConstants';
import { USER_DETAILS_RESET } from '../constants/UserConstants';
import { roles, charRegExp } from '../utils';
import LoadingBox from 'components/LoadingBox';
import MessageBox from 'components/MessageBox';
import FileUploader from 'components/FileUploader'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/Users/editUserStyle"
// core components
import CustomBreadcrumbs from 'components/BreadCrumbs/BreadCrumbs'
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomSelect from "components/CustomInput/CustomSelect.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomTextField from 'components/CustomInput/CustomTextField'

import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    firstname: yup
      .string()
      .matches(charRegExp, 'Has to be characters only')
      .required('First Name is required'),
    lastname: yup
      .string()
      .matches(charRegExp, 'Has to be characters only')
      .required('Last Name is required'),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
  });


  const useStyles = makeStyles(styles);

 export default function Profile(props){
    const classes = useStyles();
    const userId = props.id ;
    const filesLimit = 1;
    const [picture, setPicture] = useState('');
    const [initialPictureUrl, setPictureUrl] = useState('');
    const userRole = props.role ? props.role : null;
    
     const userDetails = useSelector((state) => state.userDetails);
     const { loading, error, user, success, pictureUrl: savedPicUrl } = userDetails;
   
     const userUpdate = useSelector((state) => state.userUpdate);
     const {
       loading: loadingUpdate,
       error: errorUpdate,
       success: successUpdate,
     } = userUpdate;

     const dispatch = useDispatch();
     useEffect(() => {
       if (successUpdate) {
         setTimeout(function(){ 
           const location = userRole === roles.Staff ? "/admin/dashboard" : '/admin/users'
          window.location = location
         },2000)
       }
       if (!user) {
         dispatch(detailsUser(userId));
       } else {
         if (!successUpdate){
            if (savedPicUrl) setInitalPictureFile(savedPicUrl)
            else setPictureUrl([])
         }
       }
     }, [dispatch, user, userId, successUpdate, savedPicUrl]);
  
    async function setInitalPictureFile(pic) {
        const promisesOfS3Objects = []
        await fetch(pic).then(async (res) => {
                const buf = await res.arrayBuffer();
                const pic = user.picture.split('||')[1]
                const type =  pic != undefined || null || ""? 'image/' + pic.split('.')[1] : ""
                const file = new File([buf], pic, { type: type })
                promisesOfS3Objects.push(file)
        })
        setPictureUrl(promisesOfS3Objects)
    }

    const formik = useFormik({
        initialValues: {
            firstname: user?.firstname ?? "",
            lastname: user?.lastname ?? "",
            password: user?.password ?? "",
            email: user?.email ?? "",
            role: user?.role ?? "",
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
        const editedUser = {
                _id: userId,
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                password: values.password,
                role: values.role,
                picture: picture,
                originalPicture: user?.picture ?? [],
                passwordChanged: user?.password === values.password ? false : true,
                profileUpdate: true
            }
        dispatch(updateUser(editedUser));
        },
    });

    return (
        <div>
        {loading ? (<LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox color="danger" message={error} place={"tr"} openDuration={4000} ></MessageBox>
      ) : ( 
      <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
              <CustomBreadcrumbs
                location={props.location}
                pageTitle={"Profile"}
                plural={true}
              />
            </GridItem>
          <GridItem xs={12} sm={12} md={12}>
          {loadingUpdate ? (<LoadingBox></LoadingBox>
                ) : errorUpdate ? (
                    <MessageBox color="danger" message={errorUpdate} place={"tr"}  openDuration={4000} ></MessageBox>
                ) : successUpdate ? (
                    <MessageBox color="success" message={successUpdate} successMsg={true} place={"tr"}  openDuration={2000} ></MessageBox>
                  ):(
                    <div></div>
                )}
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
            <form className={classes.form} onSubmit={formik.handleSubmit} >
              <CardHeader plain color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                 <p className={classes.cardCategoryWhite}>Fill out the required form</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                  <CustomTextField
                    fullWidth
                    id="firstname"
                    name="firstname"
                    label="First Name*"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                    helperText={formik.touched.firstname && formik.errors.firstname}
                />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomTextField
                    fullWidth
                    id="lastname"
                    name="lastname"
                    label="Last Name*"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                    helperText={formik.touched.lastname && formik.errors.lastname}
                />
                </GridItem>
                </GridContainer>
                <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <CustomTextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address*"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                <CustomTextField
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="New Password (Optional)"
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                </GridItem>
                </GridContainer>
                {userRole === roles.Administrator ? 
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                    <CustomSelect
                            labelText="Role*"
                            formControlProps={{
                            fullWidth: true,
                            }}
                            inputProps={{
                            id: "role",
                            name: "role",
                            onChange : (formik.handleChange),
                            required: true,
                            value: formik.values.role
                            }} 
                            options={roles}
                        >
                    </CustomSelect>
                    </GridItem>
                    </GridContainer> 
                    :null
                }
            </CardBody>
            <CardFooter>
                <Button  type="submit" color="primary">Update User</Button>
              </CardFooter>
              </form>
            </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
                <Card>
                <CardHeader plain color="primary">
                <h4 className={classes.cardTitleWhite}>Upload Pictures</h4>
                 <p className={classes.cardCategoryWhite}>Limit of up to 5 pictures</p>
              </CardHeader>
                  <CardBody>
                  {initialPictureUrl &&
                      <FileUploader filesLimit={filesLimit} pics={initialPictureUrl}  setPictures={setPicture} ></FileUploader>
                  }
                  </CardBody>
                </Card>
        </GridItem>
      </GridContainer>
      )}
        </div>
    );
}

