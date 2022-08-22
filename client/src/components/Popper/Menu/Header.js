import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function Header({ info }) {
    return (
        <header className={cx('header')}>
            <h4 className={cx('username')}>{info.username}</h4>
            <span className={cx('email')}>{info.email}</span>
        </header>
    );
}

export default Header;
