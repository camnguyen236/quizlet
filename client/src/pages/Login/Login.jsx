import React, { useState } from 'react';
import './Login.scss'
import 'antd/dist/antd.min.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {CloseOutlined} from '@ant-design/icons';
import Input from '~/components/Input/Input';
import Error from '~/components/Error/Error';
import { message } from 'antd';
import { loginUser } from '~/redux/apiRequest';

function Login() {
    const[info,setInfo] = useState({
        username:"",
        password:""
    })
    const[error,setError] = useState("")
    const [style,setStyle] = useState({display: "none"})

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const showError = (message) => {
        setError(message);
        setStyle({display:"block"})
    }
    const checkEmptyError = (info) =>{
        const keys = Object.keys(info);
        for(let i = 0; i < keys.length; i++){
            let length = info[keys[i]].trim().length;
            if(length === 0) {
                let message = `Your ${keys[i]} cannot be blank`;
                showError(message); 
                return false;
               }
        }
        return true;
    }
    const checkFormatError = (username) =>{
        const length = username.trim().length;
        const user_regex = /[a-zA-Z0-9_]$/;
        if(length > 0 && length <= 3) {
            let message = 'Your username is too short';
            showError(message); 
            return false;
        }
        if(!user_regex.test(username)) {
            let message = 'YOUR USERNAME MAY ONLY CONTAIN LETTERS, NUMBERS AND UNDERSCORES';
            showError(message); 
            return false;
        }
        return true;
    }
   
    const handleLogin = async (e) => { 
        e.preventDefault();
        //console.log(info);
        const newUser = {
            username:info.username, 
            password:info.password,
        }
        //let statuss = 1;
        if(checkEmptyError(info))
        {
            if(checkFormatError(info.username))
           {
             const statuss = await loginUser(newUser, dispatch, navigate)
            if(statuss === 401)
                showError("THE LOGIN DETAILS YOU PROVIDED ARE INCORRECT. PLEASE TRY AGAIN.");
           }
        }
        //console.log(statuss);
        // if(statuss == 401)
        //         showError("THE LOGIN DETAILS YOU PROVIDED ARE INCORRECT. PLEASE TRY AGAIN.");
      }
    return (
        <div className="modal">
            <div className="modal__login">
                <div className="modal__login__body">
                    <div className="modal__login__body__image">
                        <h1>Dress casually, study seriously.</h1>
                        <h2>Quizlet</h2>
                    </div>
                    <div className="login-wrapper">
                    <div className="modal__login__close">
                         <CloseOutlined 
                             onClick={(e) => {
                             navigate('/');
                             }} />
                     </div>
                    <div className="modal__login__body_info">
                        <div className="role__btn">
                            <h3 
                            className="role-signup"
                            onClick={(e) => {
                                //window.location.replace('/signup');
                                navigate('/signup');
                            }}
                            >Sign up</h3>
                            <h3 
                            className="role-login active"
                            onClick={(e) => {
                                window.location.replace('/login');
                            }}
                            >Login</h3>
                        </div>
                    <form>
                        <div className="social-btn">
                            <div className="social-google-btn">
                                <a className="social-google-btn-link" href="http://localhost:5000/auth/google/" >
                                    <span className='social-btn-wrapper'>
                                        <img className="btn-google-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png" alt="Google"></img>
                                    </span>    
                                   Log in with Google       
                                </a>
                            </div>
                            <div className="social-facebook-btn">
                                <a className="social-facebook-btn-link" href="http://localhost:5000/auth/facebook/" >
                                    <span className='social-btn-wrapper'>
                                        <img className="btn-facebook-logo" src="https://seeklogo.com/images/F/facebook-icon-logo-C61047A9E7-seeklogo.com.png" alt="facebook"></img>
                                    </span> Log in with Facebook    
                                </a>
                            </div>
                        </div>
                        <Error style={style} message={error}></Error>  
                        <div className='login-input'>
                            <Input 
                            value={info.username}
                            onChange={e => setInfo({...info,username: e.target.value})}
                            type="text"
                            label="Username"
                            placeholder="Type your email address or username"
                            id="username"
                            name="username"
                            />
                            <Input 
                             value={info.password}
                             onChange={e => setInfo({...info,password: e.target.value})}
                            type="password"
                            label="Password"
                            placeholder="Type your password"
                            id="password"
                            name="password"
                            />
                            <div className="forgotten-wrapper">
                                <a className="forgotten-link" href='/'>Forgotten?</a>
                            </div>
                            <div className='service-privacy-wrapper'>
                            By selecting Log in, you accept Quizlet's
                            <a className="service" href='/'> Terms of Service </a>
                            and 
                            <a className="privacy" href='/'> Privacy Policy </a>
                            </div>
                        </div>
                        <button onClick={handleLogin} className='login-btn' type="submit">Log In</button>             
                    </form>
                        <h3 className="login-reminder">Remember to log out of shared devices</h3> 
                    </div>
                    </div>

                </div>
              </div>
        </div>
     );
}

export default Login;