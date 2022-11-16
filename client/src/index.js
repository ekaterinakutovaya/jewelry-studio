import React from 'react';
import ReactDOM from "react-dom/client";
import './styles/index.scss';
import App from './App';
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <App />
    <ToastContainer
      autoClose={2000}
      hideProgressBar={true}
      // position="top-center"
    />
    </PersistGate>
  </Provider>
);


