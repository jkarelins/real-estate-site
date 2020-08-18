import axios from "axios";
import { clearErrors } from "./error";

const SIGN_UP_USER = "SIGN_UP_USER";
const LOG_IN_USER = "LOG_IN__USER";
const FETCH_USER_TICKETS = "FETCH_USER_TICKETS";
const LOG_OUT_USER = "LOG_OUT_USER";
const USER_ACTION_ERROR = "USER_ACTION_ERROR";
const ADD_EXTRA_ADVERTS = "ADD_EXTRA_ADVERTS";

let baseUrl = "";

// if (process.env.NODE_ENV === "development") {
//   baseUrl = "http://localhost:4000";
// } else {
  baseUrl = "https://shielded-journey-92023.herokuapp.com";
// }

const userCreateError = error => {
  // console.log(error)
  if (typeof error == 'string'){
    return {
      type: USER_ACTION_ERROR,
      error: error
    };
  } else {
    return {
      type: USER_ACTION_ERROR,
      error: error.data.message
    };
  }
  
};

const userCreateSuccess = user => ({
  type: SIGN_UP_USER,
  user
});

export const createUser = data => dispatch => {
  axios
    .post(`${baseUrl}/user/create`, { ...data })
    .then(response => {
      dispatch(userCreateSuccess(response.data));
      dispatch(clearErrors());
    })
    .catch(err => dispatch(userCreateError(err.response)));
};

const userLoginSuccess = user => ({
  type: LOG_IN_USER,
  user
});

export const loginUser = data => dispatch => {
  axios
    .post(`${baseUrl}/user/login`, { ...data })
    .then(response => {
      dispatch(userLoginSuccess(response.data));
      dispatch(clearErrors());
    })
    .catch(err => {
      // console.log(err);
      dispatch(userCreateError(err.response))});
};

const userTicketsFetchSuccess = user => ({
  type: FETCH_USER_TICKETS,
  tickets: user.tickets
});

export const fetchUserTickets = userId => dispatch => {
  axios
    .get(`${baseUrl}/user/${userId}`)
    .then(response => {
      dispatch(userTicketsFetchSuccess(response.data));
    })
    .catch(err => dispatch(userCreateError(err.response)));
};

const userLogOutSuccess = () => ({
  type: LOG_OUT_USER,
  logout: true
});

export const logMeOut = () => dispatch => {
  dispatch(userLogOutSuccess());
};

export const creditAddSuccess = user => ({
  type: ADD_EXTRA_ADVERTS,
  user
});
