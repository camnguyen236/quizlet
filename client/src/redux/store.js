import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
// import { combineReducers } from 'redux';
// const reducer = combineReducers({
//     reducers: {
//         auth: authReducer,
//     },
// });
// const store = configureStore({
//     reducer,
// });

export default configureStore({
    reducer: {
        auth: authReducer,
    },
});
