import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {signin, loginUser} from '../actions/UserActions'
import CssBaseline from '@material-ui/core/CssBaseline';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CustomTextField from '../components/CustomInput/CustomTextField'
import Button from "../components/CustomButtons/Button.js";
import { makeStyles } from '@material-ui/core/styles';
//styles
import styles from "assets/jss/material-dashboard-react/views/loginStyle.js";

import { useFormik } from 'formik';
import * as yup from 'yup';

const coverImg = require("../assets/img/logos/cover.jpeg").default
const logo = require("../assets/img/logos/logo.png").default

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required("Password is required")
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Pet Support
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}
const useStyles = makeStyles(styles);

export default function SignInSide() {
  const classes = useStyles();

 // const userSignin = useSelector((state) => state.userSignin);
  //const { userInfo,loading, error, success } = userSignin;
  

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingLogin, error : errorLogin, success: successLogin } = userLogin;
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (successLogin) {
      window.location = '/admin/dashboard';
    }
  }, [dispatch, successLogin]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password:'',  
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //dispatch(signin(values.email,values.password));
      dispatch(loginUser(values.email,values.password));
    },
  });

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid  component={Box} item xs={false} sm={5} md={7} display={{ xs: 'none', sm:'block', md: 'block' }}>
        <img className={classes.image} src={coverImg}/>
      </Grid>
      <Grid item  xs={12} sm={7} md={5} component={Paper} elevation={1} square>
      {loadingLogin ? (<LoadingBox></LoadingBox>
          ) : errorLogin ? (
             <MessageBox color="danger" message={errorLogin} place={"tr"}  openDuration={4000} ></MessageBox>
          ) :(
             null
        )}
        <div className={classes.paper}>
          <img className={classes.logo} src={logo}/>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <CustomTextField
             className={classes.marginTop}
              margin="normal"
              autoComplete="email"
              autoFocus
              fullWidth
              id="email"
              name="email"
              label="Email Address*"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <CustomTextField
              className={classes.marginTop}
              margin="normal"
              name="password"
              label="Password*"
              type="password"
              id="password"
              autoComplete="current-password"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <a href="#" >
                  Forgot password?
                </a>
              </Grid>
              <Grid item>
                <a href="#" >
                  {"Don't have an account? Sign Up"}
                </a>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

// import React, {Component} from "react";
// import GoogleLogin from "react-google-login";
// import axios from 'axios';
// import classes from '../assets/css/login.module.css'


// // react-bootstrap components
// import {
//   Badge,
//   Button,
//   Card,
//   Form,
//   Navbar,
//   Nav,
//   Image,
//   Container,
//   Row,
//   Col,
// } from "react-bootstrap";


// export default class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.onChangeEmail = this.onChangeEmail.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);

//     this.state = {
//       email: '',
//       password: '',
//     }
//   }
//   onChangePassword(e) {
//     this.setState({
//         password: e.target.value
//     })
//   }
//   onChangeEmail(e) {
//       this.setState({
//           email: e.target.value
//       })
//   }

// onSubmit(e) {
//   e.preventDefault();
//   const authentication = {
//     password: this.state.password,
//     email: this.state.email,
//   }
//   axios.post('http://localhost:5000/users/login', authentication)
//   .then(res =>{ 
//     if (res.data != ""){
//       window.sessionStorage.setItem('user', res.data.token)
//       window.location = '/admin/dashboard';
//     }
//     })
//     .catch(err => {
//       alert("Login failed. Please check your email or password");
//       console.log(err)
//     });
// }


// responseSuccessGoogle = (response) => {
//   axios({
//     method: "POST",
//     url:"http://localhost:5000/auth/googlelogin",
//     data: { tokenId: response.tokenId}
//   }).then(response => {
//     if (response.data != ""){
//       window.sessionStorage.setItem('user', response.data.token)
//       window.location = '/admin/dashboard';
//     }
//   })
// }

// responseErrorGoogle = (response) => {
    
// }

// render() {
//   return (
//     <>
    
//       <Container fluid >
//         <Row className={classes.colHeight} >
//         <Col md="7">
//         <div className={classes.colHeight}>
//                 <Image
//                   alt="..."
//                   src={
//                     require("../assets/img/photo-1431578500526-4d9613015464.jpeg")
//                       .default
//                   }
//                   fluid
//                 ></Image>
//               </div>
//         </Col>
//           <Col md="5" className={classes.topMargin}>
//             <Card>
//               <Card.Header>
//                 <Card.Title as="h4">Sign In</Card.Title>
//               </Card.Header>
//               <Card.Body>
//               <Form onSubmit={this.onSubmit}>
//                   <Form.Group>
//                   {/* <Form.Label>Email address</Form.Label> */}
//                       <Form.Control
//                          placeholder="Email"
//                         type="email"
//                         required
//                         value={this.state.email}
//                         onChange={this.onChangeEmail}
//                       ></Form.Control>
//                    </Form.Group>
                
