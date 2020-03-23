import axios from "axios";
const baseUrl = "http://localhost:4000";

const NEW_APPOINTMENT = "NEW_APPOINTMENT";

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
