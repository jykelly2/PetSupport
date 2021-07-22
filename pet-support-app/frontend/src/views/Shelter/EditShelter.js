import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsShelter, updateShelter } from '../../actions/ShelterActions';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomTextField from '../../components/CustomInput/CustomTextField'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import FileUploader from '../../components/FileUploader'
import CustomBreadcrumbs from 'components/BreadCrumbs/BreadCrumbs'

// styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/Shelter/editShelterStyle"

import {phoneRegExp,charRegExp} from '../../utils'
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup
      .string()
      .matches(charRegExp, 'Has to be characters only')
      .required('Name is required'),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "Phone number has to be at least 10 digits")
    .max(10, "Phone number has maximum 10 digits")
    .required('Phone number is required'),
    city: yup
    .string()
    .matches(charRegExp, 'Has to be characters only')
    .required("City is required"),
    province: yup
    .string()
    .matches(charRegExp, 'Has to be characters only')
    .required("Province is required"),
    streetAddress: yup
    .string()
    .required("Street address is required"),
    postalCode: yup
    .string()
    .length(6)
    .required("Postal code is required"),
    available: yup
    .boolean().default(false)
    .required("Availability is required"),
  });

  const useStyles = makeStyles(styles);

export default function EditShelter(props){
    const classes = useStyles();
    const shelterId = props.match.params.id;
    const filesLimit = 5;

    const [pictures, setPictures] = useState('');
    const [loadedPicUrls, setPictureUrls] = useState('');
    
    const shelterDetails = useSelector((state) => state.shelterDetails);
    const { loading, error, shelter,  pictureUrls} = shelterDetails;

    const shelterUpdate = useSelector((state) => state.shelterUpdate);
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = shelterUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
      if (successUpdate) {
        //dispatch({ type: shelter_UPDATE_RESET });
        setTimeout(function(){ 
         window.location = '/admin/shelter';
        },2000);
      }
      if (!shelter) {
        dispatch(detailsShelter(shelterId));
      } else {  
        if (!loading){
            setInitalPictureFiles(pictureUrls)
        }
      }
    }, [ dispatch,  successUpdate, pictureUrls]);

    async function setInitalPictureFiles(pics) {
        const promisesOfS3Objects = []
        await Promise.all(pics.map((imageDataUrl)=>fetch(imageDataUrl))).then(res =>
            Promise.all(res.map(async (res, index) => {
                const buf = await res.arrayBuffer();
                const pic = shelter.pictures[index].split('||')[1]
                const type =  pic != undefined || null || ""? 'image/' + pic.split('.')[1] : ""
                 const file = new File([buf], pic, { type: type })
                 promisesOfS3Objects.push(file)
        })))
        setPictureUrls(promisesOfS3Objects)
    }

    const formik = useFormik({
        initialValues: {
          name: shelter?.name ?? "",
          description: shelter?.description ?? "",
          phoneNumber: shelter?.phoneNumber?? "",
          email: shelter?.email ?? "",
          city: shelter?.city ?? "",
          province: shelter?.province ?? "",
          streetAddress: shelter?.streetAddress ?? "",
          postalCode: shelter?.postalCode ?? "",
          available: shelter?.available?.toString() ?? "false"
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
         const editedShelter = {
                 _id: shelterId,
                  name: values.name,
                  description: values.description,
                  phoneNumber: values.phoneNumber.toString(),
                  email: values.email,
                  city: values.city,
                  province: values.province,
                  streetAddress: values.streetAddress,
                  postalCode: values.postalCode,
                  originalPictures: shelter?.pictures ?? [],
                  pictures: pictures,
                  available: values.available === 'true' ? true : false
              }
              console.log(editedShelter)
               dispatch(updateShelter(editedShelter));
        },
      });

      return (
        <div>
         {loading ? (<LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox color="danger" message={error} place={"tr"}  openDuration={4000} ></MessageBox>
      ) : (
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <CustomBreadcrumbs
              location={props.location}
              edit={true}
              pageTitle={"Edit Shelter"}
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
                <h4 className={classes.cardTitleWhite}>Shelter Information</h4>
                 <p className={classes.cardCategoryWhite}>Update the required fields</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                  <CustomTextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name*"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
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
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number*"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                  <CustomTextField
                    fullWidth
                    id="streetAddress"
                    name="streetAddress"
                    label="Street Address*"
                    value={formik.values.streetAddress}
                    onChange={formik.handleChange}
                    error={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
                    helperText={formik.touched.streetAddress && formik.errors.streetAddress}
                />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                  <CustomTextField
                    fullWidth
                    id="city"
                    name="city"
                    label="City*"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                  <CustomTextField
                    fullWidth
                    id="province"
                    name="province"
                    label="Province*"
                    value={formik.values.province}
                    onChange={formik.handleChange}
                    error={formik.touched.province && Boolean(formik.errors.province)}
                    helperText={formik.touched.province && formik.errors.province}
                />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                  <CustomTextField
                    fullWidth
                    id="postalCode"
                    name="postalCode"
                    label="Postal Code*"
                    value={formik.values.postalCode}
                    onChange={formik.handleChange}
                    error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                    helperText={formik.touched.postalCode && formik.errors.postalCode}
                />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Write description about the shelter.."
                      id="description"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      
                      inputProps={{
                        multiline: true,
                        rows: 5,
                        value:formik.values.description,
                        onChange:formik.handleChange,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                  <p>Available:</p>
                  <RadioGroup row>
                  <FormControlLabel
                  control={
                    <Radio
                      checked={formik.values.available === 'true'}
                      onChange={formik.handleChange}
                      value={'true'}
                      name="available"
                      aria-label="Yes"
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
                    label="Yes"
                  />
                <FormControlLabel
                  control={
                    <Radio
                      checked={formik.values.available === 'false'}
                      onChange={formik.handleChange}
                      value={'false'}
                      name="available"
                      aria-label="No"
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
                  label="No"
                />
                </RadioGroup>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button  type="submit" color="primary">Update Shelter</Button>
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
                  {loadedPicUrls &&
                    <FileUploader filesLimit={filesLimit} pics={loadedPicUrls}  setPictures={setPictures} ></FileUploader>
                    }
                  </CardBody>
                </Card>
          </GridItem> 
        </GridContainer>
        )}
        </div>
      );
}

/*import React, { Component, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsShelter, updateShelter } from '../../actions/ShelterActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Image,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

export default function EditShelter(props){
    const shelterId = props.match.params.id;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [pictures, setPictures] = useState('');
    const [pictureUrls, setPictureUrls] = useState('');
    const [available, setAvailable] = useState(true);

    const shelterDetails = useSelector((state) => state.shelterDetails);
    const { loading, error, shelter,  pictureUrls: savedPicUrls } = shelterDetails;

    const shelterUpdate = useSelector((state) => state.shelterUpdate);
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = shelterUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
      if (successUpdate) {
        //dispatch({ type: shelter_UPDATE_RESET });
        window.location = '/admin/shelters';
      }
      if (!shelter) {
        dispatch(detailsShelter(shelterId));
      } else {
        setName(shelter.name);
        setDescription(shelter.description);
        setEmail(shelter.email);
        setPhoneNumber(shelter.phoneNumber)
        setCity(shelter.city)
        setProvince(shelter.province)
        setPostalCode(shelter.postalCode)
        setStreetAddress(shelter.streetAddress)
        setPicture(shelter.pictures)
        setPictureUrl(savedPicUrls)
        setAvailable(shelter.available)
      }
    }, [dispatch, successUpdate, shelter, shelterId]);

    const onChangePicture = (pictureSrc) => {
        if (pictureSrc.target.files && pictureSrc.target.files[0]) {
            let img = pictureSrc.target.files[0];
            setPicture(img)
            setPictureUrl(window.URL.createObjectURL(img))
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const editedShelter = {
          _id: shelterId,
          name: name,
          description: description,
          phoneNumber: phoneNumber.toString(),
          email: email,
          city: city,
          province: province,
          streetAddress: streetAddress,
          postalCode: postalCode,
          picture: picture,
          available: available,
      }
        dispatch(updateShelter(editedShelter));
      };

      return (
        <div>
         {loading ? (<LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (<Container fluid>
            <Row>
            <Col md="8">
                <Card>
                <Card.Header>
                    <Card.Title as="h4">Edit Shelter</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <label>Shelter</label>
                            <Form.Control
                            placeholder="Shelter name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                        <Form.Group>
                            <label htmlFor="exampleInputEmail1">
                            Email address
                            </label>
                            <Form.Control
                            placeholder="Email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <label>Phone Number</label>
                            <Form.Control
                            placeholder="Phone number"
                            type="text"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                        <Form.Group>
                      <Form.Label>Select Picture</Form.Label>
                        <div>
                            <Image src={pictureUrl} fluid/>
                            <input type="file" name="picture" id="picture" onChange={(pictureSrc) => onChangePicture(pictureSrc)} />
                        </div>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                        <Form.Group>
                            <label>Street Address</label>
                            <Form.Control
                            placeholder="Street Address"
                            type="text"
                            required
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="4">
                        <Form.Group>
                            <label>City</label>
                            <Form.Control
                            placeholder="City"
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="px-1" md="4">
                        <Form.Group>
                            <label>Province</label>
                            <Form.Control
                            placeholder="Province"
                            type="text"
                            required
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="pl-1" md="4">
                        <Form.Group>
                            <label>Postal Code</label>
                            <Form.Control
                            placeholder="Postal Code"
                            type="text"
                            required
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                        <Form.Group>
                            <label>Shelter Description</label>
                            <Form.Control
                            cols="80"
                            placeholder="About shelter information.."
                            rows="4"
                            as="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                        <Form.Group>
                            <label>Is Shelter Available:</label>
                            <div className="radio">
                                <label>
                                    <input
                                    type="radio"
                                    value="Yes"
                                    //checked={this.state.available === "Yes"}
                                    onChange={(e) => setAvailable(true)}
                                    />
                                    Yes
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input
                                    type="radio"
                                    value="No"
                                    //checked={this.state.available === "No"}
                                    onChange={(e) => setAvailable(false)}
                                    />
                                    No
                                </label>
                            </div>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                    >
                        Update
                    </Button>
                    <div className="clearfix"></div>
                    </Form>
                </Card.Body>
                </Card>
            </Col>
            <Col md="4">
                <Card className="card-shelter">
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
        )}
        </div>
      );
}



/*export default class EditShelter extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeProvince = this.onChangeProvince.bind(this);
        this.onChangeStreetAddress = this.onChangeStreetAddress.bind(this);
        this.onChangePostalCode = this.onChangePostalCode.bind(this);
        this.onChangePicture = this.onChangePicture.bind(this);
        this.onChangePictureUrl = this.onChangePicture.bind(this);
        this.onChangeAvailable = this.onChangeAvailable.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            description: '',
            phoneNumber: '',
            email: '',
            city: '',
            province: '',
            streetAddress: '',
            postalCode: '',
            picture: null,
            pictureUrl: null,
            available: true,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/shelters/edit-shelter/'+this.props.match.params.id)
          .then(response => {
            this.setState({
                name: response.data.name,
                description: response.data.description,
                phoneNumber: response.data.phoneNumber,
                email: response.data.email,
                city: response.data.city,
                province: response.data.province,
                streetAddress: response.data.streetAddress,
                postalCode: response.data.postalCode,
                picture: response.data.picture,
                available: response.data.available
            })   
          }).then(()=> {
              const empty = this.state.picture !== null
            if (empty){
                axios.get('http://localhost:5000/images/getImage/'+this.state.picture)
                .then(response => {
                    this.setState({
                        pictureUrl: response.config.url
                    });
                })
            }
          }) 
          .catch(function (error) {
            console.log(error);
          })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }
    onChangeDescription(e) {
        this.setState({
           description : e.target.value
        })
    }
    onChangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
           email : e.target.value
        })
    }
    onChangeCity(e) {
        this.setState({
            city: e.target.value
        })
    }
    onChangeProvince(e) {
        this.setState({
            province: e.target.value
        })
    }
    onChangeStreetAddress(e) {
        this.setState({
            streetAddress: e.target.value
        })
    }
    onChangePostalCode(e) {
        this.setState({
           postalCode : e.target.value
        })
    }
    onChangePicture(e) {
        
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];

            // var reader = new FileReader();
            
            // reader.onloadend = () => {
            //     this.setState({
            //       picture: reader.result
            //     });
            //   }
          
            //   reader.readAsDataURL(img)
            // reader.onloadend = function() {
            // base64data = reader.result;     
            // }
            console.log(window.URL.createObjectURL(img))
            this.setState({
              picture: img
            });
            this.setState({
                pictureUrl: window.URL.createObjectURL(img)
              });
          }
    }
    onChangeAvailable(e) {
        this.setState({
            available: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

       this.state.available = this.state.available == "Yes" ? true : false
  
        const shelter = {
            name: this.state.name,
            description: this.state.description,
            phoneNumber: this.state.phoneNumber.toString(),
            email: this.state.email,
            city: this.state.city,
            province: this.state.province,
            streetAddress: this.state.streetAddress,
            postalCode: this.state.postalCode,
            picture: this.state.picture,
            available: this.state.available,
        }

        let formData = new FormData();
        formData.append("name",shelter.name)
        formData.append("description",shelter.description)
        formData.append("phoneNumber",shelter.phoneNumber)
        formData.append("email",shelter.email)
        formData.append("city",shelter.city)
        formData.append("province",shelter.province)
        formData.append("streetAddress",shelter.streetAddress)
        formData.append("postalCode",shelter.postalCode)
        formData.append("picture",shelter.picture)
        formData.append("available",shelter.available)

        console.log(shelter);
        axios.post('http://localhost:5000/shelters/update-shelter/' + this.props.match.params.id, formData)
            .then(res => console.log(res.data));

        window.location = '/admin/shelters';
    }
    render() {
    return (
        <>
        <Container fluid>
            <Row>
            <Col md="8">
                <Card>
                <Card.Header>
                    <Card.Title as="h4">Edit Shelter</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <label>Shelter</label>
                            <Form.Control
                            placeholder="Shelter name"
                            type="text"
                            required
                            value={this.state.name}
                            onChange={this.onChangeName}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                        <Form.Group>
                            <label htmlFor="exampleInputEmail1">
                            Email address
                            </label>
                            <Form.Control
                            placeholder="Email"
                            type="email"
                            required
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <label>Phone Number</label>
                            <Form.Control
                            placeholder="Phone number"
                            type="text"
                            required
                            value={this.state.phoneNumber}
                            onChange={this.onChangePhoneNumber}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                        <Form.Group>
                      <Form.Label>Select Picture</Form.Label>
                        <div>
                            <Image src={this.state.pictureUrl} fluid/>
                            <input type="file" name="picture" id="picture" onChange={this.onChangePicture} />
                        </div>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                        <Form.Group>
                            <label>Street Address</label>
                            <Form.Control
                            placeholder="Street Address"
                            type="text"
                            required
                            value={this.state.streetAddress}
                            onChange={this.onChangeStreetAddress}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="4">
                        <Form.Group>
                            <label>City</label>
                            <Form.Control
                            placeholder="City"
                            type="text"
                            required
                            value={this.state.city}
                            onChange={this.onChangeCity}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="px-1" md="4">
                        <Form.Group>
                            <label>Province</label>
                            <Form.Control
                            placeholder="Province"
                            type="text"
                            required
                            value={this.state.province}
                            onChange={this.onChangeProvince}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="pl-1" md="4">
                        <Form.Group>
                            <label>Postal Code</label>
                            <Form.Control
                            placeholder="Postal Code"
                            type="text"
                            required
                            value={this.state.postalCode}
                            onChange={this.onChangePostalCode}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                        <Form.Group>
                            <label>Shelter Description</label>
                            <Form.Control
                            cols="80"
                            placeholder="About shelter information.."
                            rows="4"
                            as="textarea"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                        <Form.Group>
                            <label>Is Shelter Available:</label>
                            <div className="radio">
                                <label>
                                    <input
                                    type="radio"
                                    value="Yes"
                                    checked={this.state.available === "Yes"}
                                    onChange={this.onChangeAvailable}
                                    />
                                    Yes
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input
                                    type="radio"
                                    value="No"
                                    checked={this.state.available === "No"}
                                    onChange={this.onChangeAvailable}
                                    />
                                    No
                                </label>
                            </div>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                    >
                        Update
                    </Button>
                    <div className="clearfix"></div>
                    </Form>
                </Card.Body>
                </Card>
            </Col>
            <Col md="4">
                <Card className="card-shelter">
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
        </>
    );
    }
}


//export default Shelter;*/


/*export default class EditShelter extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeProvince = this.onChangeProvince.bind(this);
        this.onChangeStreetAddress = this.onChangeStreetAddress.bind(this);
        this.onChangePostalCode = this.onChangePostalCode.bind(this);
        this.onChangePicture = this.onChangePicture.bind(this);
        this.onChangePictureUrl = this.onChangePicture.bind(this);
        this.onChangeAvailable = this.onChangeAvailable.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            description: '',
            phoneNumber: '',
            email: '',
            city: '',
            province: '',
            streetAddress: '',
            postalCode: '',
            picture: null,
            pictureUrl: null,
            available: true,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/shelters/edit-shelter/'+this.props.match.params.id)
          .then(response => {
            this.setState({
                name: response.data.name,
                description: response.data.description,
                phoneNumber: response.data.phoneNumber,
                email: response.data.email,
                city: response.data.city,
                province: response.data.province,
                streetAddress: response.data.streetAddress,
                postalCode: response.data.postalCode,
                picture: response.data.picture,
                available: response.data.available
            })   
          }).then(()=> {
              const empty = this.state.picture !== null
            if (empty){
                axios.get('http://localhost:5000/images/getImage/'+this.state.picture)
                .then(response => {
                    this.setState({
                        pictureUrl: response.config.url
                    });
                })
            }
          }) 
          .catch(function (error) {
            console.log(error);
          })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }
    onChangeDescription(e) {
        this.setState({
           description : e.target.value
        })
    }
    onChangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
           email : e.target.value
        })
    }
    onChangeCity(e) {
        this.setState({
            city: e.target.value
        })
    }
    onChangeProvince(e) {
        this.setState({
            province: e.target.value
        })
    }
    onChangeStreetAddress(e) {
        this.setState({
            streetAddress: e.target.value
        })
    }
    onChangePostalCode(e) {
        this.setState({
           postalCode : e.target.value
        })
    }
    onChangePicture(e) {
        
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];

            // var reader = new FileReader();
            
            // reader.onloadend = () => {
            //     this.setState({
            //       picture: reader.result
            //     });
            //   }
          
            //   reader.readAsDataURL(img)
            // reader.onloadend = function() {
            // base64data = reader.result;     
            // }
            console.log(window.URL.createObjectURL(img))
            this.setState({
              picture: img
            });
            this.setState({
                pictureUrl: window.URL.createObjectURL(img)
              });
          }
    }
    onChangeAvailable(e) {
        this.setState({
            available: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

       this.state.available = this.state.available == "Yes" ? true : false
  
        const shelter = {
            name: this.state.name,
            description: this.state.description,
            phoneNumber: this.state.phoneNumber.toString(),
            email: this.state.email,
            city: this.state.city,
            province: this.state.province,
            streetAddress: this.state.streetAddress,
            postalCode: this.state.postalCode,
            picture: this.state.picture,
            available: this.state.available,
        }

        let formData = new FormData();
        formData.append("name",shelter.name)
        formData.append("description",shelter.description)
        formData.append("phoneNumber",shelter.phoneNumber)
        formData.append("email",shelter.email)
        formData.append("city",shelter.city)
        formData.append("province",shelter.province)
        formData.append("streetAddress",shelter.streetAddress)
        formData.append("postalCode",shelter.postalCode)
        formData.append("picture",shelter.picture)
        formData.append("available",shelter.available)

        console.log(shelter);
        axios.post('http://localhost:5000/shelters/update-shelter/' + this.props.match.params.id, formData)
            .then(res => console.log(res.data));

        window.location = '/admin/shelters';
    }
    render() {
    return (
        <>
        <Container fluid>
            <Row>
            <Col md="8">
                <Card>
                <Card.Header>
                    <Card.Title as="h4">Edit Shelter</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <label>Shelter</label>
                            <Form.Control
                            placeholder="Shelter name"
                            type="text"
                            required
                            value={this.state.name}
                            onChange={this.onChangeName}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                        <Form.Group>
                            <label htmlFor="exampleInputEmail1">
                            Email address
                            </label>
                            <Form.Control
                            placeholder="Email"
                            type="email"
                            required
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <label>Phone Number</label>
                            <Form.Control
                            placeholder="Phone number"
                            type="text"
                            required
                            value={this.state.phoneNumber}
                            onChange={this.onChangePhoneNumber}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                        <Form.Group>
                      <Form.Label>Select Picture</Form.Label>
                        <div>
                            <Image src={this.state.pictureUrl} fluid/>
                            <input type="file" name="picture" id="picture" onChange={this.onChangePicture} />
                        </div>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                        <Form.Group>
                            <label>Street Address</label>
                            <Form.Control
                            placeholder="Street Address"
                            type="text"
                            required
                            value={this.state.streetAddress}
                            onChange={this.onChangeStreetAddress}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="4">
                        <Form.Group>
                            <label>City</label>
                            <Form.Control
                            placeholder="City"
                            type="text"
                            required
                            value={this.state.city}
                            onChange={this.onChangeCity}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="px-1" md="4">
                        <Form.Group>
                            <label>Province</label>
                            <Form.Control
                            placeholder="Province"
                            type="text"
                            required
                            value={this.state.province}
                            onChange={this.onChangeProvince}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="pl-1" md="4">
                        <Form.Group>
                            <label>Postal Code</label>
                            <Form.Control
                            placeholder="Postal Code"
                            type="text"
                            required
                            value={this.state.postalCode}
                            onChange={this.onChangePostalCode}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                        <Form.Group>
                            <label>Shelter Description</label>
                            <Form.Control
                            cols="80"
                            placeholder="About shelter information.."
                            rows="4"
                            as="textarea"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                        <Form.Group>
                            <label>Is Shelter Available:</label>
                            <div className="radio">
                                <label>
                                    <input
                                    type="radio"
                                    value="Yes"
                                    checked={this.state.available === "Yes"}
                                    onChange={this.onChangeAvailable}
                                    />
                                    Yes
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input
                                    type="radio"
                                    value="No"
                                    checked={this.state.available === "No"}
                                    onChange={this.onChangeAvailable}
                                    />
                                    No
                                </label>
                            </div>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                    >
                        Update
                    </Button>
                    <div className="clearfix"></div>
                    </Form>
                </Card.Body>
                </Card>
            </Col>
            <Col md="4">
                <Card className="card-shelter">
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
        </>
    );
    }
}


//export default Shelter;*/
