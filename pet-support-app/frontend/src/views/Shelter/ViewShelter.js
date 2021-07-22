import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewShelter, deleteShelter } from '../../actions/ShelterActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { roles } from 'utils';
// styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/Shelter/viewShelterStyle"
// @material-ui/components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomBreadcrumbs from 'components/BreadCrumbs/BreadCrumbs'
import Typography  from '@material-ui/core/Typography';
import Image from 'material-ui-image'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Avatar from "@material-ui/core/Avatar"
import Divider from '@material-ui/core/Divider'
// @material-ui/icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
  SHELTER_DELETE_RESET,
} from '../../constants/ShelterConstants';

const emptyImg = require("assets/img/empty.jpeg").default
//const {alert} = require("../components/Notification/Notification");

const useStyles = makeStyles(styles);

export default function ViewShelter(props){
  const classes = useStyles();
  const shelterView = useSelector((state) => state.shelterView);
  const { loading, error, shelter, role, pictureUrls} = shelterView;

  const shelterDelete = useSelector((state) => state.shelterDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = shelterDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      //dispatch({ type: SHELTER_DELETE_RESET });
      setTimeout(function(){ 
        window.location = '/admin/dashboard';
      },2000);
    }
    else dispatch(viewShelter());
  }, [dispatch, successDelete]);

  const deleteHandler = () => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteShelter(shelter._id, shelter.pictures));
    }
  };

  return (
    <div>
      {loading ? (<LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox color="danger" message={error ? error : errorDelete} place={"tr"} ></MessageBox>
      ) : (
        <GridContainer>
          <GridItem xs={12} sm={8} md={8}>
            <CustomBreadcrumbs
              location={props.location}
              pageTitle={"View Shelter"}
            />
          </GridItem>
          {role == roles.Administrator? 
          <GridItem xs={12} sm={4} md={4}>
            <div className={classes.flexEnd}>
             <Button color="info" size="md" className={classes.featureButton}
                  href={"shelter/add"}
                  startIcon={<AddIcon/>}>
                    New
                  </Button>          
            
             <Button color="info" size="md" className={classes.featureButton}
                  href={"shelter/edit/"+shelter._id}
                  startIcon={<EditIcon/>}>
                    Edit
                  </Button>          
           
             <Button color="info" size="md" className={classes.featureButton}
             onClick={deleteHandler}
                  startIcon={<DeleteIcon/>}>
                    Delete
                  </Button>    
            </div>
        </GridItem> 
        : null}  
            <GridItem xs={12} sm={12} md={12}>
          {loadingDelete ? (<LoadingBox></LoadingBox>
                ) : errorDelete ? (
                    <MessageBox color="danger" message={errorDelete} place={"tr"} openDuration={4000} ></MessageBox>
                ) : successDelete ? (
                    <MessageBox color="success" message={successDelete} successMsg={true} place={"tr"}  openDuration={2000} ></MessageBox>
                  ):(
                    <div></div>
                )}
          </GridItem>
        <GridItem xs={12} sm={12} md={7}>
        <Card form>
           <CardHeader>
                <h4 className={classes.cardTitle}>Shelter Infomation</h4>
                <Divider light/>     
          </CardHeader>
          <CardBody compact>
          <GridContainer>
            <GridItem xs={12} sm={2} md={3} lg={3}>
            <Avatar className={classes.avatar} classes={{img: classes.avatarImage}} src={pictureUrls[0]} alt="..." />
            {/* <Image style={{marginRight: 25}}  className={classes.avatar} src={pictureUrls[0]}></Image> */}
            </GridItem>
            <GridItem xs={12} sm={10} md={9} lg={9}>
            <Typography className={classes.infoCardName}> {shelter.name}</Typography>
            <Typography className={classes.infoCardEmail}> {shelter.email}</Typography>
            <Divider className={classes.infoCardDivider} light/> 
            </GridItem>
            <GridItem xs={12} sm={2} md={3} lg={3}></GridItem>
            <GridItem xs={4} sm={3} md={3} lg={3}>
            <Typography className={classes.title}> Phone</Typography>
                <Typography className={classes.title}>Address</Typography>
                <Typography className={classes.title}>City </Typography>
                <Typography className={classes.title}>Province</Typography>
                <Typography className={classes.title}>Postal Code</Typography>
            </GridItem> 
            <GridItem xs={8} sm={7} md={6} lg={6}>
            <Typography className={classes.info}>{shelter.phoneNumber}</Typography>
            <Typography className={classes.info}>{shelter.streetAddress}</Typography>
            <Typography className={classes.info}>{shelter.city}</Typography>
            <Typography className={classes.info}>{shelter.province}</Typography>
            <Typography className={classes.info}>{shelter.postalCode}</Typography>           
          </GridItem>  
            </GridContainer>
            </CardBody>
      </Card>
      <Card form>
        <CardHeader>
                <h4 className={classes.cardTitle}>Description</h4>
                <Divider light/>     
          </CardHeader>
          <CardBody>
          <Typography className={classes.info}>{shelter.description? shelter.description: "There are no desciptions of the shelter at the moment"} </Typography>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={5}>
        <Card form>
        <CardHeader>
                <h4 className={classes.cardTitle}>Pictures</h4>
                <Divider light/>     
          </CardHeader>
          <CardBody>
              <GridList cellHeight={150} spacing={8} cols={2} >
                  {pictureUrls.map((pic, index) => (
                  <GridListTile key={index}>
                  <img className={classes.gridImage} src={pic} />
                  </GridListTile>
                  ))}
              </GridList>
          </CardBody>
        </Card>
      </GridItem>
      </GridContainer>
      )}
    </div>
  );
}

