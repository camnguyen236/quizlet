import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function MenuItem({ data }) {
    const navigate = useNavigate();
    return (
        <div
            className={cx('wrapMenuButton', {
                separate: data.separate,
            })}
        >
            <div className={cx('menuButton__icon')}>{data.icon}</div>
            <button
                className={cx('menuButton__title')}
                onClick={(e) => {
                    navigate(data.to);
                }}
            >
                {data.title}
            </button>
        </div>
    );
}

export default MenuItem;
