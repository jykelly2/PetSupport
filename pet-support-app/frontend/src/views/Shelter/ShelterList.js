import React, { Component, useEffect, useState } from 'react';
//import EditUser from "./edit-user.component.js";
import { Link , Route} from 'react-router-dom';
import axios from 'axios';
import classes from '../../assets/css/shelterList.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { listShelters, deleteShelter } from '../../actions/ShelterActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import Notification from "../components/Notification/Notification";
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import {
  SHELTER_DELETE_RESET,
} from '../../constants/ShelterConstants';

const emptyImg = require("assets/img/empty.jpeg").default

export default function SheltersList(){
  const shelterList = useSelector((state) => state.shelterList);
  const { loading, error, shelters, role} = shelterList;

  const shelterDelete = useSelector((state) => state.shelterDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = shelterDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: SHELTER_DELETE_RESET });
    }
    dispatch(listShelters());
  }, [dispatch, successDelete]);

  const deleteHandler = (shelterId) => {
    // alert("delete shelter")
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteShelter(shelterId));
    }
  };

  return (
    <div>
      {/* {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>} */}
      {loading ? (<LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
       <Container fluid>
          <Row>
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                <Row>
                    <Col md="4">
                    <Card.Title as="h4">Shelter List</Card.Title>
                    </Col>
                    {role == "Administrator" &&
                    <Col md="7">
                    <Link to={"add"} >
                    <Button className="btn-fill float-right " variant="success">
                        Create New 
                    </Button>
                </Link>
                    </Col>
                    }
                </Row>
                <Row>
                    <Col md="4">
                    <p className="card-category">
                       List of shelters managed by the account
                    </p>
                    </Col>
                </Row>        
                </Card.Header>
                <Card.Body>
                  <Row className="justify-content-center">
                      { shelters.map((shelter) => (<Col md="5" key={shelter._id}> 
                        <Card className={classes.card}>
                          {/* {props.shelter.picture != null && */}
                          <Card.Img variant="top" src={shelter.picture !== null ? shelter.picture : emptyImg} className={classes.cardImageTop}/>

                          <Card.Body >
                            <Card.Title>{shelter.name}</Card.Title>
                            <Card.Text>
                              {shelter.description}
                            </Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroupItem> {shelter.streetAddress +", "+ shelter.city + ", "+ shelter.province + "\n\n" + shelter.postalCode}</ListGroupItem>
                            <ListGroupItem> {shelter.phoneNumber}</ListGroupItem>
                            <ListGroupItem> {shelter.email}</ListGroupItem>
                          </ListGroup>
                          <Card.Body>
                            <Card.Link href={"edit-shelter/"+shelter._id}>Edit</Card.Link>
                            <Card.Link href="#" onClick={() => { deleteHandler(shelter._id)}}>Delete</Card.Link>
                          </Card.Body>
                        </Card>
                        </Col> 
                      ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );

}


/*
const Shelter = props => (
  <Col md="5"> 
  <Card className={classes.card}>
    <Card.Img variant="top" src={props.shelter.picture !== null ? props.shelter.picture : emptyImg} className={classes.cardImageTop}/>

    <Card.Body >
      <Card.Title>{props.shelter.name}</Card.Title>
      <Card.Text>
        {props.shelter.description}
      </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem> {props.shelter.streetAddress +", "+ props.shelter.city + ", "+ props.shelter.province + "\n\n" + props.shelter.postalCode}</ListGroupItem>
      <ListGroupItem> {props.shelter.phoneNumber}</ListGroupItem>
      <ListGroupItem> {props.shelter.email}</ListGroupItem>
    </ListGroup>
    <Card.Body>
      <Card.Link href={"edit-shelter/"+props.shelter._id}>Edit</Card.Link>
      <Card.Link href="#" onClick={() => { props.deleteShelter(props.shelter._id)}}>Delete</Card.Link>
    </Card.Body>
  </Card>
  </Col>
);
export default class ShelterList extends Component {
    constructor(props){
        super(props);
        this.deleteShelter = this.deleteShelter.bind(this)
        this.getShelterPicture = this.getShelterPicture.bind(this)
        this.state = {shelters: [], role:"",};
    }
  
    componentDidMount(){
      const token = sessionStorage.getItem('user');
        axios.get('http://localhost:5000/shelters/',{
          headers:{"authorization": token},
        })
        .then (response =>{
            this.setState({
              shelters: response.data.shelters, 
              role: response.data.role
            })
           
            for (var i in this.state.shelters) {
              const shelter = this.state.shelters[i]
              if (shelter.picture != null){
                this.getShelterPicture(i, shelter.picture)
              }
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteShelter(id) {
        axios.delete('http://localhost:5000/shelters/'+id)
          .then(response => { console.log(response.data)});
        this.setState({
          shelters: this.state.shelters.filter(s => s._id !== id)
        })
    }

    getShelterPicture(index, picture){
      axios.get('http://localhost:5000/images/getImage/'+picture)
      .then(response => {
        if (response != null){
          let newState =  this.state.shelters
          newState[index].picture = response.config.url
          this.setState({
            shelters: newState
          })
        }
      })
    }

    shelterList() {
        return this.state.shelters.map(currentshelter => {
          return <Shelter shelter={currentshelter} deleteShelter={this.deleteShelter} key={currentshelter._id}/>;
        })
    }

    render() {
        return (        
          <Container fluid>
          <Row>
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                <Row>
                    <Col md="4">
                    <Card.Title as="h4">Shelter List</Card.Title>
                    </Col>
                    {this.state.role == "Schedule Manager" &&
                    <Col md="7">
                    <Link to={"add"} >
                    <Button className="btn-fill float-right " variant="success">
                        Create New 
                    </Button>
                </Link>
                    </Col>
                    }
                </Row>
                <Row>
                    <Col md="4">
                    <p className="card-category">
                       List of shelters managed by the account
                    </p>
                    </Col>
                </Row>        
                </Card.Header>
                <Card.Body>
                  <Row className="justify-content-center">
                      { this.shelterList() }
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        )
    }
}*/
