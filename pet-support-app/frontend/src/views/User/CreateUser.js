import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../actions/UserActions';
import { roles, charRegExp  } from '../../utils';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import FileUploader from '../../components/FileUploader'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/Users/createUserStyle"
// core components
import CustomBreadcrumbs from 'components/BreadCrumbs/BreadCrumbs'
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomSelect from "components/CustomInput/CustomSelect.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomTextField from '../../components/CustomInput/CustomTextField'

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
    password: yup
      .string()
      .min(3, 'Password must be longer than 3 characters')
      .max(50, 'Password must be less than 50 characters')
      .required('Password is required'),
    // phoneNumber: yup
    // .string()
    // .matches(phoneRegExp, 'Phone number is not valid')
    // .min(10, "Phone number has to be at least 10 digits")
    // .max(10, "Phone number has maximum 10 digits")
    // .required('Phone number is required'),
  });

  const useStyles = makeStyles(styles);

export default function CreateUser(props){
    const classes = useStyles();
    const filesLimit = 1;
    const [picture, setPicture] = useState('');

    const userCreate = useSelector((state) => state.userCreate);
    const { success, loading, error } = userCreate;

    const dispatch = useDispatch();

      useEffect(() => {
        if (success) {
            setTimeout(function(){ 
            window.location = '/admin/users';
         },2000)
        }
        // if (!user){
        //     dispatch(authenticateUser())
        // }else{
        //     console.log(user)
        //     if (user.shelter != "" || null)
        //         setShelter(user.shelter)
        // }

      }, [dispatch, success]);

      const formik = useFormik({
        initialValues: {
            firstname:  "",
            lastname:  "",
            password:  "",
            email:  "",
            role: roles.Administrator,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
         const newUser = {
                  firstname: values.firstname,
                  lastname: values.lastname,
                  email: values.email,
                  password: values.password,
                  role: values.role,
                  picture: picture,
              }
            dispatch(createUser(newUser));
        },
      });


      return (
        <div>    
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
          <CustomBreadcrumbs
            location={props.location}
            plural={true}
            pageTitle={"Create User"}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
        {loading ? (<LoadingBox></LoadingBox>
              ) : error? (
                  <MessageBox color="danger" message={error} place={"tr"}  openDuration={4000} ></MessageBox>
              ) : success ? (
                  <MessageBox color="success" message={success} successMsg={true} place={"tr"}  openDuration={2000} ></MessageBox>
                ):(
                  <div></div>
              )}
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
          <form className={classes.form} onSubmit={formik.handleSubmit} >
          <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>User Information</h4>
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
                  label="Password*"
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
              />
              </GridItem>
              </GridContainer>
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
                      value: formik.values.role,
                      }} 
                      options={roles}
                  >
                 </CustomSelect>
              </GridItem>
              </GridContainer>
          </CardBody>
          <CardFooter>
              <Button  type="submit" color="primary">Create User</Button>
            </CardFooter>
            </form>
          </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
              <Card color="primary">
              <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>Profile Picture</h4>
               <p className={classes.cardCategoryWhite}>Limit to 1 picture</p>
            </CardHeader>
                <CardBody>
                    <FileUploader filesLimit={filesLimit}  setPictures={setPicture} ></FileUploader>
                </CardBody>
              </Card>
            </GridItem>
    </GridContainer>
</div> 
      )
}


