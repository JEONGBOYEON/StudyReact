import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { addTodo, completeTodo, showComplate } from "./redux/actions";

//subscribe의 리턴은 unsubscribe라는 역할을 하는 함수
store.subscribe(() => {
  console.log(store.getState());
});

console.log(store);
store.dispatch(addTodo("eat"));
store.dispatch(completeTodo(1));
store.dispatch(showComplate());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
