import React from 'react';
import {bucketType} from '../../utils'
import CustomButton from "components/CustomButtons/Button"
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const linkStyle = {
  buttonMargin: {
    marginRight: "10px"
  },
  round: {
    borderRadius: "50%",
  },
};

const useStyles = makeStyles(linkStyle);

export default function Links (props) {
  const classes = useStyles();
  
  return (
    <div>
      {props.linkType === bucketType.Animal ?
       <CustomButton
        className={classes.buttonMargin}
         color="info"
        justIcon={true}
        round={true}
        size={"sm"}
        simple={true}
        href={"animal/view/"+props.value}
      >
          <VisibilityIcon/> 
    </CustomButton>
    :null}

    <CustomButton
         color="primary"
        justIcon={true}
        simple={true}
       // round={true}
        size={"sm"}
        href={props.linkType === bucketType.Staff ? "user/edit/"+props.value 
        : props.linkType === bucketType.Animal ? "animal/edit/"+props.value 
        : "booking/edit/"+props.value }
      >
          <EditIcon/> 
    </CustomButton>

    </div> 
  )

}

// const deleteUser= (userId) => {
  //   props.clicked(userId);
  // };  


    {/* <CustomButton
         color="info"
        justIcon={true}
        round={true}
        size={"sm"}
        simple={true}
        id="deleteBtn" 
        value={props.value} 
        onClick={() => { deleteUser(props.value)}}
      >
          <DeleteIcon/> 
    </CustomButton> */}

  {/* <a className="mr-5" href={"user/edit/"+props.value}>Edit</a>
    <a href={"#"} style={{color: 'red'}} id="deleteBtn" value={props.value} onClick={() => { deleteUser(props.value)}}>Delete</a></div> */}

//export default withRouter(Links);

  
/*export default class Links extends Component {
  render() {
   return <div><a href={"edit/"+this.props.value}>Edit</a>
          <a href={"#"} id="deleteBtn" value={this.props.value} onClick={() => { this.props.deleteHandler(this.props.value)}}>Delete</a></div>
    // return <button
    //                 type="button"
    //                 className="small"
    //                 onClick={() => this.props.history.push('/edit/'+this.props.value)}
    //               >
    //                 Edit
    //               </button>
      //<a href={"edit/"+this.props.value}>Edit</a>//<span>{new Array(this.props.value).fill('#').join('')}</span>;
  }
}*/