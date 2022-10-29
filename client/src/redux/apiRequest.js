import axios from 'axios';
import { useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFalse, registerStart, registerSuccess, registerFalse } from './authSlice';
import { getEmailError, getEmailSuccess } from './emailSlice';

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
export const forgotPassword = async (input, dispatch, navigate) => {
    try {
        const res = await axios.get(`http://localhost:5000/auth/${input}`);
        dispatch(getEmailSuccess(res.data.data));
        navigate('/forgotten/password');
    } catch (err) {
        dispatch(getEmailError());
        return err.response.data.status;
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
