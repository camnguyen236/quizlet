import React, { useState }  from 'react';
import classNames from 'classnames/bind';
import styles from './ResetPwd3.module.scss'
import 'antd/dist/antd.min.css'
import Input from '~/components/Input/Input';
import Error from '~/components/Error/Error';



const cx = classNames.bind(styles);
function ResetPwd3() {
    const[error,setError] = useState("")
    const [password,setPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [style,setStyle] = useState({display: "none"})
    const showError = (message) => {
        setError(message);
        setStyle({display:"block"})
    }
    const checkEmptyError = (password) => {
            const keys = Object.keys(password);
            for(let i = 0; i < keys.length; i++){
                let length = password[keys[i]].trim().length;
                if(length === 0) {
                    showError("Please enter a password"); 
                    return false;
                   }
            }
            return true;
    }
    const checkLogicError = (password) => {
        if(password.newPassword.trim() !== password.confirmPassword.trim()) {
            showError("Your passwords did not match. Please enter them again."); 
            return false;
        }
        return true;
    }
    const checkFormatError = (input) =>{
        const length = input.trim().length;
        if(length > 0 && length <= 3) {
            showError("Your password is too short. The minimum length is 6 characters."); 
            return false;
        }
        return true;
    }
    const handleSubmit = (e) => {   
        e.preventDefault();
        if(checkEmptyError(password))
        { 
            if(checkLogicError(password))
            {
                if(checkFormatError(password.newPassword))
                {
                    console.log(password);
                }
            }
            
        }
    }

    return ( 
        <div className={cx("resetPwd-wrapper")}>
            <div className={cx("resetPwd-background",{img_1:"img_1"})}></div>
            <div className={cx("resetPwd-background",{img_2:"img_2"})}></div>
            <div className={cx("resetPwd-background",{img_3:"img_3"})} ></div>
           <div  className={cx("resetPwd-container")}>
            <h2 className={cx('resetPwd-title')}>Reset Password for Chi687</h2>
            <div >
                <form className={cx("resetPwd-form")} action="">
                    <Error style={style} message={error}></Error>  
                    <Input 
                        value={password.newPassword}
                        type="password"
                        label="New password"
                        id="newPassword"
                        name="newPassword"
                        onChange={(e) => setPassword({...password,newPassword: e.target.value})}
                    />
                     <Input 
                        value={password.confirmPassword}
                        type="password"
                        label="Confirm password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={(e) => setPassword({...password,confirmPassword: e.target.value})}
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

export default ResetPwd3;