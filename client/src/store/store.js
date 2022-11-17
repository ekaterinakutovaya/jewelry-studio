// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import rootReducer from "../store/reducers/index";

// const middleware = [thunk];

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;

// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import OrdersReducer from "./OrdersSlice";
// import CuttingFilesReducer from "./CuttingFilesSlice";
// // import FilterReducer from "./CuttingFilesSlice";




// const reducer = combineReducers({
//   orders: OrdersReducer,
//   cuttingFiles: CuttingFilesReducer,
//   // filter: FilterReducer
// });

// const store = configureStore({
//   reducer: reducer,
//   devTools: true,
// })

// export default store;


import storage from "redux-persist/lib/storage";
import {
  persistReducer, 
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import OrdersReducer from "./OrdersSlice";
import AuthReducer from "./AuthSlice";
import FilterReducer from "./FilterSlice";
import editModeReducer from "./EditModeSlice";
import fetchingReducer from "./FetchingSlice";
import currentPageReducer from "./CurrentPageSlice";
import CuttingFilesReducer from "./CuttingFilesSlice";
import RhinoFilesReducer from "./RhinoFilesSlice";
import OrderImagesReducer from "./OrderImagesSlice";
import InsertsReducer from "./InsertsSlice";
import PricesReducer from "./PricesSlice";
import CalculationReducer from "./CalculationSlice";
import CaratsReducer from "./CaratsSlice";
import SidebarReducer from "./SidebarSlice";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['auth', 'inserts', 'cuttingFiles', 'rhinoFiles', 'editMode', 'fetching', 'currentPage', 'calculation', 'filter']
}

const reducer = combineReducers({
  calculation: CalculationReducer,
  auth: AuthReducer,
  orders: OrdersReducer,
  filter: FilterReducer,
  editMode: editModeReducer,
  fetching: fetchingReducer,
  currentPage: currentPageReducer,
  inserts: InsertsReducer,
  cuttingFiles: CuttingFilesReducer,
  rhinoFiles: RhinoFilesReducer,
  orderImages: OrderImagesReducer,
  prices: PricesReducer,
  carats: CaratsReducer,
  sidebar: SidebarReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export default store;