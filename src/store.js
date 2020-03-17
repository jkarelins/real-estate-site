import { createStore, applyMiddleware, compose } from "redux";
import combineReducers from "./reducers/index";
import ReduxThunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));
const store = createStore(combineReducers, enhancer);

export default store;
