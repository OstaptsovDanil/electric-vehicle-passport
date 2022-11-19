import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import activeCarSlice from "./slices/activeCarSlice";

const rootReducer = combineReducers({
    user:userSlice,
    activeCar:activeCarSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});
