import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAnimal } from '../../actions/AnimalActions';
import { roles } from '../../utils';
//animal form components
import {AnimalInfo} from '../../components/Animal/AnimalInfo'
import {AnimalDocuments} from '../../components/Animal/AnimalDocuments'
import AnimalReview from '../../components/Animal/AnimalReview'
import AnimalStepper from '../../components/Stepper/AnimalStepper' 
//@material/custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomBreadcrumbs from 'components/BreadCrumbs/BreadCrumbs'
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
//styles
import {makeStyles} from '@material-ui/core/styles';
import styles from "assets/jss/material-dashboard-react/views/Animals/createAnimalStyle"







  
  const generalInfoData = {
    name: "",
    description:"",
    animalType:"Dog",
    breed:"Akita",
    age:'',
    gender:"male",
    size:"Small (0-25 ibs)",
    pictures:[],
    profilePicture: [],
    personalities: [],
  }
  const documentData = {
    isNeuteured: 'false',
    isVaccinated: 'false',
    isPottyTrained: 'false',
    isLeashTrained: 'false',
  }
  
  const useStyles = makeStyles(styles);

  export default function CreateAnimal(props) {
    const classes = useStyles();

    const animalCreate = useSelector((state) => state.animalCreate);
    const { success, loading, error } = animalCreate;

    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);

    const [infoFormData, setInfoForm] = useState(generalInfoData);
    const [docFormData, setDocForm] = useState(documentData);


  useEffect(() => {
    if (success) {
      setTimeout(function(){ 
        window.location = '/admin/animals';
      }, 2000);
    }
  }, [dispatch, success]);
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const submitForm = () => {
      if (infoFormData && docFormData){
        const animal = {
          generalInfo: infoFormData,
          documents: docFormData,
        }
        dispatch(createAnimal(animal))
      }
    }
  
    const infoProps = {infoFormData, setInfoForm, handleBack, handleNext}
    const docProps = {docFormData, setDocForm, handleBack, handleNext}
    const reviewProps = {docFormData, infoFormData, handleBack, handleNext, submitForm}

    const getStepContent = (step) => {
        switch (step) {
          case 0:
            return <AnimalInfo {...infoProps} ></AnimalInfo>
          case 1:
            return <AnimalDocuments {...docProps}></AnimalDocuments>
          case 2:
            return <AnimalReview {...reviewProps}></AnimalReview>;
          default:
            return 'Unknown step';
        }
      }

    return (
      // <div className={classes.root}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <CustomBreadcrumbs
              location={props.location}
              plural={true}
              pageTitle={"Add New Animal"}
            />
          </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          {loading ? (<LoadingBox></LoadingBox>
                ) : error ? (
                  <MessageBox color="danger" message={error} place={"tr"}  openDuration={4000} ></MessageBox>
                ) : success ? (
                  <MessageBox color="success" message={success} successMsg={true} place={"tr"}  openDuration={2000} ></MessageBox>
                ):(
                  <div></div>
                )}
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
        <Card>
        <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Animal Information</h4>
            <p className={classes.cardCategoryWhite}>Complete the required steps</p>
        </CardHeader>
        <AnimalStepper activeStep={activeStep}/>
        
         <div className={classes.instructions}>{getStepContent(activeStep)}</div>
         </Card>
         </GridItem>
         </GridContainer>
    );
  }
   
//     const [firstname, setFirstName] = useState('');
//     const [lastname, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('Administrator');
//     const [picture, setPicture] = useState('');
//     const [pictureUrl, setPictureUrl] = useState('');
//     const [selectedShelters, setSelectedShelters] = useState([]);

//     const userCreate = useSelector((state) => state.userCreate);
//     const { success : successCreate, loading, error } = userCreate;

//     const shelterList = useSelector((state) => state.shelterList);
//     const {loading: loadingShelter, error: errorShelter, shelters , role: roleShelter} = shelterList;

//     const dispatch = useDispatch();

//     const submitHandler = (e) => {
//         e.preventDefault();
//          const user = {
//             firstname: firstname,
//             lastname: lastname,
//             password: password,
//             email: email,
//             role: role,
//             shelters: selectedShelters,
//             picture: picture,
//         }
//           dispatch(createUser(user));
//       };

//       useEffect(() => {
//         if (successCreate) {
//             window.location = '/admin/users';
//         }
//         // if (loadingShelter){
//         //     dispatch(listShelters());
//         // }
//         dispatch(listShelters());

//       }, [dispatch, successCreate]);

//       const onChangePicture = (pictureSrc) => {
//         if (pictureSrc.target.files && pictureSrc.target.files[0]) {
//             let img = pictureSrc.target.files[0];
//             setPicture(img)
//             setPictureUrl(window.URL.createObjectURL(img))
//         }
//       }

