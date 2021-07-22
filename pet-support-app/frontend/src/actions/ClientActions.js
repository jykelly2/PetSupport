import axios from 'axios';
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
    CLIENTS_IN_PROGRESS_REQUEST,
    CLIENTS_IN_PROGRESS_SUCCESS,
    CLIENTS_IN_PROGRESS_FAIL,
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

  export const listClients = () => async (dispatch, getState) => {
    dispatch({ type: CLIENT_LIST_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await  axios.get('http://localhost:5000/clients/', {
        headers:{"authorization": userInfo},
      });
      dispatch({ type: CLIENT_LIST_SUCCESS, payload: {clients: data.clients, role: data.role} });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CLIENT_LIST_FAIL, payload: message });
    }
  };

  export const listClientsLastMonth = () => async (dispatch, getState) => {
    dispatch({ type: CLIENTS_LAST_MONTH_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await  axios.get('http://localhost:5000/clients/lastMonth', {
        headers:{"authorization": userInfo},
      });
      dispatch({ type: CLIENTS_LAST_MONTH_SUCCESS, payload: {clients: data.clients, role: data.role} });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CLIENTS_LAST_MONTH_FAIL, payload: message });
    }
  };

  export const listRecentClients = () => async (dispatch, getState) => {
    dispatch({ type: CLIENTS_RECENT_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await  axios.get('http://localhost:5000/clients/recent', {
        headers:{"authorization": userInfo},
      });
      var date = new Date();
      date.setMonth(date.getMonth() - 1);

      const clientsPrevMonth = data.clients.filter(client => 
        {var createdAt = new Date(client.createdAt)
          return createdAt > date
        })
        
      const clientsFromTwoMonth = data.clients.filter(client => 
        {var createdAt = new Date(client.createdAt)
         return createdAt < date
        })

      dispatch({ type: CLIENTS_RECENT_SUCCESS, payload: {clients: data.clients, clientsPrevMonth: clientsPrevMonth, clientsFromTwoMonth: clientsFromTwoMonth, role: data.role} });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CLIENTS_RECENT_FAIL, payload: message });
    }
  };