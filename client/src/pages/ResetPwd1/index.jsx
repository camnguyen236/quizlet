import React, { useState }  from 'react';
import classNames from 'classnames/bind';
import styles from './ResetPwd1.module.scss'
import 'antd/dist/antd.min.css'
import Input from '~/components/Input/Input';
import Error from '~/components/Error/Error';

const cx = classNames.bind(styles);
function ResetPwd() {
    const[error,setError] = useState("")
    const [input,setInput] = useState("");
    const [style,setStyle] = useState({display: "none"})
    const showError = (message) => {
        setError(message);
        setStyle({display:"block"})
    }
    const checkEmptyError = (input) =>{
            let length = input.trim().length;
            if(length === 0) {
                showError("You did not enter a username")
                return false;
               }
        return true;
    }
    const handleSubmit = (e) => {   
        e.preventDefault();
        if(checkEmptyError(input))
        {
            console.log(input);
            window.location.replace('/forgotten/password');  

        }
    
    }
    return ( 
        <div className={cx("resetPwd-wrapper")}>
            <div className={cx("resetPwd-background",{img_1:"img_1"})}></div>
            <div className={cx("resetPwd-background",{img_2:"img_2"})}></div>
            <div className={cx("resetPwd-background",{img_3:"img_3"})} ></div>
           <div  className={cx("resetPwd-container")}>
            <h2 className={cx('resetPwd-title')}>Reset your password</h2>
            <div >
                <form className={cx("resetPwd-form")} action="">
                    <Error style={style} message={error}></Error>  
                    <p>Enter your Quizlet username or the email address you signed up with. We'll email you a link to log in and reset your password.</p>
                    <Input 
                        value={input}
                        type="text"
                        label="Username or email address"
                        placeholder="Username or email address"
                        id="username"
                        name="username"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <div>
                    <button onClick={handleSubmit} className={cx('login-btn',{submit_btn:"submit_btn"})} type="submit">Submit</button>  
                    </div>
                </form>
            </div>
           </div>
        </div>
     );
}

export default ResetPwd;