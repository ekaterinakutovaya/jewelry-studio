import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import store from "./store/store";
import App from './App';
import './index.scss';

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
      />
    </PersistGate>
  </Provider>
)
