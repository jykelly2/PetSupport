import axios from 'axios';
import {bucketType} from '../utils'
import {
  SHELTER_VIEW_FAIL,
  SHELTER_VIEW_REQUEST,
  SHELTER_VIEW_SUCCESS,
  SHELTER_DETAILS_FAIL,
  SHELTER_DETAILS_REQUEST,
  SHELTER_DETAILS_SUCCESS,
  SHELTER_CREATE_FAIL,
  SHELTER_CREATE_REQUEST,
  SHELTER_CREATE_SUCCESS,
  SHELTER_LIST_REQUEST,
  SHELTER_LIST_SUCCESS,
  SHELTER_LIST_FAIL,
  SHELTER_DELETE_REQUEST,
  SHELTER_DELETE_SUCCESS,
  SHELTER_DELETE_FAIL,
  SHELTER_UPDATE_REQUEST,
  SHELTER_UPDATE_SUCCESS,
  SHELTER_UPDATE_FAIL,
} from '../constants/ShelterConstants';

const emptyImg = require("../assets/img/photo-1431578500526-4d9613015464.jpeg").default

export const createShelter = (shelter) => async (dispatch, getState) => {
  dispatch({ type: SHELTER_CREATE_REQUEST, payload: shelter });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    let formData = new FormData();
    formData.append("name",shelter.name)
    formData.append("description",shelter.description)
    formData.append("phoneNumber",shelter.phoneNumber)
    formData.append("email",shelter.email)
    formData.append("city",shelter.city)
    formData.append("province",shelter.province)
    formData.append("streetAddress",shelter.streetAddress)
    formData.append("postalCode",shelter.postalCode)
    formData.append("available",shelter.available)

    for(let i = 0; i< shelter.pictures.length; i++){
      formData.append("profile/", shelter.pictures[i])
    }

    const { data } = await axios.post('http://localhost:5000/shelters/add', formData ,  {
      headers:{"authorization": userInfo},
    });

    dispatch({ type: SHELTER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SHELTER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsShelter = (shelterId) => async (dispatch, getState) => {
  dispatch({ type: SHELTER_DETAILS_REQUEST, payload: shelterId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await  axios.get('http://localhost:5000/shelters/edit/'+ shelterId,  {
      headers:{"authorization": userInfo},
    });

    const imageRes = data.pictures ? await (await axios.post('http://localhost:5000/images/getImages', {pictures: data.pictures, bucket: bucketType.Shelter})).data : [];

    //const imageRes = data.pictures ? (await axios.post('http://localhost:5000/images/getImages', {pictures: data.pictures})).data : [];
     //const imageRes = data.pictures != "" || null ? await axios.get('http://localhost:5000/images/getImage/'+data.picture): "";
    // const pictureUrl = imageRes ? imageRes.config.url : emptyImg;

    //console.log(imageRes)
    dispatch({ type: SHELTER_DETAILS_SUCCESS, payload: {shelter:data, pictureUrls: imageRes}});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SHELTER_DETAILS_FAIL, payload: message });
  }
};

export const viewShelter = () => async (dispatch, getState) => {
  dispatch({ type: SHELTER_VIEW_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await  axios.get('http://localhost:5000/shelters/shelter', {
      headers:{"authorization": userInfo},
    });

   const imageRes = data.shelter.pictures ? await (await axios.post('http://localhost:5000/images/getImages', {pictures: data.shelter.pictures, bucket: bucketType.Shelter})).data : [];

  
    dispatch({ type: SHELTER_VIEW_SUCCESS, payload: {shelter: data.shelter, role: data.role, pictureUrls: imageRes}});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SHELTER_VIEW_FAIL, payload: message });
  }
};

export const updateShelter = (shelter) => async (dispatch, getState) => {
  dispatch({ type: SHELTER_UPDATE_REQUEST, payload: shelter });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
      let formData = new FormData();
      formData.append("name",shelter.name)
        formData.append("description",shelter.description)
        formData.append("phoneNumber",shelter.phoneNumber)
        formData.append("email",shelter.email)
        formData.append("city",shelter.city)
        formData.append("province",shelter.province)
        formData.append("streetAddress",shelter.streetAddress)
        formData.append("postalCode",shelter.postalCode)
        formData.append("available",shelter.available)
        for(let i = 0; i< shelter.pictures.length; i++){
          formData.append("profile/", shelter.pictures[i])
        }
        for(let i = 0; i< shelter.originalPictures.length; i++){
          formData.append("originalPictures", shelter.originalPictures[i])
        }
        
    const { data } = await axios.post('http://localhost:5000/shelters/update-shelter/' + shelter._id, formData,  {
      headers:{"authorization": userInfo},
    });

    dispatch({ type: SHELTER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SHELTER_UPDATE_FAIL, payload: message });
  }
};

export const listShelters = () => async (dispatch, getState) => {
    dispatch({ type: SHELTER_LIST_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await axios.get('http://localhost:5000/shelters/', {
        headers:{"authorization": userInfo},
      });
      for (var i in data.shelters) {
          const shelter = data.shelters[i]
        if (shelter.pictures != null){
           let imageRes = await axios.get('http://localhost:5000/images/getImage/'+shelter.picture)
            if (imageRes != null){
                let newState =  data.shelters
                newState[i].picture = imageRes.config.url
                data.shelters = newState
            }
        }
      }
      dispatch({ type: SHELTER_LIST_SUCCESS, payload: {shelters: data.shelters, role: data.role} });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SHELTER_LIST_FAIL, payload: message });
    }
  };

  export const deleteShelter = (shelterId, pictures) => async (dispatch, getState) => {
    dispatch({ type: SHELTER_DELETE_REQUEST, payload: shelterId, pictures });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.delete('http://localhost:5000/shelters/'+shelterId, {
        headers:{"authorization": userInfo},
        data: {
          pictures: pictures
        }
      });
      dispatch({ type: SHELTER_DELETE_SUCCESS, payload:data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SHELTER_DELETE_FAIL, payload: message });
    }
  };