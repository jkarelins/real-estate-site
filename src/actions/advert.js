import axios from "axios";
const baseUrl = "http://localhost:4000";

const CREATE_NEW_ADVERT = "CREATE_NEW_ADVERT";
const FETCH_ALL_ADVERTS = "FETCH_ALL_ADVERTS";

const advertCreateSuccess = advert => ({
  type: CREATE_NEW_ADVERT,
  advert
});

export const createAdvert = data => (dispatch, getState) => {
  const { userReducer } = getState();
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .post(`${baseUrl}/advert`, {
      ...data
    })
    .then(response => {
      dispatch(advertCreateSuccess(response.data));
    })
    .catch(console.error);
};

const advertsFetchSuccess = adverts => ({
  type: FETCH_ALL_ADVERTS,
  adverts
});

export const fetchEvents = page => dispatch => {
  axios
    .get(`${baseUrl}/advert/all?offset=${page}`)
    .then(response => {
      dispatch(advertsFetchSuccess(response));
    })
    .catch(console.error);
};
