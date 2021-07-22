import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import {
    userListReducer,
    userCreateReducer,
    userDetailsReducer,
    userUpdateReducer,
    userDeleteReducer,
    userSigninReducer,
    userLoginReducer,
    userAuthenticateReducer,
    userPictureReducer,
} from './reducers/UserReducers';

import {
    shelterListReducer,
    shelterViewReducer,
    shelterCreateReducer,
    shelterDetailsReducer,
    shelterUpdateReducer,
    shelterDeleteReducer,
} from './reducers/ShelterReducers';

import {
    animalListReducer,
    animalsAvailableReducer,
    animalsScheduledReducer,
    animalCreateReducer,
    animalDetailsReducer,
    animalUpdateReducer,
    animalDeleteReducer,
} from './reducers/AnimalReducers';

import {
    bookingListReducer,
    bookingsInProgressReducer,
    bookingsTodayReducer,
    bookingsRecentReducer,
    bookingsRecentWithAnimalsReducer,
   bookingDetailsReducer,
   bookingUpdateReducer
} from './reducers/BookingReducers';

import {
    clientListReducer,
    clientListLastMonthReducer,
    clientsRecentReducer
} from './reducers/ClientReducers';

const initialState = {
    //change it to userInfo later
    userSignin: {
        userInfo: sessionStorage.getItem('user') 
          ? sessionStorage.getItem('user')
          : null,
      },
};
const reducer = combineReducers({
    userList: userListReducer,
    userCreate: userCreateReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    userSignin: userSigninReducer,
    userLogin: userLoginReducer,
    userAuthenticate: userAuthenticateReducer,
    userPicture: userPictureReducer,
    shelterList: shelterListReducer,
    shelterView: shelterViewReducer,
    shelterDetails: shelterDetailsReducer,
    shelterCreate: shelterCreateReducer,
    shelterUpdate: shelterUpdateReducer,
    shelterDelete: shelterDeleteReducer,
    animalList: animalListReducer,
    animalAvailableList: animalsAvailableReducer,
    animalScheduledList: animalsScheduledReducer,
    animalCreate: animalCreateReducer,
    animalDetails: animalDetailsReducer,
    animalUpdate: animalUpdateReducer,
    animalDelete: animalDeleteReducer,
    bookingList: bookingListReducer,
    bookingInProgressList: bookingsInProgressReducer,
    bookingTodayList: bookingsTodayReducer,
    bookingRecentList: bookingsRecentReducer,
    bookingRecentListWithAnimals: bookingsRecentWithAnimalsReducer,
    bookingDetails: bookingDetailsReducer,
    bookingUpdate: bookingUpdateReducer,
    clientList: clientListReducer,
    clientListLastMonth: clientListLastMonthReducer,
    clientRecentList: clientsRecentReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;