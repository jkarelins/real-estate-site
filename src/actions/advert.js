import axios from "axios";
import { newError } from "./error";

let baseUrl = "";
// if (process.env.NODE_ENV === "development") {
//   baseUrl = "http://localhost:4000";
// } else {
  baseUrl = "https://shielded-journey-92023.herokuapp.com";
// }

const CREATE_NEW_ADVERT = "CREATE_NEW_ADVERT";
const FETCH_ALL_ADVERTS = "FETCH_ALL_ADVERTS";
const FETCH_SEARCHED_ADVERTS = "FETCH_SEARCHED_ADVERTS";
const FETCH_ONE_ADVERT = "FETCH_ONE_ADVERT";
const GET_AGENCY_AGENTS = "GET_AGENCY_AGENTS";
const TOGGLE_AGENT_CONFIRMATION = "TOGGLE_AGENT_CONFIRMATION";
const GET_MY_ADVERTS = "GET_MY_ADVERTS";
const CLEAR_SEARCHED_ADVERTS = "CLEAR_SEARCHED_ADVERTS";

const advertCreateSuccess = advert => ({
  type: CREATE_NEW_ADVERT,
  advert: { ...advert.newAdvert },
  user: { ...advert.user }
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
    .catch(err => dispatch(newError(err.response)));
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
    .catch(err => dispatch(newError(err.response)));
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
    .catch(err => dispatch(newError(err.response)));
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
    .catch(err => dispatch(newError(err.response)));
};

const toggleAgentSuccess = agent => ({
  type: TOGGLE_AGENT_CONFIRMATION,
  agent
});

export const toggleAgentAcc = (id, action) => (dispatch, getState) => {
  const { userReducer } = getState();
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .get(`${baseUrl}/agency/agent/${id}?action=${action}`)
    .then(response => {
      dispatch(toggleAgentSuccess(response.data));
    })
    .catch(err => console.log(err));
};

const getMyAdvertsSuccess = adverts => ({
  type: GET_MY_ADVERTS,
  adverts
});

export const getMyAdverts = () => (dispatch, getState) => {
  const { userReducer } = getState();
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .get(`${baseUrl}/advert/myadvert`)
    .then(response => {
      dispatch(getMyAdvertsSuccess(response.data));
    })
    .catch(err => console.log(err));
};

const searchedAdvertsFetchSuccess = adverts => ({
  type: FETCH_SEARCHED_ADVERTS,
  adverts
});

export const fetchAdvertsBySearchTerm = (
  page,
  searchBy,
  searchFor,
  searchObj
) => dispatch => {
  let url;
  if (searchObj) {
    let { priceFrom, priceTo, forRent, forSale } = searchObj;
    priceFrom = priceFrom ? `&pricefrom=${priceFrom}` : "";
    priceTo = priceTo ? `&priceto=${priceTo}` : "";
    forRent = forRent ? `&forrent=true` : "";
    forSale = forSale ? `&forsale=true` : "";

    url = `${baseUrl}/advert/all?${searchBy}=${searchFor}&offset=${page}${priceFrom}${priceTo}${forRent}${forSale}`;
  } else {
    url = `${baseUrl}/advert/all?${searchBy}=${searchFor}&offset=${page}`;
  }
  axios
    .get(url)
    .then(response => {
      dispatch(searchedAdvertsFetchSuccess(response));
    })
    .catch(err => dispatch(newError(err.response)));
};

export const clearSearchedAdverts = () => dispatch => {
  dispatch({ type: CLEAR_SEARCHED_ADVERTS });
};
