import axios from "axios";
const baseUrl = "http://localhost:4000";

const NEW_APPOINTMENT = "NEW_APPOINTMENT";
const GET_ONE_APPOINTMENT = "GET_ONE_APPOINTMENT";
const GET_APPOINTMENTS = "GET_APPOINTMENTS";

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
    .catch(console.error);
};

// ___________________________________________________________________
const appointmentCanceled = appointment => ({
  type: NEW_APPOINTMENT,
  appointment
});

export const cancelAppointment = id => (dispatch, getState) => {
  const { userReducer } = getState();
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .delete(`${baseUrl}/appointment/${id}`)

    .then(response => {
      console.log(response);
      // dispatch(appointmentCreateSuccess(response.data));
    })
    .catch(console.error);
};
