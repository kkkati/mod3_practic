import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { Store } from "redux";
import Blog from "./blog";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Blog />
    </Provider>
  </BrowserRouter>
);
