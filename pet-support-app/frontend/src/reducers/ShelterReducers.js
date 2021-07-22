import {
    SHELTER_ADDRESS_MAP_CONFIRM,
    SHELTER_DELETE_FAIL,
    SHELTER_DELETE_REQUEST,
    SHELTER_DELETE_RESET,
    SHELTER_DELETE_SUCCESS,
    SHELTER_DETAILS_FAIL,
    SHELTER_DETAILS_REQUEST,
    SHELTER_DETAILS_RESET,
    SHELTER_DETAILS_SUCCESS,
    SHELTER_LIST_FAIL,
    SHELTER_LIST_REQUEST,
    SHELTER_LIST_SUCCESS,
    SHELTER_VIEW_FAIL,
    SHELTER_VIEW_REQUEST,
    SHELTER_VIEW_SUCCESS,
    SHELTER_CREATE_FAIL,
    SHELTER_CREATE_REQUEST,
    SHELTER_CREATE_SUCCESS,
    SHELTER_UPDATE_FAIL,
    SHELTER_UPDATE_REQUEST,
    SHELTER_UPDATE_RESET,
    SHELTER_UPDATE_SUCCESS,
  } from '../constants/ShelterConstants';

  export const shelterCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case SHELTER_CREATE_REQUEST:
        return { loading: true };
      case SHELTER_CREATE_SUCCESS:
        return { loading: false, success: action.payload };
      case SHELTER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const shelterDetailsReducer = (state = { loading: true ,shelter:"", pictureUrls:[]}, action) => {
    switch (action.type) {
      case SHELTER_DETAILS_REQUEST:
        return { loading: true };
      case SHELTER_DETAILS_SUCCESS:
        return { loading: false, shelter: action.payload.shelter, pictureUrls: action.payload.pictureUrls };
      case SHELTER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      // case SHELTER_DETAILS_RESET:
      //   return { loading: true };
      default:
        return state;
    }
  };

  export const shelterViewReducer = (state = { loading: true ,shelter:"", pictureUrls:[],role: "Staff"}, action) => {
    switch (action.type) {
      case SHELTER_VIEW_REQUEST:
        return { loading: true };
      case SHELTER_VIEW_SUCCESS:
        return { loading: false, shelter: action.payload.shelter, pictureUrls: action.payload.pictureUrls, role: action.payload.role };
      case SHELTER_VIEW_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const shelterUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case SHELTER_UPDATE_REQUEST:
        return { loading: true };
      case SHELTER_UPDATE_SUCCESS:
        return { loading: false, success: action.payload };
      case SHELTER_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case SHELTER_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const shelterListReducer = (state = { loading: true, shelters:[], role: "Staff" }, action) => {
      switch (action.type) {
        case SHELTER_LIST_REQUEST:
          return { loading: true };
        case SHELTER_LIST_SUCCESS:
          return { loading: false, shelters: action.payload.shelters, role: action.payload.role };
        case SHELTER_LIST_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
    };

    export const shelterDeleteReducer = (state = {}, action) => {
        switch (action.type) {
          case SHELTER_DELETE_REQUEST:
            return { loading: true };
          case SHELTER_DELETE_SUCCESS:
            return { loading: false, success: action.payload};
          case SHELTER_DELETE_FAIL:
            return { loading: false, error: action.payload };
          case SHELTER_DELETE_RESET:
            return {};
          default:
            return state;
        }
      };