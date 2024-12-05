import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import courseCategoriesReducer from "../features/course/courseCategoriesSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// Configure persist
const persistConfig = {
    key: 'root',
    storage, // Use localStorage
};

const rootReducer = combineReducers({
    userReducer: userReducer, courseCategoriesReducer: courseCategoriesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

// export const store = configureStore({
//     reducer: { userReducer: userReducer, courseCategoriesReducer: courseCategoriesReducer },
// });

const persistor = persistStore(store);

export { store, persistor };

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;