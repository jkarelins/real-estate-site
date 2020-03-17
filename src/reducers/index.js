import { combineReducers } from "redux";
import userReducer from "./user";
import errorReducer from "./error";

export default combineReducers({
  userReducer,
  errorReducer
});