//                    <Form.Group>   
//                    {/* <Form.Label>Password</Form.Label>  */}
//                       <Form.Control
//                         placeholder="password"
//                         type="password"
//                         required
//                         value={this.state.password}
//                         onChange={this.onChangePassword}
//                       ></Form.Control>
//                        <a href="#">Forgot Password?</a>
//                    </Form.Group>
                   
//                 {/* <Form.Group>
//                 <label>
//                   <input type="checkbox"/>
//                   Remember Me
//                 </label>
//                <Form.Check type="checkbox" label="Remember me" /> 
//                 </Form.Group> */}
//                 <div className={classes.button}>
//                 <Button className="btn-fill"
//                     type="submit"
//                     variant="info"
//                     block
//                     >
//                     SIGN IN
//                 </Button>
//                 </div>
//                 <div className={classes.signUp}><a href="/admin/create">Don't have an account? Sign up</a></div>              
//               </Form>

//               <label className={classes.label}>
//                 OR 
//               </label>
//               <div className={classes.GoogleLogin}>
//               <GoogleLogin
//                     clientId= "928739773656-qv0dd1v17cop0ckrhl0sqvjvnkujn16h.apps.googleusercontent.com"
//                     onSuccess={this.responseSuccessGoogle}
//                     onFailure={this.responseErrorGoogle}
//                     cookiePolicy={'single_host_origin'}
//                     isSignedIn={true}
//                     render={renderProps => (
//                       <Button className="btn-fill" type="submit"variant="danger" block 
//                       onClick={renderProps.onClick} >Continue With Google</Button>
//                     )}
//                 />
//               </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }
// }




// import React from "react";
// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Icon from "@material-ui/core/Icon";
// // @material-ui/icons
// import Email from "@material-ui/icons/Email";
// import People from "@material-ui/icons/People";
// // core components
// //import Header from "components/Header/Header.js";
// //import HeaderLinks from "components/Header/HeaderLinks.js";
// import Footer from "components/Footer/Footer.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
// import Card from "components/Card/Card.js";
// import CardBody from "components/Card/CardBody.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardFooter from "components/Card/CardFooter.js";
// import CustomInput from "components/CustomInput/CustomInput.js";

// import styles from "assets/jss/material-dashboard-react/loginPage"

// import image from "assets/img/bg7.jpg";

// const useStyles = makeStyles(styles);

// export default function LoginPage(props) {
//   const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
//   setTimeout(function () {
//     setCardAnimation("");
//   }, 700);
//   const classes = useStyles();
//   const { ...rest } = props;
//   return (
//     <div>
//       {/* <Header
//         absolute
//         color="transparent"
//         brand="Material Kit React"
//         rightLinks={<HeaderLinks />}
//         {...rest}
//       /> */}
//       <div
//         className={classes.pageHeader}
//         style={{
//           backgroundImage: "url(" + image + ")",
//           backgroundSize: "cover",
//           backgroundPosition: "top center",
//         }}
//       >
//         <div className={classes.container}>
//           <GridContainer justify="center">
//             <GridItem xs={12} sm={12} md={4}>
//               <Card className={classes[cardAnimaton]}>
//                 <form className={classes.form}>
//                   <CardHeader color="primary" className={classes.cardHeader}>
//                     <h4>Login</h4>
//                     <div className={classes.socialLine}>
//                       <Button
//                         justIcon
//                         href="#pablo"
//                         target="_blank"
//                         color="transparent"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         <i className={"fab fa-twitter"} />
//                       </Button>
//                       <Button
//                         justIcon
//                         href="#pablo"
//                         target="_blank"
//                         color="transparent"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         <i className={"fab fa-facebook"} />
//                       </Button>
//                       <Button
//                         justIcon
//                         href="#pablo"
//                         target="_blank"
//                         color="transparent"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         <i className={"fab fa-google-plus-g"} />
//                       </Button>
//                     </div>
//                   </CardHeader>
//                   <p className={classes.divider}>Or Be Classical</p>
//                   <CardBody>
//                     <CustomInput
//                       labelText="First Name..."
//                       id="first"
//                       formControlProps={{
//                         fullWidth: true,
//                       }}
//                       inputProps={{
//                         type: "text",
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <People className={classes.inputIconsColor} />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                     <CustomInput
//                       labelText="Email..."
//                       id="email"
//                       formControlProps={{
//                         fullWidth: true,
//                       }}
//                       inputProps={{
//                         type: "email",
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <Email className={classes.inputIconsColor} />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                     <CustomInput
//                       labelText="Password"
//                       id="pass"
//                       formControlProps={{
//                         fullWidth: true,
//                       }}
//                       inputProps={{
//                         type: "password",
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <Icon className={classes.inputIconsColor}>
//                               lock_outline
//                             </Icon>
//                           </InputAdornment>
//                         ),
//                         autoComplete: "off",
//                       }}
//                     />
//                   </CardBody>
//                   <CardFooter className={classes.cardFooter}>
//                     <Button simple color="primary" size="lg">
//                       Get started
//                     </Button>
//                   </CardFooter>
//                 </form>
//               </Card>
//             </GridItem>
//           </GridContainer>
//         </div>
//         <Footer whiteFont />
//       </div>
//     </div>
//   );
// }