// import React from 'react';
// import { Button } from 'antd';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Tippy from '@tippyjs/react/headless';
import Buttonn from '~/components/Buttonn';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

function Header() {
    const [searchResult, setSearchResult] = useState([]); //vì sau này kết quả là mảng

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]); //call API trong lày
        }, 3000);
    }, []);

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
                    <Tippy
                        interactive
                        visible={searchResult.length > 0}
                        render={(attrs) => (
                            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                {/* <PopperWrapper>
                                    <h4 className={cx('search-title')}>Recoment</h4>
                                    <AccountItem />
                                    <AccountItem />
                                    <AccountItem />
                                </PopperWrapper> */}
                            </div>
                        )}
                    >
                        <div className={cx('search')}>
                            <input placeholder="Study sets, textbook,..." spellCheck={false} />
                            <button className={cx('clear')}>
                                <CloseOutlined />
                            </button>
                            <button className={cx('search-btn')}>
                                <SearchOutlined />
                            </button>
                        </div>
                    </Tippy>
                    <div className={cx('btn-wrap')}>
                        {/* <button className={cx('btn-login')}>Login</button> */}
                        <Buttonn
                            text="btn-primary btn-primary--login"
                            content="Login"
                            onClick={(e) => {
                                window.location.replace('/login');
                            }}
                        ></Buttonn>
                    </div>
                    <Buttonn
                        text="btn-primary btn-primary--signup"
                        content="Sign up"
                        onClick={(e) => {
                            window.location.replace('/signup');
                        }}
                    ></Buttonn>
                </div>
            </div>
        </header>
    );
}

export default Header;
