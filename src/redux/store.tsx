import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

let configureStore = (initialState = {}) => {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
};

export default configureStore;