{/* <Card form>
           <CardHeader>
                <h4 className={classes.cardTitle}>Address</h4>
                <Divider light/>     
          </CardHeader>
          <CardBody>
            <GridContainer>
          <GridItem xs={4} sm={5} md={5} lg={5}>
              <Typography className={classes.title}>Address</Typography>
              <Typography className={classes.title}>City </Typography>
              <Typography className={classes.title}>Province</Typography>
              <Typography className={classes.title}>Postal Code</Typography>
              </GridItem>

              <GridItem xs={8} sm={7} md={7} lg={7}>
              <Typography className={classes.info}>{shelter.streetAddress}</Typography>
              <Typography className={classes.info}>{shelter.city}</Typography>
              <Typography className={classes.info}>{shelter.province}</Typography>
              <Typography className={classes.info}>{shelter.postalCode}</Typography>
            </GridItem> 
            </GridContainer>         
          </CardBody>
        </Card> */}
        {/* <Card form>
        <CardHeader>
                <h4 className={classes.cardTitle}>Description</h4>
                <Divider light/>     
          </CardHeader>
          <CardBody>
          <Typography className={classes.info}>{shelter.description? shelter.description: "There are no desciptions of the shelter"} </Typography>
          </CardBody>
        </Card> */}
{/* <Typography className={classes.title}>Address: <span className={classes.info}>{shelter.streetAddress}</span></Typography>
<Typography className={classes.title}>City: <span className={classes.info}>{shelter.city}</span></Typography>
<Typography className={classes.title}>Province: <span className={classes.info}>{shelter.province}</span></Typography>
<Typography className={classes.title}>Postal Code: <span className={classes.info}>{shelter.postalCode}</span></Typography> */}

// import React, { Component, useEffect, useState } from 'react';
// //import EditUser from "./edit-user.component.js";
// import { Link , Route} from 'react-router-dom';
// import axios from 'axios';
// import classes from '../../assets/css/shelterList.module.css'
// import { useDispatch, useSelector } from 'react-redux';
// import { viewShelter, deleteShelter } from '../../actions/ShelterActions';
// import LoadingBox from '../../components/LoadingBox';
// import MessageBox from '../../components/MessageBox';
// // import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// // import Notification from "../components/Notification/Notification";
// import {
//   Button,
//   Card,
//   Table,
//   Container,
//   Row,
//   Col,
//   ListGroup,
//   ListGroupItem,
//   Carousel,
//   Image
// } from "react-bootstrap";

// import {
//   SHELTER_DELETE_RESET,
// } from '../../constants/ShelterConstants';

