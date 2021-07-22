import {
    CLIENT_ADDRESS_MAP_CONFIRM,
    CLIENT_DELETE_FAIL,
    CLIENT_DELETE_REQUEST,
    CLIENT_DELETE_RESET,
    CLIENT_DELETE_SUCCESS,
    CLIENT_DETAILS_FAIL,
    CLIENT_DETAILS_REQUEST,
    CLIENT_DETAILS_RESET,
    CLIENT_DETAILS_SUCCESS,
    CLIENT_LIST_FAIL,
    CLIENT_LIST_REQUEST,
    CLIENT_LIST_SUCCESS,
    CLIENTS_LAST_MONTH_REQUEST,
    CLIENTS_LAST_MONTH_SUCCESS,
    CLIENTS_LAST_MONTH_FAIL,
    CLIENTS_RECENT_REQUEST,
    CLIENTS_RECENT_SUCCESS,
    CLIENTS_RECENT_FAIL,
    CLIENTS_TODAY_REQUEST,
    CLIENTS_TODAY_SUCCESS,
    CLIENTS_TODAY_FAIL,
    CLIENT_CREATE_FAIL,
    CLIENT_CREATE_REQUEST,
    CLIENT_CREATE_SUCCESS,
    CLIENT_UPDATE_FAIL,
    CLIENT_UPDATE_REQUEST,
    CLIENT_UPDATE_RESET,
    CLIENT_UPDATE_SUCCESS,
  } from '../constants/ClientConstants';

  export const clientListReducer = (state = { loading: true, clients:[], role: "Staff" }, action) => {
    switch (action.type) {
      case CLIENT_LIST_REQUEST:
        return { loading: true };
      case CLIENT_LIST_SUCCESS:
        return { loading: false, clients: action.payload.clients, role: action.payload.role };
      case CLIENT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const clientListLastMonthReducer = (state = { loading: true, clients:[], role: "Staff" }, action) => {
    switch (action.type) {
      case CLIENTS_LAST_MONTH_REQUEST:
        return { loading: true };
      case CLIENTS_LAST_MONTH_SUCCESS:
        return { loading: false, clients: action.payload.clients, role: action.payload.role };
      case CLIENTS_LAST_MONTH_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const clientsRecentReducer = (state = { loading: true, clients:[], clientsPrevMonth: [], clientsFromTwoMonth:[], role: "Staff" }, action) => {
    switch (action.type) {
      case CLIENTS_RECENT_REQUEST:
        return { loading: true };
      case CLIENTS_RECENT_SUCCESS:
        return { loading: false, clients: action.payload.clients, clientsPrevMonth: action.payload.clientsPrevMonth, clientsFromTwoMonth: action.payload.clientsFromTwoMonth, role: action.payload.role };
      case CLIENTS_RECENT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };