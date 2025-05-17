import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage для web
import booksReducer from "./slice/listBooksSlice";
import authorization from "./slice/authorizationSlice";
import basket from "./slice/basketSlice";
import { combineReducers } from "@reduxjs/toolkit";

// Конфигурация Redux Persist
const persistConfig = {
  key: "books",
  storage,
};

// Объединяем редьюсеры
const rootReducer = combineReducers({booksReducer, basket, authorization});

// Оборачиваем корневой редьюсер в persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;