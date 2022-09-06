import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { createAxios } from '~/createInstance';
import { logoutSuccess } from '~/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '~/redux/apiRequest';
const cx = classNames.bind(styles);
function MenuItem({ data }) {
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;
    const id = user?.id;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let temp = data.title;

    let axiosJWT = createAxios(user, dispatch, logoutSuccess);

    const handleLogout = () => {
        logOut(dispatch, id, navigate, accessToken, axiosJWT);
    };
    const handleNavigate = (e) => {
        navigate(data.to);
    };
    return (
        <div
            className={cx('wrapMenuButton', {
                separate: data.separate,
            })}
        >
            <div className={cx('menuButton__icon')}>{data.icon}</div>
            <button className={cx('menuButton__title')} onClick={temp === 'Log out' ? handleLogout : handleNavigate}>
                {data.title}
            </button>
        </div>
    );
}

export default MenuItem;
