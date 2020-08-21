import axios from "axios";
import { newError } from "./error";

let baseUrl = "";
// if (process.env.NODE_ENV === "development") {
//   baseUrl = "http://localhost:4000";
// } else {
  baseUrl = "https://shielded-journey-92023.herokuapp.com";
// }

const NEW_APPOINTMENT = "NEW_APPOINTMENT";
const GET_ONE_APPOINTMENT = "GET_ONE_APPOINTMENT";
const GET_APPOINTMENTS = "GET_APPOINTMENTS";
const CANCEL_APPOINTMENT = "CANCEL_APPOINTMENT";
const CHECK_APPOINTMENT = "CHECK_APPOINTMENT";
const APPOINTMENT_WAS_EDITED = "APPOINTMENT_WAS_EDITED";

const appointmentCreateSuccess = appointment => ({
  type: NEW_APPOINTMENT,
  appointment
});

export const createNewAppointment = data => (dispatch, getState) => {
  const { advertReducer, userReducer } = getState();
  const { selectedAdvert } = advertReducer;
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .post(`${baseUrl}/advert/${selectedAdvert.id}/appointment`, {
      ...data
    })

    .then(response => {
      dispatch(appointmentCreateSuccess(response.data));
    })
    .catch(err => dispatch(newError(err.response)));
};

const gotAppointment = appointment => ({
  type: GET_ONE_APPOINTMENT,
  appointment
});

export const getAppointment = randAddress => dispatch => {
  axios
    .get(`${baseUrl}/appointment/${randAddress}`)
    .then(res => {
      dispatch(gotAppointment(res.data));
    })
    .catch(err => dispatch(newError(err.response)));
};

const gotAppointments = appointments => ({
  type: GET_APPOINTMENTS,
  appointments
});

export const getAppointments = () => (dispatch, getState) => {
  const { userReducer } = getState();
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .get(`${baseUrl}/appointment/all`)
    .then(res => {
      const appointments = res.data.map(app => app.appointment);
      dispatch(gotAppointments(appointments));
    })
    .catch(err => dispatch(newError(err.response)));
};

const appointmentCanceled = appointment => ({
  type: CANCEL_APPOINTMENT,
  appointment
});

export const cancelAppointment = id => (dispatch, getState) => {
  const { userReducer } = getState();
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .put(`${baseUrl}/appointment/${id}`)

    .then(response => {
      dispatch(appointmentCanceled(response.data));
    })
    .catch(err => dispatch(newError(err.response)));
};

const AppointmentChecked = appointment => ({
  type: CHECK_APPOINTMENT,
  appointment
});

export const checkAppointment = () => (dispatch, getState) => {
  const { userReducer, advertReducer } = getState();
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .get(`${baseUrl}/appointment/${advertReducer.selectedAdvert.id}/advert`)
    .then(res => {
      dispatch(AppointmentChecked(res.data));
    })
    .catch(err => dispatch(newError(err.response)));
};

const appointmentEditSuccess = appointment => ({
  type: APPOINTMENT_WAS_EDITED,
  appointment
});

export const changeAppointment = (data, appId) => (dispatch, getState) => {
  const { userReducer } = getState();
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .put(`${baseUrl}/appointment/${appId}/edit`, {
      ...data
    })

    .then(response => {
      dispatch(appointmentEditSuccess(response.data));
    })
    .catch(err => dispatch(newError(err.response)));
};
