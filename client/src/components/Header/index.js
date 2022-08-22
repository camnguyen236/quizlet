// import React from 'react';
// import { Button } from 'antd';
import classNames from 'classnames/bind';
//import Tippy from '@tippyjs/react/headless';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BellOutlined, ProfileOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import styles from './Header.module.scss';
import Buttonn from '~/components/Buttonn';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from '../Search';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <ProfileOutlined />,
        title: 'Profile',
        to: '/profile',
    },
    {
        icon: <SettingOutlined />,
        title: 'Settings',
        to: '/settings',
    },
    {
        icon: <LogoutOutlined />,
        title: 'Log out',
        separate: true,
        to: '/',
    },
];

function Header() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    console.log(user);
    //const currentUser = true;

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-contentLeft')}>
                    <div className={cx('header-contentLeft__logo')}>
                        <img
                            src="https://logos-world.net/wp-content/uploads/2021/03/Quizlet-Logo.png"
                            className={cx('header-contentLeft__logo-img')}
                        />
                    </div>
                    <div className={cx('header-contentLeft__menu')}>
                        <a href="/" className={cx('header-contentLeft__menu-link')}>
                            <span className={cx('header-contentLeft__menu-span')}>Home</span>
                        </a>
                    </div>
                    <Buttonn text="btn-primary" content="Create"></Buttonn>
                </div>
                <div className={cx('header-contentRight')}>
                    <Search />
                    {user ? (
                        <div className={cx('current-user')}>
                            <button className={cx('notification')}>
                                <BellOutlined className={cx('notification__icon')} />
                            </button>
                            <Menu items={MENU_ITEMS}>
                                <Image
                                    className={cx('user-avatar')}
                                    //src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-vui-nhon.jpg"
                                    src=""
                                    alt=""
                                />
                            </Menu>
                            <span>{user.username}</span>
                        </div>
                    ) : (
                        <>
                            <div className={cx('btn-wrap')}>
                                <Buttonn text="btn-primary btn-primary--login" content="Login"></Buttonn>
                            </div>
                            <Buttonn
                                text="btn-primary btn-primary--signup"
                                content="Sign up"
                                onClick={(e) => {
                                    //window.location.replace('/signup');
                                    navigate('/signup');
                                }}
                            ></Buttonn>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
