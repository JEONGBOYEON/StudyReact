// store.js
import reducer from "./reducers/reducers";
import { createStore } from "redux";
import { addTodo } from "./actions";

const store = createStore(reducer);
export default store;
