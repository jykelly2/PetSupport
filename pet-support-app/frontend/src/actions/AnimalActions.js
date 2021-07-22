import axios from 'axios';
import {bucketType} from '../utils'
import {
  ANIMAL_DETAILS_FAIL,
  ANIMAL_DETAILS_REQUEST,
  ANIMAL_DETAILS_SUCCESS,
  ANIMAL_CREATE_FAIL,
  ANIMAL_CREATE_REQUEST,
  ANIMAL_CREATE_SUCCESS,
  ANIMAL_LIST_REQUEST,
  ANIMAL_LIST_SUCCESS,
  ANIMAL_LIST_FAIL,
  ANIMALS_AVAILABLE_REQUEST,
  ANIMALS_AVAILABLE_SUCCESS,
  ANIMALS_AVAILABLE_FAIL, 
  ANIMALS_SCHEDULED_REQUEST, 
  ANIMALS_SCHEDULED_SUCCESS, 
  ANIMALS_SCHEDULED_FAIL, 
  ANIMAL_DELETE_REQUEST,
  ANIMAL_DELETE_SUCCESS,
  ANIMAL_DELETE_FAIL,
  ANIMAL_UPDATE_REQUEST,
  ANIMAL_UPDATE_SUCCESS,
  ANIMAL_UPDATE_FAIL,
} from '../constants/AnimalConstants';

export const createAnimal = (animal) => async (dispatch, getState) => {
    dispatch({ type: ANIMAL_CREATE_REQUEST, payload: animal });
    const {
      userSignin: { userInfo },
    } = getState();
    try {

      let formData = new FormData();
      formData.append("name",animal.generalInfo.name)
      formData.append("description", animal.generalInfo.description)
      formData.append("animalType",animal.generalInfo.animalType)
      formData.append("breed",animal.generalInfo.breed)
      formData.append("age",animal.generalInfo.age)
      formData.append("gender",animal.generalInfo.gender)
      formData.append("size",animal.generalInfo.size)
      formData.append("profile-image/", animal.generalInfo.profilePicture[0])
      
      for(let i = 0; i< animal.generalInfo.pictures.length; i++){
        formData.append("animal-pictures/", animal.generalInfo.pictures[i])
      }
      for(let i = 0; i< animal.generalInfo.personalities.length; i++){
        formData.append("personalities",animal.generalInfo.personalities[i])
      }

      formData.append("isNeuteured",animal.documents.isNeuteured)
      formData.append("isVaccinated",animal.documents.isVaccinated)
      formData.append("isPottyTrained",animal.documents.isPottyTrained)
      formData.append("isLeashTrained",animal.documents.isLeashTrained)

      const { data } = await axios.post('http://localhost:5000/animals/add', formData ,  {
        headers:{"authorization": userInfo},
      });
       dispatch({ type: ANIMAL_CREATE_SUCCESS, payload:data });
    } catch (error) {
      dispatch({
        type: ANIMAL_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const listAnimals = () => async (dispatch, getState) => {
    dispatch({ type: ANIMAL_LIST_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await  axios.get('http://localhost:5000/animals/', {
        headers:{"authorization": userInfo},
      });
      dispatch({ type: ANIMAL_LIST_SUCCESS, payload: {animals: data.animals, role: data.role} });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ANIMAL_LIST_FAIL, payload: message });
    }
  };

  export const listAvailableAnimals = () => async (dispatch, getState) => {
    dispatch({ type: ANIMALS_AVAILABLE_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await  axios.get('http://localhost:5000/animals/filter', {
        headers:{ "authorization": userInfo},
        params:{filter: "available"},
      });
      dispatch({ type: ANIMALS_AVAILABLE_SUCCESS, payload: {animals: data.animals, role: data.role} });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ANIMALS_AVAILABLE_FAIL, payload: message });
    }
  };

  export const listScheduledAnimals = () => async (dispatch, getState) => {
    dispatch({ type: ANIMALS_SCHEDULED_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await  axios.get('http://localhost:5000/animals/filter', {
        headers:{"authorization": userInfo},
        params:{filter: "scheduled"},
      });
      dispatch({ type: ANIMALS_SCHEDULED_SUCCESS, payload: {animals: data.animals, role: data.role} });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ANIMALS_SCHEDULED_FAIL, payload: message });
    }
  };

  export const detailsAnimal = (animalId) => async (dispatch, getState) => {
    dispatch({ type: ANIMAL_DETAILS_REQUEST, payload: animalId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await  axios.get('http://localhost:5000/animals/edit/'+ animalId,  {
        headers:{"authorization": userInfo},
      });
  
     const imageRes = data.animal.pictures ? await (await axios.post('http://localhost:5000/images/getImages', {pictures: data.animal.pictures, bucket: bucketType.Animal})).data : [];  
      dispatch({ type: ANIMAL_DETAILS_SUCCESS, payload: {animal:data.animal, pictureUrls: imageRes, role: data.role}});
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ANIMAL_DETAILS_FAIL, payload: message });
    }
  };

  export const updateAnimal = (animal) => async (dispatch, getState) => {
    dispatch({ type: ANIMAL_UPDATE_REQUEST, payload: animal });
    const {
      userSignin: { userInfo },
    } = getState();
    try {

        let formData = new FormData();
        formData.append("name",animal.generalInfo.name)
        formData.append("description", animal.generalInfo.description)
        formData.append("animalType",animal.generalInfo.animalType)
        formData.append("breed",animal.generalInfo.breed)
        formData.append("age",animal.generalInfo.age)
        formData.append("gender",animal.generalInfo.gender)
        formData.append("size",animal.generalInfo.size)
        formData.append("profile-image/", animal.generalInfo.profilePicture[0])
        
        for(let i = 0; i< animal.generalInfo.pictures.length; i++){
          formData.append("animal-pictures/", animal.generalInfo.pictures[i])
        }
        for(let i = 0; i< animal.generalInfo.personalities.length; i++){
          formData.append("personalities",animal.generalInfo.personalities[i])
        }

        for(let i = 0; i< animal.generalInfo.originalPictures.length; i++){
          formData.append("originalPictures", animal.generalInfo.originalPictures[i])
        }

        formData.append("isNeuteured",animal.documents.isNeuteured)
        formData.append("isVaccinated",animal.documents.isVaccinated)
        formData.append("isPottyTrained",animal.documents.isPottyTrained)
        formData.append("isLeashTrained",animal.documents.isLeashTrained)
     
      const { data } = await axios.post('http://localhost:5000/animals/update/' + animal.generalInfo.id, formData,  {
        headers:{"authorization": userInfo},
      });
  
      dispatch({ type: ANIMAL_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ANIMAL_UPDATE_FAIL, payload: message });
    }
  };

  export const deleteAnimal = (animalId, pictures) => async (dispatch, getState) => {
    dispatch({ type: ANIMAL_DELETE_REQUEST, payload: animalId, pictures});
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.delete('http://localhost:5000/animals/'+animalId, {
        headers: {
          'authorization': userInfo
        },
        data: {
          pictures: pictures
        }
      });

      dispatch({ type: ANIMAL_DELETE_SUCCESS, payload: data});
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ANIMAL_DELETE_FAIL, payload: message });
    }
  };