// const emptyImg = require("../../assets/img/photo-1431578500526-4d9613015464.jpeg").default
// //const {alert} = require("../components/Notification/Notification");

// export default function ViewShelter(){
//   const shelterView = useSelector((state) => state.shelterView);
//   const { loading, error, shelter, role, pictureUrls} = shelterView;

//   const shelterDelete = useSelector((state) => state.shelterDelete);
//   const { loading: loadingDelete, error: errorDelete, success: successDelete} = shelterDelete;

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (successDelete) {
//       dispatch({ type: SHELTER_DELETE_RESET });
//     }
//     dispatch(viewShelter());
//   }, [dispatch, successDelete]);

//   const deleteHandler = (shelterId) => {
//     // alert("delete shelter")
//     if (window.confirm('Are you sure to delete?')) {
//       dispatch(deleteShelter(shelterId));
//     }
//   };

//   return (
//     <div>
//       {/* {loadingDelete && <LoadingBox></LoadingBox>}
//       {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>} */}
//       {loading ? (<LoadingBox></LoadingBox>
//       ) : error ? (
//         <MessageBox variant="danger">{error}</MessageBox>
//       ) : (
//        <Container fluid>
//           <Row>
//             <Col md="12">
//               <Card className="strpied-tabled-with-hover">
//                 <Card.Header>
//                 <Row>
//                     <Col md="4">
//                     <Card.Title as="h4">Shelter</Card.Title>
//                     </Col>
//                     {/* {!(shelter) && */}
//                     <Col md="7">
//                     <Link to={"shelter/add"} >
//                     <Button className="btn-fill float-right " variant="success">
//                         Create New 
//                     </Button>
//                 </Link>
//                     </Col>
//                     {/* } */}
//                 </Row>
//                 <Row>
//                     <Col md="4">
//                     <p className="card-category">
//                        List of shelters managed by the account
//                     </p>
//                     </Col>
//                 </Row>        
//                 </Card.Header>
//                 <Card.Body>
//                   <Row className="justify-content-center">
//                       <Col md="5" key={shelter._id}> 
//                         <Card className={classes.card}>
//                         {pictureUrls &&
//                         <Carousel>
//                          { pictureUrls.length == 0 ?
//                             <Carousel.Item>
//                             <Image
//                             className="d-block w-100"
//                             src={emptyImg}
//                             alt="First slide"
//                             fluid
//                             />
//                             <Carousel.Caption>
//                             </Carousel.Caption>
//                             </Carousel.Item>
//                          : pictureUrls.map((picSrc) => (
//                             <Carousel.Item>
//                                 <Image
//                                 className="d-block w-100"
//                                 src={picSrc !== "" ? picSrc : emptyImg}
//                                 alt="First slide"
//                                 fluid
//                                 />
//                                 <Carousel.Caption>
//                                 <h3>First slide label </h3>
//                                 <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//                                 </Carousel.Caption>
//                             </Carousel.Item>
//                             ))}
//                         </Carousel>
//                         }

//                           {/* {props.shelter.picture != null && */}
//                           {/* <Card.Img variant="top" src={shelter.picture !== null ? shelter.picture : emptyImg} className={classes.cardImageTop}/> */}

//                           <Card.Body >
//                             <Card.Title>{shelter.name}</Card.Title>
//                             <Card.Text>
//                               {shelter.description}
//                             </Card.Text>
//                           </Card.Body>
//                           <ListGroup className="list-group-flush">
//                             <ListGroupItem> {shelter.streetAddress +", "+ shelter.city + ", "+ shelter.province + "\n\n" + shelter.postalCode}</ListGroupItem>
//                             <ListGroupItem> {shelter.phoneNumber}</ListGroupItem>
//                             <ListGroupItem> {shelter.email}</ListGroupItem>
//                           </ListGroup>
//                           <Card.Body>
//                             <Card.Link href={"shelter/edit/"+shelter._id}>Edit</Card.Link>
//                             <Card.Link href="#" onClick={() => { deleteHandler(shelter._id)}}>Delete</Card.Link>
//                           </Card.Body>
//                         </Card>
//                         </Col> 
//                   </Row>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       )}
//     </div>
//   );

// }


