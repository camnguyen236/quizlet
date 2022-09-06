import axios from 'axios';

import {
    loginStart,
    loginSuccess,
    loginFalse,
    registerStart,
    registerSuccess,
    registerFalse,
    logoutStart,
    logoutSuccess,
    logoutFalse,
} from './authSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        // const res = await axios.post('http://localhost:5000/auth/login', user);
        // dispatch(loginSuccess(res.data));
        // navigate('/latest');
        const res = await axios.post('http://localhost:5000/auth/login', user);
        dispatch(loginSuccess(res.data));
        navigate('/latest');
    } catch (err) {
        dispatch(loginFalse());
        return err.response.status;
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post('http://localhost:5000/auth/register', user);
        dispatch(registerSuccess());
        navigate('/login');
    } catch (err) {
        dispatch(registerFalse());
    }
};

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post('http://localhost:5000/auth/logout', id, {
            headers: { authorization: `Bearer ${accessToken}` },
        });
        dispatch(logoutSuccess());
        navigate('/');
    } catch (err) {
        dispatch(logoutFalse());
    }
};
