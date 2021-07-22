import React, {useState, useEffect} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import EditUser from './EditUser'
import Profile from '../../components/Profile'
import { authenticateUser, updateUser, pictureUser} from '../../actions/UserActions';
import { roles } from '../../utils';
import MessageBox from '../../components/MessageBox';
import LoadingBox from '../../components/LoadingBox';
import {withRouter} from 'react-router';
import { useHistory } from "react-router-dom";
import { listShelters } from '../../actions/ShelterActions';
import { USER_UPDATE_RESET } from '../../constants/UserConstants';

export default function UserProfile(props) {
  const userAuthenticate = useSelector((state) => state.userAuthenticate);
  const { success, loading, user, error } = userAuthenticate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user){
      dispatch(authenticateUser())
    }
  },[dispatch, user]);

  return (
    <div>
    {loading ? (<LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox color="danger" message={error} place={"tr"}  openDuration={4000} ></MessageBox>
      ) : (
        <Profile id={user.id} role={user.role} location={props.location}></Profile>
      )
      }
      </div>
  )
}

/*export default function UserProfile() {
  const userAuthenticate = useSelector((state) => state.userAuthenticate);
  const { success, loading, user, error } = userAuthenticate;

  const userPicture = useSelector((state) => state.userPicture);
  const { success: pictureSuccess, loading:pictureLoading, pictureUrl: pic, error:pictureError } = userPicture;

console.log('profile')
  
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [originalPassword, setOriginalPassword] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [picture, setPicture] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [selectedShelters, setSelectedShelters] = useState('');

  const shelterList = useSelector((state) => state.shelterList);
  const {loading: loadingShelter, shelters , role: roleShelter} = shelterList;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;
  const dispatch = useDispatch();

  useEffect(() => {
    // if (loading){
    //   dispatch(authenticateUser())
    //  }else{
    //    console.log(user)
    //  }

     if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      window.location = '/admin/user-profile';
    }

    if (!user) {
      dispatch(authenticateUser())
      //if (!isProfile || userRole === roles.Administrator) dispatch(listShelters());
    } else {
      console.log(user)
      setFirstName(user.firstname);
      setLastName(user.lastname);
      setEmail(user.email);
      setOriginalPassword(user.password)
      setPassword(user.password)
      setRole(user.role)
      setSelectedShelters(user.shelters[0])
      setPicture(user.picture)

      console.log(user.picture)
      if (user.picture != ""){
        dispatch(pictureUser(user.picture))
      }

      if (pic){
        setPictureUrl(pic)
      }
      //setPictureUrl(savedPicUrl)
      dispatch(listShelters())

    }
  }, [dispatch, successUpdate, user]);

   
  const onChangePicture = (pictureSrc) => {
    if (pictureSrc.target.files && pictureSrc.target.files[0]) {
        let img = pictureSrc.target.files[0];
        setPicture(img)
        setPictureUrl(window.URL.createObjectURL(img))
    }
  }

const submitHandler = (e) => {
  e.preventDefault();
  const editedUser = {
    _id: user.id,
    firstname: firstname,
    lastname: lastname,
    password: password,
    email: email,
    role: role,
    shelters: selectedShelters,
    picture: picture,
    passwordChanged: originalPassword == password ? false : true,
}
    dispatch(updateUser(editedUser));
};

  return (
    <div>
    {loading ? (<LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
      
        // <LoadingBox></LoadingBox>
        // <EditUser id={user.id} isProfile={true} role={user.role}></EditUser>
        <Container fluid>
            <Row>
            <Col md="8">
                <Card>
                <Card.Header>
                    <Card.Title as="h4">User Profile</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <label>Firstname</label>
                            <Form.Control
                            placeholder="first name"
                            type="text"
                            required
                            value={firstname}
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
                            value={lastname}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                        <Form.Group>   
                            <Form.Label>New Password (Optional)</Form.Label> 
                            <Form.Control
                            placeholder="new password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    {role === roles.Administrator ? 
                    <Row>
                        <Col className="pr-1" md="6">
                        <Form.Group>
                            <Form.Label>Select Role</Form.Label>
                            <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                            {Object.keys(roles).map((key) => 
                            <option key={key} value={roles[key]}>{roles[key]}</option>
                            )}
                            </Form.Control>
                        </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                    <Form.Group >
                        <Form.Label>Select Shelter</Form.Label>
                        <Form.Control as="select" value={selectedShelters}  onChange={(e) => setSelectedShelters(e.target.value)}>
                        {loadingShelter ? "" :
                        shelters.map((shelter) => (
                            <option key={shelter._id} value={shelter._id}>{shelter.name}</option>
                        ))
                        }
                                              
                        </Form.Control>
                    </Form.Group>
                    </Col>
                    </Row> : <div></div> 
                    }
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
                        Update
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
                        require("../assets/img/photo-1431578500526-4d9613015464.jpeg")
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
                        src={require("../assets/img/faces/face-3.jpg").default}
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
      };
      </div>
  );
  }
  
//export default withRouter(UserProfile);*/