/*import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, authenticateUser } from '../../actions/UserActions';
import { listShelters } from '../../actions/ShelterActions';
import { roles } from '../../utils';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

export default function CreateUser(){
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Administrator');
    const [picture, setPicture] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [selectedShelters, setSelectedShelters] = useState([]);

    const userCreate = useSelector((state) => state.userCreate);
    const { success : successCreate, loading: loadingUpdate, error: errorUpdate } = userCreate;

    // const shelterList = useSelector((state) => state.shelterList);
    // const {loading: loadingShelter, error: errorShelter, shelters , role: roleShelter} = shelterList;

    const userAuthenticate = useSelector((state) => state.userAuthenticate);
    const { success, loading, user, error } = userAuthenticate;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
         const user = {
            firstname: firstname,
            lastname: lastname,
            password: password,
            email: email,
            role: role,
            shelter: selectedShelters,
            picture: picture,
        }
          dispatch(createUser(user));
      };

      useEffect(() => {
        if (successCreate) {
            window.location = '/admin/users';
        }
        if (!user){
            dispatch(authenticateUser())
           }else{
             console.log(user)
           }
        // if (loadingShelter){
        //     dispatch(listShelters());
        // }
       // dispatch(listShelters());

      }, [dispatch, successCreate]);

      const onChangePicture = (pictureSrc) => {
        if (pictureSrc.target.files && pictureSrc.target.files[0]) {
            let img = pictureSrc.target.files[0];
            setPicture(img)
            setPictureUrl(window.URL.createObjectURL(img))
        }
      }

      return (
        <div>
         {loadingShelter ? (<LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{errorShelter}</MessageBox>
      ) : (
        <Container fluid>
        <Row>
        <Col md="8">
            <Card>
            <Card.Header>
                <Card.Title as="h4">Create New Account</Card.Title>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={submitHandler}>
                {loading && <LoadingBox></LoadingBox>}
                 {error && <MessageBox variant="danger">{error}</MessageBox>}
                <Row>
                    <Col className="pr-1" md="6">
                    <Form.Group>
                        <label>Firstname</label>
                        <Form.Control
                        placeholder="first name"
                        type="text"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                    <Form.Group>
                        <label>Lastname</label>
                        <Form.Control
                        placeholder="last name"
                        type="text"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="pr-1" md="6">
                    <Form.Group>
                        <label >Email address</label>
                        <Form.Control
                        placeholder="Email"
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                    <Form.Group>   
                        <Form.Label>Password</Form.Label> 
                        <Form.Control
                        placeholder="password"
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="pr-1" md="6">
                    <Form.Group>
                        <Form.Label>Select Role</Form.Label>
                        <Form.Control as="select"  onChange={(e) => setRole(e.target.value)}>
                        {Object.keys(roles).map((key) => 
                            <option key={key} value={roles[key]}>{roles[key]}</option>
                        )}
                        </Form.Control>
                    </Form.Group>
                    </Col>

                     <Col className="pl-1" md="6">
                    <Form.Group >
                        <Form.Label>Select Shelter</Form.Label>
                        <Form.Control as="select" onChange={(e) => setSelectedShelters(e.target.value)}>
                        {shelters.map((shelter) => (
                            <option key={shelter._id} value={shelter._id}>{shelter.name}</option>
                        ))}
                        </Form.Control>
                    </Form.Group>
                    </Col> 
                </Row>
                <Row>
                    <Col md="12">
                    <Form.Group>
                    <Form.Label>Select Picture</Form.Label>
                    <div>
                      <Image src={pictureUrl} fluid/>
                      <input type="file" name="picture" id="picture" onChange={(pictureSrc) => onChangePicture(pictureSrc)} />
                  </div>
                    </Form.Group>
                    </Col>
                </Row>
                <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                >
                    Create
                </Button>
                <div className="clearfix"></div>
                </Form>
            </Card.Body>
            </Card>
        </Col>
        <Col md="4">
            <Card className="card-user">
            <div className="card-image">
                <img
                alt="..."
                src={
                    require("../../assets/img/photo-1431578500526-4d9613015464.jpeg")
                    .default
                }
                ></img>
            </div>
            <Card.Body>
                <div className="author">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                    alt="..."
                    className="avatar border-gray"
                    src={require("../../assets/img/faces/face-3.jpg").default}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                </a>
                <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                "Lamborghini Mercy <br></br>
                Your chick she so thirsty <br></br>
                I'm in that two seat Lambo"
                </p>
            </Card.Body>
            <hr></hr>
            <div className="button-container mr-auto ml-auto">
                <Button
                className="btn-simple btn-icon"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                variant="link"
                >
                <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                className="btn-simple btn-icon"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                variant="link"
                >
                <i className="fab fa-twitter"></i>
                </Button>
                <Button
                className="btn-simple btn-icon"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                variant="link"
                >
                <i className="fab fa-google-plus-square"></i>
                </Button>
            </div>
            </Card>
        </Col>
        </Row>
    </Container>)
    }
    </div>
    )
}*/
/*
const Shelter = props => (
    <option value={props.shelter._id}>{props.shelter.name}</option>
);
export default class CreatUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeShelters = this.onChangeShelters.bind(this);
        this.onChangePicture= this.onChangePicture.bind(this);
        this.onChangePictureUrl = this.onChangePicture.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            role: 'Administrator',
            exisingShelters:[],
            shelters: '',
            picture: '',
            pictureUrl: null,
        }
    }

    componentDidMount(){
        const token = sessionStorage.getItem('user');

        axios.get('http://localhost:5000/shelters/',{
            headers:{"authorization": token},
          })
        .then (response =>{
            this.setState({exisingShelters: response.data.shelters})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    shelterList() {
        return this.state.exisingShelters.map(currentshelter => {
          return <Shelter shelter={currentshelter} key={currentshelter._id}/>;
        })
    }

    onChangeFirstname(e) {
        this.setState({
           firstname : e.target.value
        })
    }

    onChangeLastname(e) {
        this.setState({
           lastname : e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangeRole(e) {
        this.setState({
           role : e.target.value
        })
    }
    onChangeShelters(e) {
        this.setState({
           shelters : e.target.value
        })
    }
    onChangePicture(e) {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            console.log(window.URL.createObjectURL(img))
            this.setState({
              picture: img
            });
            this.setState({
                pictureUrl: window.URL.createObjectURL(img)
              });
        }
      }

    onSubmit(e) {
        e.preventDefault();
        var shelterList = []
        shelterList.push(this.state.shelters)
        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            password: this.state.password,
            email: this.state.email,
            role: this.state.role,
            shelters: shelterList,
            picture: this.state.picture,
        }

        console.log(user);

        let formData = new FormData();
        formData.append("firstname",user.firstname)
        formData.append("lastname",user.lastname)
        formData.append("password",user.password)
        formData.append("email",user.email)
        formData.append("role",user.role)
        formData.append("shelters",user.shelters)
        formData.append("picture",user.picture)

        //process.env.PUBLIC_URL
        axios.post('http://localhost:5000/users/create', formData)
            .then(res => console.log(res.data));

        window.location = '/admin/users';
    }

    render() {
        return (
            <Container fluid>
            <Row>
            <Col md="8">
                <Card>
                <Card.Header>
                    <Card.Title as="h4">Create New Account</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.onSubmit}>
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <label>Firstname</label>
                            <Form.Control
                            placeholder="first name"
                            type="text"
                            required
                            value={this.state.firstname}
                            onChange={this.onChangeFirstname}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                        <Form.Group>
                            <label>Lastname</label>
                            <Form.Control
                            placeholder="last name"
                            type="text"
                            required
                            value={this.state.lastname}
                            onChange={this.onChangeLastname}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <label >Email address</label>
                            <Form.Control
                            placeholder="Email"
                            type="email"
                            required
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                        <Form.Group>   
                            <Form.Label>Password</Form.Label> 
                            <Form.Control
                            placeholder="password"
                            type="password"
                            required
                            value={this.state.password}
                            onChange={this.onChangePassword}>
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <Form.Label>Select Role</Form.Label>
                            <Form.Control as="select" value={this.state.role} onChange={this.onChangeRole}>
                            <option>Adminstrator</option>
                            <option>Staff</option>
                            <option>Schedule Manager</option>
                            <option>Animal Manager</option>
                            </Form.Control>
                        </Form.Group>
                        </Col>

                        <Col className="pl-1" md="6">
                        <Form.Group >
                            <Form.Label>Select Shelter</Form.Label>
                            <Form.Control as="select" value={this.state.shelters} onChange={this.onChangeShelters}>
                            { this.shelterList() }
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                        <Form.Group>
                        <Form.Label>Select Picture</Form.Label>
                        <div>
                          <Image src={this.state.pictureUrl} fluid/>
                          <input type="file" name="picture" id="picture" onChange={this.onChangePicture} />
                      </div>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                    >
                        Create
                    </Button>
                    <div className="clearfix"></div>
                    </Form>
                </Card.Body>
                </Card>
            </Col>
            <Col md="4">
                <Card className="card-user">
                <div className="card-image">
                    <img
                    alt="..."
                    src={
                        require("../../assets/img/photo-1431578500526-4d9613015464.jpeg")
                        .default
                    }
                    ></img>
                </div>
                <Card.Body>
                    <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("../../assets/img/faces/face-3.jpg").default}
                        ></img>
                        <h5 className="title">Mike Andrew</h5>
                    </a>
                    <p className="description">michael24</p>
                    </div>
                    <p className="description text-center">
                    "Lamborghini Mercy <br></br>
                    Your chick she so thirsty <br></br>
                    I'm in that two seat Lambo"
                    </p>
                </Card.Body>
                <hr></hr>
                <div className="button-container mr-auto ml-auto">
                    <Button
                    className="btn-simple btn-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                    >
                    <i className="fab fa-facebook-square"></i>
                    </Button>
                    <Button
                    className="btn-simple btn-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                    >
                    <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                    className="btn-simple btn-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                    >
                    <i className="fab fa-google-plus-square"></i>
                    </Button>
                </div>
                </Card>
            </Col>
            </Row>
        </Container>
        )
    }
}*/
/*
const Shelter = props => (
    <option value={props.shelter._id}>{props.shelter.name}</option>
);
export default class CreatUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeShelters = this.onChangeShelters.bind(this);
        this.onChangePicture= this.onChangePicture.bind(this);
        this.onChangePictureUrl = this.onChangePicture.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            role: 'Administrator',
            exisingShelters:[],
            shelters: '',
            picture: '',
            pictureUrl: null,
        }
    }

    componentDidMount(){
        const token = sessionStorage.getItem('user');

        axios.get('http://localhost:5000/shelters/',{
            headers:{"authorization": token},
          })
        .then (response =>{
            this.setState({exisingShelters: response.data.shelters})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    shelterList() {
        return this.state.exisingShelters.map(currentshelter => {
          return <Shelter shelter={currentshelter} key={currentshelter._id}/>;
        })
    }

    onChangeFirstname(e) {
        this.setState({
           firstname : e.target.value
        })
    }

    onChangeLastname(e) {
        this.setState({
           lastname : e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangeRole(e) {
        this.setState({
           role : e.target.value
        })
    }
    onChangeShelters(e) {
        this.setState({
           shelters : e.target.value
        })
    }
    onChangePicture(e) {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            console.log(window.URL.createObjectURL(img))
            this.setState({
              picture: img
            });
            this.setState({
                pictureUrl: window.URL.createObjectURL(img)
              });
        }
      }

    onSubmit(e) {
        e.preventDefault();
        var shelterList = []
        shelterList.push(this.state.shelters)
        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            password: this.state.password,
            email: this.state.email,
            role: this.state.role,
            shelters: shelterList,
            picture: this.state.picture,
        }

        console.log(user);

        let formData = new FormData();
        formData.append("firstname",user.firstname)
        formData.append("lastname",user.lastname)
        formData.append("password",user.password)
        formData.append("email",user.email)
        formData.append("role",user.role)
        formData.append("shelters",user.shelters)
        formData.append("picture",user.picture)

        //process.env.PUBLIC_URL
        axios.post('http://localhost:5000/users/create', formData)
            .then(res => console.log(res.data));

        window.location = '/admin/users';
    }

    render() {
        return (
            <Container fluid>
            <Row>
            <Col md="8">
                <Card>
                <Card.Header>
                    <Card.Title as="h4">Create New Account</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.onSubmit}>
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <label>Firstname</label>
                            <Form.Control
                            placeholder="first name"
                            type="text"
                            required
                            value={this.state.firstname}
                            onChange={this.onChangeFirstname}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                        <Form.Group>
                            <label>Lastname</label>
                            <Form.Control
                            placeholder="last name"
                            type="text"
                            required
                            value={this.state.lastname}
                            onChange={this.onChangeLastname}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <label >Email address</label>
                            <Form.Control
                            placeholder="Email"
                            type="email"
                            required
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                        <Form.Group>   
                            <Form.Label>Password</Form.Label> 
                            <Form.Control
                            placeholder="password"
                            type="password"
                            required
                            value={this.state.password}
                            onChange={this.onChangePassword}>
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <Form.Label>Select Role</Form.Label>
                            <Form.Control as="select" value={this.state.role} onChange={this.onChangeRole}>
                            <option>Adminstrator</option>
                            <option>Staff</option>
                            <option>Schedule Manager</option>
                            <option>Animal Manager</option>
                            </Form.Control>
                        </Form.Group>
                        </Col>

                        <Col className="pl-1" md="6">
                        <Form.Group >
                            <Form.Label>Select Shelter</Form.Label>
                            <Form.Control as="select" value={this.state.shelters} onChange={this.onChangeShelters}>
                            { this.shelterList() }
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                        <Form.Group>
                        <Form.Label>Select Picture</Form.Label>
                        <div>
                          <Image src={this.state.pictureUrl} fluid/>
                          <input type="file" name="picture" id="picture" onChange={this.onChangePicture} />
                      </div>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                    >
                        Create
                    </Button>
                    <div className="clearfix"></div>
                    </Form>
                </Card.Body>
                </Card>
            </Col>
            <Col md="4">
                <Card className="card-user">
                <div className="card-image">
                    <img
                    alt="..."
                    src={
                        require("../../assets/img/photo-1431578500526-4d9613015464.jpeg")
                        .default
                    }
                    ></img>
                </div>
                <Card.Body>
                    <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("../../assets/img/faces/face-3.jpg").default}
                        ></img>
                        <h5 className="title">Mike Andrew</h5>
                    </a>
                    <p className="description">michael24</p>
                    </div>
                    <p className="description text-center">
                    "Lamborghini Mercy <br></br>
                    Your chick she so thirsty <br></br>
                    I'm in that two seat Lambo"
                    </p>
                </Card.Body>
                <hr></hr>
                <div className="button-container mr-auto ml-auto">
                    <Button
                    className="btn-simple btn-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                    >
                    <i className="fab fa-facebook-square"></i>
                    </Button>
                    <Button
                    className="btn-simple btn-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                    >
                    <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                    className="btn-simple btn-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                    >
                    <i className="fab fa-google-plus-square"></i>
                    </Button>
                </div>
                </Card>
            </Col>
            </Row>
        </Container>
        )
    }
}*/