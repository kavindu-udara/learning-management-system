import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import courseCategoriesReducer from "../features/course/courseCategoriesSlice";

export const store = configureStore({
    reducer: { userReducer: userReducer, courseCategoriesReducer: courseCategoriesReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;