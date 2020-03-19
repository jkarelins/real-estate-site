import axios from "axios";
const baseUrl = "http://localhost:4000";

const CREATE_NEW_ADVERT = "CREATE_NEW_ADVERT";
const FETCH_ALL_ADVERTS = "FETCH_ALL_ADVERTS";
const FETCH_ONE_ADVERT = "FETCH_ONE_ADVERT";
const GET_AGENCY_AGENTS = "GET_AGENCY_AGENTS";

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

export const fetchAdverts = page => dispatch => {
  axios
    .get(`${baseUrl}/advert/all?offset=${page}`)
    .then(response => {
      dispatch(advertsFetchSuccess(response));
    })
    .catch(console.error);
};

const advertFetchSuccess = advert => ({
  type: FETCH_ONE_ADVERT,
  advert
});

export const fetchAdvert = id => dispatch => {
  axios
    .get(`${baseUrl}/advert/${id}`)
    .then(res => {
      dispatch(advertFetchSuccess(res.data));
    })
    .catch(console.error);
};

const gotAgencyAgents = agency => ({
  type: GET_AGENCY_AGENTS,
  agency
});

export const getAgencyAgents = () => (dispatch, getState) => {
  const { userReducer } = getState();
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .get(`${baseUrl}/agency`)
    .then(response => {
      dispatch(gotAgencyAgents(response.data));
    })
    .catch(console.error);
};
