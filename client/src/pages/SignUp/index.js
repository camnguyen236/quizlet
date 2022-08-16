import classNames from 'classnames/bind';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './SignUp.module.scss';
import Buttonn from '~/components/Buttonn';
import DateTime from '~/components/DateTime';
import { DatePicker, Space } from 'antd';
import axios from 'axios';
import { CloseOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorUsername, setErrorUsername] = useState(false);
    const [birthdayy, setBirthdayy] = useState('');
    //const [details, setDetails] = useState({ birthday: '', email: '', username: '', password: '' });

    const dateFormat = 'DD-MM-YYYY';
    const handleChangeEmail = async (event) => {
        setErrorEmail(false);
        const url = 'http://localhost:5000/auth/user/email/?email=' + event.target.value;
        await axios
            .get(url)
            .then((res) => {
                if (res.data) setErrorEmail(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleChangeUsername = async (event) => {
        setErrorUsername(false);
        //setUsername(event.target.value);
        const url = 'http://localhost:5000/auth/user/username/?username=' + event.target.value;
        await axios
            .get(url)
            .then((res) => {
                if (res.data) setErrorUsername(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onSubmit = async (data) => {
        console.log(data);
        let birthday = birthdayy;
        let email = data.email;
        let username = data.username;
        let password = data.password;
        const res = await axios
            .post('http://localhost:5000/auth/register', {
                birthday,
                email,
                username,
                password,
            })
            .catch((error) => {
                //setError('true');
            });
        if (res.status === 200) {
            window.location.replace('/latest');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div id="img" className={cx('signUp-img')}>
                <h1 className={cx('signUp-label')}>Take the guess work out of your homework. Sign up today.</h1>
                <h2 className={cx('signUp-title')}>Quizlet</h2>
            </div>
            <div className={cx('signUp-wrapper')}>
                <CloseOutlined
                    className={cx('signUp-iconExit')}
                    onClick={(e) => {
                        window.location.replace('/');
                    }}
                />
                <div className={cx('signUp-info')}>
                    <div className={cx('signUp-info__role')}>
                        <h3 className={cx('signUp-info__auth', { active: 'active' })}>SignUp</h3>
                        <h3 className={cx('signUp-info__auth')}>Login</h3>
                    </div>
                    <div className={cx('signUp-info__connect')}>
                        <div className={cx('signUp-info__connect-google')}>
                            <a className={cx('signUp-info__connect-link')} href="http://localhost:5000/auth/google/">
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
                            <a className={cx('signUp-info__connect-link')} href="http://localhost:5000/auth/facebook/">
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
                    <form onSubmit={handleSubmit(onSubmit)} className={cx('signUp-form')} id="register-form">
                        <div className={cx('form-group')}>
                            <label htmlFor="birthday" className={cx('form-label')}>
                                BIRTHDAY
                            </label>
                            <Space direction="vertical">
                                <DatePicker
                                    onChange={(date, dateString) => {
                                        //setDetails({ ...details, birthday: dateString });
                                        setBirthdayy(dateString);
                                    }}
                                    className={cx('datetime')}
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
                            <label htmlFor="email" className={cx('form-label')}>
                                EMAIL
                            </label>
                            <input
                                id="email"
                                name="email"
                                rules="required|email"
                                type="text"
                                placeholder="VD: email@domain.com"
                                className={cx('form-control')}
                                // onChange={(e) => setDetails({ ...details, email: e.target.value })}
                                // value={details.email}
                                {...register('email', {
                                    required: true,
                                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                })}
                                onChange={handleChangeEmail}
                            />
                            {Object.keys(errors).length !== 0 && errors.email?.type === 'required' && (
                                <span className={cx('form-message')}>Email is required!</span>
                            )}
                            {Object.keys(errors).length !== 0 && errors.email?.type === 'pattern' && (
                                <span className={cx('form-message')}>Invalid email address!</span>
                            )}
                            {errorEmail && <span className={cx('form-message')}>This email is already exist!</span>}
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="username" className={cx('form-label')}>
                                USERNAME
                            </label>
                            <input
                                id="username"
                                name="username"
                                rules="required"
                                type="text"
                                placeholder="VD: diemtran2806"
                                className={cx('form-control')}
                                {...register('username', { required: true })}
                                onChange={handleChangeUsername}
                            />
                            {Object.keys(errors).length !== 0 && errors.username?.type === 'required' && (
                                <span className={cx('form-message')}>Username is required!</span>
                            )}
                            {errorUsername && (
                                <span className={cx('form-message')}>This username is already exist!</span>
                            )}
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="password" className={cx('form-label')}>
                                PASSWORD
                            </label>
                            <input
                                id="password"
                                name="password"
                                rules="required|min:6"
                                type="password"
                                placeholder="......."
                                className={cx('form-control')}
                                {...register('password', { required: true, minLength: 6 })}
                            />
                            {Object.keys(errors).length !== 0 && errors.password?.type === 'required' && (
                                <span className={cx('form-message')}>Password is required!</span>
                            )}
                            {Object.keys(errors).length !== 0 && errors.password?.type === 'minLength' && (
                                <span className={cx('form-message')}>Password must be 6 characters long!</span>
                            )}
                        </div>
                        {/* <div className={cx('textForm')}>
                            <span className={cx('checkbox-icon')}></span>
                            <span className={cx('textForm-detail')}>
                                I accept
                                <a href="/"> Quizlet terms of service </a>
                                and
                                <a href="/"> privacy policy</a>
                            </span>
                        </div> */}
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
