import axios from 'axios';
import {
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_LIST_REQUEST,
  BOOKING_LIST_SUCCESS,
  BOOKING_LIST_FAIL,
  BOOKINGS_IN_PROGRESS_REQUEST,
  BOOKINGS_IN_PROGRESS_SUCCESS,
  BOOKINGS_IN_PROGRESS_FAIL,
  BOOKINGS_TODAY_REQUEST,
  BOOKINGS_TODAY_SUCCESS,
  BOOKINGS_TODAY_FAIL,
  BOOKINGS_RECENT_REQUEST,
  BOOKINGS_RECENT_SUCCESS,
  BOOKINGS_RECENT_FAIL, 
  BOOKINGS_RECENT_WITH_ANIMALS_REQUEST,
  BOOKINGS_RECENT_WITH_ANIMALS_SUCCESS,
  BOOKINGS_RECENT_WITH_ANIMALS_FAIL,
  BOOKING_DELETE_REQUEST,
  BOOKING_DELETE_SUCCESS,
  BOOKING_DELETE_FAIL,
  BOOKING_UPDATE_REQUEST,
  BOOKING_UPDATE_SUCCESS,
  BOOKING_UPDATE_FAIL,
} from '../constants/BookingConstants';

export const listBookings = () => async (dispatch, getState) => {
    dispatch({ type: BOOKING_LIST_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await  axios.get('http://localhost:5000/bookings/', {
        headers:{"authorization": userInfo},
      });
      dispatch({ type: BOOKING_LIST_SUCCESS, payload: {bookings: data.bookings, role: data.role} });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: BOOKING_LIST_FAIL, payload: message });
    }
  };

  export const listRecentBookings = () => async (dispatch, getState) => {
    dispatch({ type: BOOKINGS_RECENT_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await  axios.get('http://localhost:5000/bookings/recent', {
        headers:{"authorization": userInfo},
      });
      dispatch({ type: BOOKINGS_RECENT_SUCCESS, payload: {bookings: data.bookings, role: data.role} });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: BOOKINGS_RECENT_FAIL, payload: message });
    }
  };

  export const listRecentBookingsWithAnimals = () => async (dispatch, getState) => {
    dispatch({ type: BOOKINGS_RECENT_WITH_ANIMALS_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await  axios.get('http://localhost:5000/bookings/recent', {
        headers:{"authorization": userInfo},
        params:{filter: "withAnimals"},
      });
      dispatch({ type: BOOKINGS_RECENT_WITH_ANIMALS_SUCCESS, payload: {bookings: data.bookings, role: data.role} });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: BOOKINGS_RECENT_WITH_ANIMALS_FAIL, payload: message });
    }
  };

  export const listInProgressBookings = () => async (dispatch, getState) => {
    dispatch({ type: BOOKINGS_IN_PROGRESS_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await  axios.get('http://localhost:5000/bookings/filter', {
        headers:{"authorization": userInfo},
        params:{filter: "inProgress"},
      });
      dispatch({ type: BOOKINGS_IN_PROGRESS_SUCCESS, payload: {bookings: data.bookings, role: data.role} });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: BOOKINGS_IN_PROGRESS_FAIL, payload: message });
    }
  };

  export const listTodayBookings = () => async (dispatch, getState) => {
    dispatch({ type: BOOKINGS_TODAY_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await  axios.get('http://localhost:5000/bookings/filter', {
        headers:{"authorization": userInfo},
        params:{filter: "today"},
      });
      dispatch({ type: BOOKINGS_TODAY_SUCCESS, payload: {bookings: data.bookings, role: data.role} });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: BOOKINGS_TODAY_FAIL, payload: message });
    }
  };

  export const detailsBooking = (bookingId) => async (dispatch, getState) => {
    dispatch({ type: BOOKING_DETAILS_REQUEST, payload: bookingId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await  axios.get('http://localhost:5000/bookings/edit/'+ bookingId,  {
        headers:{"authorization": userInfo},
      });
  
      dispatch({ type: BOOKING_DETAILS_SUCCESS, payload: {booking:data}});
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: BOOKING_DETAILS_FAIL, payload: message });
    }
  };

  export const updateBooking = (booking) => async (dispatch, getState) => {
    dispatch({ type: BOOKING_UPDATE_REQUEST, payload: booking });
    const {
      userSignin: { userInfo },
    } = getState();
    try {

        let formData = new FormData();
        formData.append("startTime",booking.startTime)
        formData.append("endTime",booking.endTime)
        formData.append("status",booking.status)
        formData.append("hours",booking.hours)
        formData.append("totalAmount",booking.totalAmount)
        formData.append("date",booking.date)

      const { data } = await axios.post('http://localhost:5000/bookings/update/' + booking._id, booking,  {
        headers:{"authorization": userInfo},
      });
  
      dispatch({ type: BOOKING_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: BOOKING_UPDATE_FAIL, payload: message });
    }
  };
  