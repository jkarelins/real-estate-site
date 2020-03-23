import axios from "axios";
const baseUrl = "http://localhost:4000";

const NEW_APPOINTMENT = "NEW_APPOINTMENT";
const GET_ONE_APPOINTMENT = "GET_ONE_APPOINTMENT";

const appointmentCreateSuccess = appointment => ({
  type: NEW_APPOINTMENT,
  appointment
});

export const createNewAppointment = data => (dispatch, getState) => {
  const { advertReducer } = getState();
  const { selectedAdvert } = advertReducer;

  axios
    .post(`${baseUrl}/advert/${selectedAdvert.id}/appointment`, {
      ...data
    })
    .then(response => {
      dispatch(appointmentCreateSuccess(response.data));
    })
    .catch(console.error);
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
    .catch(console.error);
};
