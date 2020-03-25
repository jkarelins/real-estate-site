import axios from "axios";
const baseUrl = "http://localhost:4000";

const USER_SECRET_RECEIVED = "USER_SECRET_RECEIVED";

const receivedUserSecret = clientSecret => ({
  type: USER_SECRET_RECEIVED,
  clientSecret
});

export const requestUserSecret = amountInCents => (dispatch, getState) => {
  console.log("was here");
  const { userReducer } = getState();
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .get(`${baseUrl}/payment/${amountInCents}`)
    .then(res => {
      console.log(res);
      dispatch(receivedUserSecret(res.data.client_secret));
    })
    .catch(console.error);
};