//       return (
//         <div>
//          {loadingShelter ? (<LoadingBox></LoadingBox>
//       ) : error ? (
//         <MessageBox variant="danger">{errorShelter}</MessageBox>
//       ) : (
//         <Container fluid>
//         <Row>
//         <Col md="8">
//             <Card>
//             <Card.Header>
//                 <Card.Title as="h4">Create New Account</Card.Title>
//             </Card.Header>
//             <Card.Body>
//                 <Form onSubmit={submitHandler}>
//                 {loading && <LoadingBox></LoadingBox>}
//                  {error && <MessageBox variant="danger">{error}</MessageBox>}
//                 <Row>
//                     <Col className="pr-1" md="6">
//                     <Form.Group>
//                         <label>Firstname</label>
//                         <Form.Control
//                         placeholder="first name"
//                         type="text"
//                         required
//                         onChange={(e) => setFirstName(e.target.value)}
//                         ></Form.Control>
//                     </Form.Group>
//                     </Col>
//                     <Col className="pl-1" md="6">
//                     <Form.Group>
//                         <label>Lastname</label>
//                         <Form.Control
//                         placeholder="last name"
//                         type="text"
//                         required
//                         onChange={(e) => setLastName(e.target.value)}
//                         ></Form.Control>
//                     </Form.Group>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col className="pr-1" md="6">
//                     <Form.Group>
//                         <label >Email address</label>
//                         <Form.Control
//                         placeholder="Email"
//                         type="email"
//                         required
//                         onChange={(e) => setEmail(e.target.value)}
//                         ></Form.Control>
//                     </Form.Group>
//                     </Col>
//                     <Col className="pl-1" md="6">
//                     <Form.Group>   
//                         <Form.Label>Password</Form.Label> 
//                         <Form.Control
//                         placeholder="password"
//                         type="password"
//                         required
//                         onChange={(e) => setPassword(e.target.value)}
//                         ></Form.Control>
//                     </Form.Group>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col className="pr-1" md="6">
//                     <Form.Group>
//                         <Form.Label>Select Role</Form.Label>
//                         <Form.Control as="select"  onChange={(e) => setRole(e.target.value)}>
//                         {Object.keys(roles).map((key) => 
//                             <option key={key} value={roles[key]}>{roles[key]}</option>
//                         )}
//                         </Form.Control>
//                     </Form.Group>
//                     </Col>

//                     <Col className="pl-1" md="6">
//                     <Form.Group >
//                         <Form.Label>Select Shelter</Form.Label>
//                         <Form.Control as="select" onChange={(e) => setSelectedShelters(e.target.value)}>
//                         {shelters.map((shelter) => (
//                             <option key={shelter._id} value={shelter._id}>{shelter.name}</option>
//                         ))}
//                         </Form.Control>
//                     </Form.Group>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col md="12">
//                     <Form.Group>
//                     <Form.Label>Select Picture</Form.Label>
//                     <div>
//                       <Image src={pictureUrl} fluid/>
//                       <input type="file" name="picture" id="picture" onChange={(pictureSrc) => onChangePicture(pictureSrc)} />
//                   </div>
//                     </Form.Group>
//                     </Col>
//                 </Row>
//                 <Button
//                     className="btn-fill pull-right"
//                     type="submit"
//                     variant="info"
//                 >
//                     Create
//                 </Button>
//                 <div className="clearfix"></div>
//                 </Form>
//             </Card.Body>
//             </Card>
//         </Col>
//         <Col md="4">
//             <Card className="card-user">
//             <div className="card-image">
//                 <img
//                 alt="..."
//                 src={
//                     require("../../assets/img/photo-1431578500526-4d9613015464.jpeg")
//                     .default
//                 }
//                 ></img>
//             </div>
//             <Card.Body>
//                 <div className="author">
//                 <a href="#pablo" onClick={(e) => e.preventDefault()}>
//                     <img
//                     alt="..."
//                     className="avatar border-gray"
//                     src={require("../../assets/img/faces/face-3.jpg").default}
//                     ></img>
//                     <h5 className="title">Mike Andrew</h5>
//                 </a>
//                 <p className="description">michael24</p>
//                 </div>
//                 <p className="description text-center">
//                 "Lamborghini Mercy <br></br>
//                 Your chick she so thirsty <br></br>
//                 I'm in that two seat Lambo"
//                 </p>
//             </Card.Body>
//             <hr></hr>
//             <div className="button-container mr-auto ml-auto">
//                 <Button
//                 className="btn-simple btn-icon"
//                 href="#pablo"
//                 onClick={(e) => e.preventDefault()}
//                 variant="link"
//                 >
//                 <i className="fab fa-facebook-square"></i>
//                 </Button>
//                 <Button
//                 className="btn-simple btn-icon"
//                 href="#pablo"
//                 onClick={(e) => e.preventDefault()}
//                 variant="link"
//                 >
//                 <i className="fab fa-twitter"></i>
//                 </Button>
//                 <Button
//                 className="btn-simple btn-icon"
//                 href="#pablo"
//                 onClick={(e) => e.preventDefault()}
//                 variant="link"
//                 >
//                 <i className="fab fa-google-plus-square"></i>
//                 </Button>
//             </div>
//             </Card>
//         </Col>
//         </Row>
//     </Container>)
//     }
//     </div>
//     )
// }
