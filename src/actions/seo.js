import axios from "axios";
import { newError } from "./error";

let baseUrl = "";
// if (process.env.NODE_ENV === "development") {
//   baseUrl = "http://localhost:4000";
// } else {
  baseUrl = "https://shielded-journey-92023.herokuapp.com";
// }

const FETCH_ALL_CITIES = "FETCH_ALL_CITIES";

const fetchCitiesSuccess = cities => ({
  type: FETCH_ALL_CITIES,
  cities
});

export const fetchCities = () => (dispatch) => {
  axios
    .get(`${baseUrl}/seo/count-cities`)
    .then(response => {
      dispatch(fetchCitiesSuccess(response.data));
    })
    .catch(err => dispatch(newError(err.response)));
};
