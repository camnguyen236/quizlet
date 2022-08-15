import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './SignUp.module.scss';
import Buttonn from '~/components/Buttonn';
import DateTime from '~/components/DateTime';
import { DatePicker, Space } from 'antd';
import axios from 'axios';
//import './validator.js';
//import Validator from './validator';

const cx = classNames.bind(styles);
function SignUp() {
    //const [user, setUser] = useState({ birthday: '', email: '', username: '', password: '' });
    const [error, setError] = useState([]);

    const [details, setDetails] = useState({ birthday: '', email: '', username: '', password: '' });
    const Signup = (details) => {
        console.log(details);

        if (details.email === '') {
            setError((prev) => ['This is required!']);
        } else error[0] = '';
        if (details.username === '') setError((prev) => [...prev, 'This is required']);
        else error[1] = '';
        if (details.password === '') setError((prev) => [...prev, 'This is required!']);
        else error[2] = '';
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        Signup(details);
        const res = await axios
            .post('http://localhost:5000/auth/register', {
                details,
            })
            .catch((error) => {
                setError(true);
            });
        if (res.status === 200) {
            window.location.replace('/home');
        }
    };

    const dateFormat = 'DD-MM-YYYY';

    // const handleSignUp = async (e) => {
    //     e.preventDefault();
    //     const res = await axios
    //         .post('http://localhost:5000/auth/register', {
    //             username,
    //             password,
    //             email,
    //             birthday,
    //         })
    //         .catch((error) => {
    //             setError(true);
    //         });
    //     if (res.status === 200) {
    //         window.location.replace('/home');
    //     }
    // };

    return (
        <div className={cx('wrapper')}>
            <div id="img" className={cx('signUp-img')}>
                <h1 className={cx('signUp-label')}>Take the guess work out of your homework. Sign up today.</h1>
                <h2 className={cx('signUp-title')}>Quizlet</h2>
            </div>
            <div className={cx('signUp-wrapper')}>
                <div className={cx('signUp-info')}>
                    <div className={cx('signUp-info__role')}>
                        <h3 className={cx('signUp-info__auth', { active: 'active' })}>SignUp</h3>
                        <h3 className={cx('signUp-info__auth')}>Login</h3>
                    </div>
                    <div className={cx('signUp-info__connect')}>
                        <div className={cx('signUp-info__connect-google')}>
                            <a className={cx('signUp-info__connect-link')} href="/">
                                <span className={cx('signUp-info__connect-wrapper')}>
                                    <img
                                        className={cx('signUp-info__connect-img')}
                                        src="https://www.google.com.vn/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                                    />
                                    <div className={cx('signUp-info__connect-label')}>Sign Up with Google</div>
                                </span>
                            </a>
                        </div>
                        <div className={cx('signUp-info__connect-facebook')}>
                            <a className={cx('signUp-info__connect-link')} href="/">
                                <span className={cx('signUp-info__connect-wrapper')}>
                                    <img
                                        className={cx('signUp-info__connect-img')}
                                        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                                    />
                                    <div className={cx('signUp-info__connect-label')}>Sign Up with Facebook</div>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className={cx('divider')}>
                        <div className={cx('divider-separator')}>
                            <hr className={cx('divider-separatorLine')}></hr>
                        </div>
                        <div className={cx('divider-label')}>OR EMAIL</div>
                        <div className={cx('divider-separator')}>
                            <hr className={cx('divider-separatorLine')}></hr>
                        </div>
                    </div>
                    <form onSubmit={submitHandler} className={cx('signUp-form')} id="register-form">
                        <div className={cx('form-group')}>
                            <label for="birthday" className={cx('form-label')}>
                                BIRTHDAY
                            </label>
                            <Space direction="vertical">
                                <DatePicker
                                    onChange={(date, dateString) => {
                                        setDetails({ ...details, birthday: dateString });
                                        //setDate(dateString);
                                    }}
                                    className="datetime"
                                    //value={details.birthday}
                                    //defaultValue="1-2-2022"
                                    format={dateFormat}
                                />
                            </Space>
                            {/* <DateTime
                                onChange={(date, dateString) => {
                                    setDetails({ ...details, birthday: dateString });
                                }}
                            ></DateTime> */}
                        </div>
                        <div className={cx('form-group')}>
                            <label for="email" className={cx('form-label')}>
                                EMAIL
                            </label>
                            <input
                                id="email"
                                name="email"
                                rules="required|email"
                                type="text"
                                placeholder="VD: email@domain.com"
                                className={cx('form-control')}
                                onChange={(e) => setDetails({ ...details, email: e.target.value })}
                                value={details.email}
                            />
                            <span className={cx('form-message')}>{error[0]}</span>
                        </div>
                        <div className={cx('form-group')}>
                            <label for="username" className={cx('form-label')}>
                                USERNAME
                            </label>
                            <input
                                id="username"
                                name="username"
                                rules="required"
                                type="text"
                                placeholder="VD: diemtran2806"
                                className={cx('form-control')}
                                onChange={(e) => setDetails({ ...details, username: e.target.value })}
                                value={details.username}
                            />
                            {/* {error[1] !== '' ? <span className={cx('form-message')}>{error[1]}</span> : ''} */}
                            <span className={cx('form-message')}>{error[1]}</span>
                        </div>
                        <div className={cx('form-group')}>
                            <label for="password" className={cx('form-label')}>
                                PASSWORD
                            </label>
                            <input
                                id="password"
                                name="password"
                                rules="required|min:6"
                                type="password"
                                placeholder="......."
                                className={cx('form-control')}
                                onChange={(e) => setDetails({ ...details, password: e.target.value })}
                                value={details.password}
                            />
                            <span className={cx('form-message')}>{error[2]}</span>
                        </div>
                        <div className={cx('textForm')}>
                            <span className={cx('checkbox-icon')}></span>
                            <span className={cx('textForm-detail')}>
                                I accept
                                <a href="/"> Quizlet terms of service </a>
                                and
                                <a href="/"> privacy policy</a>
                            </span>
                        </div>
                        <div className={cx('btn-wraper')}>
                            {/* <Buttonn text="btn-primary btn-signUpForm" content="Sign Up"></Buttonn> */}
                            <button className={cx('btn-signup')}>Sign Up</button>
                        </div>
                        <div className={cx('question')}>
                            <div className={cx('question-wrapper')}>
                                <span className={cx('question-text')}>
                                    Do you have an account?
                                    <button className={cx('question-btn')}> Login</button>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
