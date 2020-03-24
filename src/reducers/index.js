import { combineReducers } from "redux";
import userReducer from "./user";
import errorReducer from "./error";
import advertReducer from "./advert";
import likeReducer from "./likes";
import appointmentReducer from "./appointment";
import imageReducer from "./image";
import extraReducer from "./extra";

export default combineReducers({
  userReducer,
  errorReducer,
  advertReducer,
  likeReducer,
  appointmentReducer,
  imageReducer,
  extraReducer
});
