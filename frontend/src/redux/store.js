// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice.js";
// import tweetSlice from "./tweetSlice.js";

// const store = configureStore({
//   reducer: {
//     //actions
//     user: userSlice,
//     tweet: tweetSlice,
//   },
// });

// export default store;


import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage in web
import userSlice from "./userSlice.js";
import tweetSlice from "./tweetSlice.js";
import { combineReducers } from "redux";

// Combine reducers
const rootReducer = combineReducers({
  user: userSlice,
  tweet: tweetSlice,
});

// Configure persist settings
const persistConfig = {
  key: "root",
  storage, // Saves to localStorage
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevents Redux persist warnings
    }),
});

// Create a persistor
export const persistor = persistStore(store);

export default store;
