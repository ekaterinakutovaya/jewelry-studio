import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import AuthReducer from "./AuthSlice";
import OrdersReducer from "./OrdersSlice";
import FilterReducer from "./FilterSlice";
import editModeReducer from "./EditModeSlice";
import filesReducer from "./FilesSlice";
import ImagesReducer from "./ImagesSlice";
import PricesReducer from "./PricesSlice";
import CalculationReducer from "./CalculationSlice";
import CaratsReducer from "./CaratsSlice";
import SidebarReducer from "./SidebarSlice";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['auth', 'editMode', 'fetching', 'currentPage', 'filter']
}

const reducer = combineReducers({
  auth: AuthReducer,
  orders: OrdersReducer,
  files: filesReducer,
  calculation: CalculationReducer,
  images: ImagesReducer,
  filter: FilterReducer,
  editMode: editModeReducer,
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