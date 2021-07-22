import {
    ANIMAL_ADDRESS_MAP_CONFIRM,
    ANIMAL_DELETE_FAIL,
    ANIMAL_DELETE_REQUEST,
    ANIMAL_DELETE_RESET,
    ANIMAL_DELETE_SUCCESS,
    ANIMAL_DETAILS_FAIL,
    ANIMAL_DETAILS_REQUEST,
    ANIMAL_DETAILS_RESET,
    ANIMAL_DETAILS_SUCCESS,
    ANIMAL_LIST_FAIL,
    ANIMAL_LIST_REQUEST,
    ANIMAL_LIST_SUCCESS,   
    ANIMALS_AVAILABLE_REQUEST,
    ANIMALS_AVAILABLE_SUCCESS,
    ANIMALS_AVAILABLE_FAIL, 
    ANIMALS_SCHEDULED_REQUEST, 
    ANIMALS_SCHEDULED_SUCCESS, 
    ANIMALS_SCHEDULED_FAIL, 
    ANIMAL_CREATE_FAIL,
    ANIMAL_CREATE_REQUEST,
    ANIMAL_CREATE_SUCCESS,
    ANIMAL_UPDATE_FAIL,
    ANIMAL_UPDATE_REQUEST,
    ANIMAL_UPDATE_RESET,
    ANIMAL_UPDATE_SUCCESS,
  } from '../constants/AnimalConstants';

  export const animalCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ANIMAL_CREATE_REQUEST:
        return { loading: true };
      case ANIMAL_CREATE_SUCCESS:
        return { loading: false, success: action.payload };
      case ANIMAL_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const animalListReducer = (state = { loading: true, animals:[], role: "Staff" }, action) => {
    switch (action.type) {
      case ANIMAL_LIST_REQUEST:
        return { loading: true };
      case ANIMAL_LIST_SUCCESS:
        return { loading: false, animals: action.payload.animals, role: action.payload.role };
      case ANIMAL_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const animalsAvailableReducer = (state = { loading: true, animals:[], role: "Staff" }, action) => {
    switch (action.type) {
      case ANIMALS_AVAILABLE_REQUEST:
        return { loading: true };
      case ANIMALS_AVAILABLE_SUCCESS:
        return { loading: false, animals: action.payload.animals, role: action.payload.role };
      case ANIMALS_AVAILABLE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const animalsScheduledReducer = (state = { loading: true, animals:[], role: "Staff" }, action) => {
    switch (action.type) {
      case ANIMALS_SCHEDULED_REQUEST:
        return { loading: true };
      case ANIMALS_SCHEDULED_SUCCESS:
        return { loading: false, animals: action.payload.animals, role: action.payload.role };
      case ANIMALS_SCHEDULED_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const animalDetailsReducer = (state = { loading: true , animal:"", pictureUrls:[], role:"Staff"}, action) => {
    switch (action.type) {
      case ANIMAL_DETAILS_REQUEST:
        return { loading: true };
      case ANIMAL_DETAILS_SUCCESS:
        return { loading: false, animal: action.payload.animal, pictureUrls: action.payload.pictureUrls, role: action.payload.role };
      case ANIMAL_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      // case ANIMAL_DETAILS_RESET:
      //   return { loading: true };
      default:
        return state;
    }
  };

  export const animalUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case ANIMAL_UPDATE_REQUEST:
        return { loading: true };
      case ANIMAL_UPDATE_SUCCESS:
        return { loading: false, success: action.payload };
      case ANIMAL_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case ANIMAL_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const animalDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case ANIMAL_DELETE_REQUEST:
        return { loading: true };
      case ANIMAL_DELETE_SUCCESS:
        return { loading: false, success: action.payload, };
      case ANIMAL_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case ANIMAL_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };