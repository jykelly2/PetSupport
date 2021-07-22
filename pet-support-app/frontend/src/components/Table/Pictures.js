import React, { Component } from 'react';
import axios from 'axios';
import {
    Image
} from "react-bootstrap";

const emptyImg = require("assets/img/empty.jpeg").default

export default class Pictures extends Component {
  constructor(props){
    super(props);
    this.getUserPicture = this.getUserPicture.bind(this)

    this.state = {
      pictureUrl: null,
    }
  }

  componentDidMount(){
  const picture = this.props.value
   if (picture){
    this.getUserPicture(picture)
   }else{
    this.setState({
      pictureUrl: emptyImg
    })
   }
  }

  getUserPicture(picture){
    if (picture){
    axios.get('http://localhost:5000/images/getImage/'+picture)
    .then(response => {
      if (response != null){
        this.setState({
          pictureUrl: response.config.url
        })
      }
      else{
        this.setState({
          pictureUrl: emptyImg
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }
  }

  render() {
     return <Image src={this.state.pictureUrl} style={{height: "4.5rem", width:"4.5rem"}} roundedCircle />
  }
}