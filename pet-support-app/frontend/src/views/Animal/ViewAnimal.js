import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsAnimal, deleteAnimal} from '../../actions/AnimalActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { roles } from 'utils';
//styles
import { makeStyles } from '@material-ui/core/styles';
import styles from "assets/jss/material-dashboard-react/views/Animals/viewAnimalStyle"
// @material-ui/components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomBreadcrumbs from 'components/BreadCrumbs/BreadCrumbs'
import Typography  from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from "@material-ui/core/Avatar"
import Divider from '@material-ui/core/Divider'
// @material-ui/icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const emptyImg = require("assets/img/empty.jpeg").default

const useStyles = makeStyles(styles);
export default function ViewAnimal(props){
  const animalId = props.match.params.id;
  const classes = useStyles();
  const animalDetails = useSelector((state) => state.animalDetails);
  const { loading, error, animal,  pictureUrls, role} = animalDetails;
  const animalDelete = useSelector((state) => state.animalDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = animalDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      setTimeout(function(){ 
       window.location = '/admin/animals';
      },2000);
    }
    if (!animal) {
        dispatch(detailsAnimal(animalId));
    }
  }, [dispatch, animal, animalId, successDelete]);

  const deleteHandler = () => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteAnimal(animalId, animal.pictures));
    }
  };

  return (
    <div>
      {loading || loadingDelete ? (<LoadingBox></LoadingBox>
      ) : error || errorDelete ? (
        <MessageBox color="danger" message={error ? error : errorDelete} place={"tr"} ></MessageBox>
      ) : (
        <GridContainer>
        <GridItem xs={12} sm={8} md={8}>
          <CustomBreadcrumbs
            location={props.location}
            edit={true}
            plural={true}
            pageTitle={"View Animal"}
          />
        </GridItem>
        {role == roles.Administrator? 
          <GridItem xs={12} sm={4} md={4}>
            <div className={classes.flexEnd}>          
             <Button color="info" size="md" className={classes.featureButton}
                  href={"/admin/animal/edit/" + animalId}
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
                <h4 className={classes.cardTitle}>Animal Infomation</h4>
                <Divider light/>     
          </CardHeader>
          <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={3} md={2} lg={3}>
            <Avatar className={classes.avatar}  classes={{img: classes.avatarImage}} src={pictureUrls[0]} alt="..." />
            {/* <Image style={{marginRight: 25}}  className={classes.avatar} src={pictureUrls[0]}></Image> */}
            </GridItem>
           <GridItem xs={4} sm={3} md={4} lg={3}>
              <Typography className={classes.title}> Name</Typography>
              <Typography className={classes.title}>Type</Typography>
              <Typography className={classes.title}>Breed</Typography>
              <Typography className={classes.title}> Gender</Typography>
              <Typography className={classes.title}> Age</Typography>
              <Typography className={classes.title}>Size</Typography>
              <Typography className={classes.title}>Personalities</Typography>
           </GridItem> 
           <GridItem xs={8} sm={6} md={6} lg={6}>
              <Typography className={classes.info}>{animal.name}</Typography>
              <Typography className={classes.info}>{animal.animalType}</Typography>
              <Typography className={classes.info}>{animal.breed}</Typography>
              <Typography className={classes.info}>{animal.gender}</Typography>
              <Typography className={classes.info}>{animal.age? animal.age : 0}</Typography>
              <Typography className={classes.info}>{animal.size}</Typography>
              <div className={classes.info}>{animal.personalities.length ? animal.personalities.map((item, i) => {
                    return (
                       <Chip className={classes.chip} key={i} label={item}></Chip>
                        );
                      }) : "N/A"} </div>
            </GridItem>  
            </GridContainer>
            </CardBody>
      </Card>
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
      <GridItem xs={12} sm={12} md={5}>
      <Card form>
           <CardHeader>
                <h4 className={classes.cardTitle}>Documents</h4>
                <Divider light/>     
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={4} sm={5} md={7} lg={5}>
                  <Typography className={classes.title}> Is Neuteured</Typography>
                  <Typography className={classes.title}> Is Vaccinated</Typography>
                  <Typography className={classes.title}> Is Potty Trained</Typography>
                  <Typography className={classes.title}> Is Leash Trained</Typography>
              </GridItem>

              <GridItem xs={8} sm={7} md={5} lg={7}>
              <Typography className={classes.info}>{animal.isNeuteured ? "Yes" : "No"}</Typography>
                  <Typography className={classes.info}>{animal.isVaccinated ? "Yes" : "No"}</Typography>
                  <Typography className={classes.info}>{animal.isPottyTrained ? "Yes" : "No"}</Typography>
                  <Typography className={classes.info}>{animal.isLeashTrained ? "Yes" : "No"}</Typography>
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
          <Typography className={classes.info}>{animal.description? animal.description: "There are no desciptions of this animal"} </Typography>
          </CardBody>
        </Card>
      </GridItem>  
      </GridContainer>
      )}
    </div>
  );

}

// <Container fluid>
// <Row>
//   <Col md="12">
//     <Card className="strpied-tabled-with-hover">
//       <Card.Header>
//       <Row>
//           <Col md="4">
//           <Card.Title as="h4">Animal</Card.Title>
//           </Col>
//       </Row>
//       <Row>
//           <Col md="4">
//           <p className="card-category">
//              {name} {description}
//           </p>
//           </Col>
//       </Row>        
//       </Card.Header>
//       <Card.Body>
//         <Row className="justify-content-center">
//             <Col md="5"  > 
//               <Card className={classes.card}>
//               {pictureUrls &&
//               <Carousel>
//                { pictureUrls.length == 0 ?
//                   <Carousel.Item>
//                   <Image
//                   className="d-block w-100"
//                   src={emptyImg}
//                   alt="First slide"
//                   fluid
//                   />
//                   <Carousel.Caption>
//                   </Carousel.Caption>
//                   </Carousel.Item>
//                : pictureUrls.map((picSrc) => (
//                   <Carousel.Item >
//                       <Image
//                       className="d-block w-100"
//                       src={picSrc !== "" ? picSrc : emptyImg}
//                       alt="First slide"
//                       fluid
//                       />
//                       <Carousel.Caption>
//                       <h3>First slide label </h3>
//                       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//                       </Carousel.Caption>
//                   </Carousel.Item>
//                   ))}
//               </Carousel>
//               }

//                 <Card.Body >
//                   <Card.Title>{name}</Card.Title>
//                   <Card.Text>
//                     {description}
//                   </Card.Text>
//                 </Card.Body>
//                 <Card.Body>

//                 </Card.Body>
//               </Card>
//               </Col> 
//         </Row>
//       </Card.Body>
//     </Card>
//   </Col>
// </Row>
// </Container>
