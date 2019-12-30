import { combineReducers } from "redux";
import simpleReducer from "./simple/simpleReducer";
import { cakeReducer } from "./cake/cakeReducer";

export default combineReducers({
  simpleReducer,
  cakeReducer
});
