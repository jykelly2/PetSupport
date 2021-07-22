import axios from 'axios';
import {bucketType} from '../utils'
import {
  USER_AUTHENTICATE_FAIL,
  USER_AUTHENTICATE_REQUEST,
  USER_AUTHENTICATE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_TOPSELLERS_LIST_REQUEST,
  USER_TOPSELLERS_LIST_SUCCESS,
  USER_TOPSELLERS_LIST_FAIL,
  USER_PICTURE_REQUEST ,
  USER_PICTURE_SUCCESS ,
  USER_PICTURE_FAIL,
} from '../constants/UserConstants';

const emptyImg = require("../assets/img/photo-1431578500526-4d9613015464.jpeg").default

export const createUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_CREATE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    let formData = new FormData();
    formData.append("firstname",user.firstname)
    formData.append("lastname",user.lastname)
    formData.append("password",user.password)
    formData.append("email",user.email)
    formData.append("role",user.role)
    formData.append("picture", user.picture[0])
   
    const { data } = await axios.post('http://localhost:5000/users/create', formData, {
      headers:{"authorization": userInfo},
    });
    dispatch({ type: USER_CREATE_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: USER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get('http://localhost:5000/users/edit/'+ userId,  {
      headers:{"authorization": userInfo},
    });
    const pictureUrl = data.picture != "" || null ? (await axios.post('http://localhost:5000/images/getImage/', {picture: data.picture, bucket: bucketType.Staff})).data: "";

    dispatch({ type: USER_DETAILS_SUCCESS, payload: {user:data, pictureUrl: pictureUrl}});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
      let formData = new FormData();
      formData.append("firstname",user.firstname)
      formData.append("lastname",user.lastname)
      formData.append("password",user.password)
      formData.append("email",user.email)
      formData.append("role",user.role)
      //formData.append("shelter", user.shelter)
      formData.append("picture", user.picture[0])
      formData.append("originalPicture", user.originalPicture)
      formData.append("passwordChanged",user.passwordChanged)

    if (user.profileUpdate)
        formData.append("profileUpdate",user.profileUpdate)
      
    const { data } = await axios.post('http://localhost:5000/users/update/' + user._id, formData, {
      headers:{"authorization": userInfo},
    });;

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data.successMsg});
 
    if (user.profileUpdate && data.token)
        window.sessionStorage.setItem('user', data.token)

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_FAIL, payload: message });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = axios.delete('http://localhost:5000/users/'+userId, {
      headers:{"authorization": userInfo},
    });
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DELETE_FAIL, payload: message });
  }
};

export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const authentication = {
            password: this.state.password,
            email: this.state.email,
          }
      const { data } = await axios.post('http://localhost:5000/users/login', authentication);
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      window.sessionStorage.setItem('user', data.token)
    } catch (error) {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const loginUser = (email, password) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
    try {
        const authentication = {
            password: password,
            email: email,
          }
      const { data } = await axios.post('http://localhost:5000/users/login', authentication);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      window.sessionStorage.setItem('user', data.token)
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const authenticateUser = () => async(dispatch, getState) => {
    console.log("authenticate user")
    dispatch({type: USER_AUTHENTICATE_REQUEST});
    const {
      userSignin: { userInfo },
    } = getState();
    try{
      const { data } = await axios.get('http://localhost:5000/users/authenticate', {
        headers:{"authorization": userInfo},
      });
      const pictureSrc = data.picture != "" || null ? (await axios.post('http://localhost:5000/images/getImage/', {picture: data.picture, bucket: bucketType.Staff})).data: "";

      dispatch({ type: USER_AUTHENTICATE_SUCCESS, payload: {user:data, pictureSrc: pictureSrc}});
    }catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_AUTHENTICATE_FAIL, payload: message });
    }
  }

export const listUsers = () => async (dispatch, getState) => {
    dispatch({ type: USER_LIST_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await  axios.get('http://localhost:5000/users/', {
        headers:{"authorization": userInfo},
      });
      dispatch({ type: USER_LIST_SUCCESS, payload: {users: data.users, role: data.role} });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_LIST_FAIL, payload: message });
    }
  };

  /*export const pictureUser = (pictureSrc) => async (dispatch, getState) => {
    dispatch({ type: USER_PICTURE_REQUEST, payload: pictureSrc});
    // const {
    //   userSignin: { userInfo },
    // } = getState();
    try {
      const { data } = await axios.get('http://localhost:5000/images/getImage/'+pictureSrc);

    const imageRes = data.picture != "" || null ? await axios.get('http://localhost:5000/images/getImage/'+data.picture): "";
     const pictureUrl = imageRes ? imageRes.config.url : emptyImg;

      dispatch({ type: USER_PICTURE_SUCCESS , payload: pictureUrl});
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_PICTURE_FAIL, payload: message });
    }
  };*/