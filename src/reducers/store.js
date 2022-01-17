import { combineReducers } from "redux";
import { createStore } from "redux";

import { is_dark } from "./is_dark";


const reducer = combineReducers({
  is_dark
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store };
