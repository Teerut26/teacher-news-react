import { combineReducers } from "redux";
import { createStore } from "redux";

import { is_dark } from "./is_dark";
import { user_data } from "./user_data";
import { sign_out } from "./sign_out";
import { teacher_add_post } from "./teacher/teacher_add_post";
import { teacher_delete_post } from "./teacher/teacher_delete_post";

const reducer = combineReducers({
  is_dark,
  user_data,
  sign_out,
  teacher_add_post,
  teacher_delete_post,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store };
