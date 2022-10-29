import React  from 'react';
import classNames from 'classnames/bind';
import styles from './ResetPwd2.module.scss'
import { useSelector } from 'react-redux';
import 'antd/dist/antd.min.css'
import axios from 'axios';

const cx = classNames.bind(styles);
function ResetPwd2() {
    const email = useSelector((state) => state.email.email)    
    const res =  axios
            .post('http://localhost:5000/email', {
               email : email
            })
            .then (() => {
                alert("Success");
            })
            .catch(() => {
                alert("Fail");
            });
    
 
    return ( 
        <div className={cx("resetPwd-wrapper")}>
            <div className={cx("resetPwd-background",{img_1:"img_1"})}></div>
            <div className={cx("resetPwd-background",{img_2:"img_2"})}></div>
            <div className={cx("resetPwd-background",{img_3:"img_3"})} ></div>
            <div  className={cx("resetPwd-container")}>
            <h2 className={cx('resetPwd-title')}>Check your email! | Quizlet</h2>
            <div >
                <form className={cx("resetPwd-form")} action="">
                    <p>{`We've sent an email to ${email}`}</p>
                    <p>Please check your spam folder if you don't see our email in your inbox.</p>
                    <p>
                        <a href="/">Need more help?</a>
                    </p>
                    <button >Send</button>
                </form>
            </div>
           </div>
        </div>
     );
}

export default ResetPwd2;