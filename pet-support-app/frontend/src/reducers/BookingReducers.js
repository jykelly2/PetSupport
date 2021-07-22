import {
    BOOKING_ADDRESS_MAP_CONFIRM,
    BOOKING_DELETE_FAIL,
    BOOKING_DELETE_REQUEST,
    BOOKING_DELETE_RESET,
    BOOKING_DELETE_SUCCESS,
    BOOKING_DETAILS_FAIL,
    BOOKING_DETAILS_REQUEST,
    BOOKING_DETAILS_RESET,
    BOOKING_DETAILS_SUCCESS,
    BOOKING_LIST_FAIL,
    BOOKING_LIST_REQUEST,
    BOOKING_LIST_SUCCESS,
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
    BOOKING_CREATE_FAIL,
    BOOKING_CREATE_REQUEST,
    BOOKING_CREATE_SUCCESS,
    BOOKING_UPDATE_FAIL,
    BOOKING_UPDATE_REQUEST,
    BOOKING_UPDATE_RESET,
    BOOKING_UPDATE_SUCCESS,
  } from '../constants/BookingConstants';

  export const bookingListReducer = (state = { loading: true, bookings:[], role: "Staff" }, action) => {
    switch (action.type) {
      case BOOKING_LIST_REQUEST:
        return { loading: true };
      case BOOKING_LIST_SUCCESS:
        return { loading: false, bookings: action.payload.bookings, role: action.payload.role };
      case BOOKING_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const bookingsRecentReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case BOOKINGS_RECENT_REQUEST:
        return { loading: true };
      case BOOKINGS_RECENT_SUCCESS:
        return { loading: false, bookings: action.payload.bookings, role: action.payload.role };
      case BOOKINGS_RECENT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const bookingsRecentWithAnimalsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case BOOKINGS_RECENT_WITH_ANIMALS_REQUEST:
        return { loading: true };
      case BOOKINGS_RECENT_WITH_ANIMALS_SUCCESS:
        return { loading: false, bookings: action.payload.bookings, role: action.payload.role };
      case BOOKINGS_RECENT_WITH_ANIMALS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const bookingsInProgressReducer = (state = { loading: true, bookings:[], role: "Staff" }, action) => {
    switch (action.type) {
      case BOOKINGS_IN_PROGRESS_REQUEST:
        return { loading: true };
      case BOOKINGS_IN_PROGRESS_SUCCESS:
        return { loading: false, bookings: action.payload.bookings, role: action.payload.role };
      case BOOKINGS_IN_PROGRESS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const bookingsTodayReducer = (state = { loading: true, bookings:[], role: "Staff" }, action) => {
    switch (action.type) {
      case BOOKINGS_TODAY_REQUEST:
        return { loading: true };
      case BOOKINGS_TODAY_SUCCESS:
        return { loading: false, bookings: action.payload.bookings, role: action.payload.role };
      case BOOKINGS_TODAY_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

    export const bookingDetailsReducer = (state = { loading: true , booking:""}, action) => {
      switch (action.type) {
        case BOOKING_DETAILS_REQUEST:
          return { loading: true };
        case BOOKING_DETAILS_SUCCESS:
          return { loading: false, booking: action.payload.booking };
        case BOOKING_DETAILS_FAIL:
          return { loading: false, error: action.payload };
        // case BOOKING_DETAILS_RESET:
        //   return { loading: true };
        default:
          return state;
      }
    };
  
    export const bookingUpdateReducer = (state = {}, action) => {
      switch (action.type) {
        case BOOKING_UPDATE_REQUEST:
          return { loading: true };
        case BOOKING_UPDATE_SUCCESS:
          return { loading: false, success: action.payload };
        case BOOKING_UPDATE_FAIL:
          return { loading: false, error: action.payload };
        case BOOKING_UPDATE_RESET:
          return {};
        default:
          return state;
      }
    };
  