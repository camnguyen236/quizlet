import classNames from 'classnames/bind';
import styles from './HomeLogined.module.scss';

const cx = classNames.bind(styles);

function HomeLogined() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('dashBoardPage')}>
                <div className={cx('dashBoardPage-main')}>
                    <div className={cx('dashBoardPage-main__welcome')}>
                        <div className={cx('dashBoardPage-main__welcome-content')}>
                            <div className={cx('dashBoardPage-main__welcome-text')}>
                                <h3>Welcome to Quizlet!</h3>
                                <div>
                                    <div className={cx('text-item')}>Create an account</div>
                                    <div className={cx('text-item')}>Create or find study sets</div>
                                    <div className={cx('text-item')}>Study Math in Flashcards or Learn more</div>
                                </div>
                            </div>
                            <div className={cx('dashBoardPage-main__welcome-img')}>
                                <div className={cx('dashBoardPage-main__welcome-bgImg')}></div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('dashBoardPage-main')}>
                        <div className={cx('dashBoardPage-main-content')}>
                            <div className={cx('dashBoardPage-main-text')}>
                                <span>Achievements</span>
                                <a href="" className={cx('achievement-link')}>
                                    View all
                                </a>
                            </div>
                            <div className={cx('dashBoardPage-main__achivement-card')}>
                                <div className={cx('dashBoardPage-main__achivement-medal')}>
                                    <div className={cx('medal-item', { isActive: 'isActive' })}>
                                        <div className={cx('medal-item__icon')}>
                                            <span>5</span>
                                        </div>
                                        <div>5-day streak</div>
                                        <div className={cx('medal-item__text')}>Earned</div>
                                    </div>
                                    <div className={cx('medal-item', { isInactive: 'isInactive' })}>
                                        <div className={cx('medal-item__icon')}>
                                            <span>7</span>
                                        </div>
                                        <div>7-day streak</div>
                                        {/* <div className={cx('medal-item__text')}>Earned</div> */}
                                    </div>
                                    <div className={cx('medal-item', { isInactive: 'isInactive' })}>
                                        <div className={cx('medal-item__icon')}>
                                            <span>10</span>
                                        </div>
                                        <div>10-day streak</div>
                                        {/* <div className={cx('medal-item__text')}>Earned</div> */}
                                    </div>
                                    <div className={cx('medal-item', { isInactive: 'isInactive' })}>
                                        <div className={cx('medal-item__icon')}>
                                            <span>20</span>
                                        </div>
                                        <div>20-day streak</div>
                                        {/* <div className={cx('medal-item__text')}>Earned</div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('dashBoardPage-main')}>
                        <div className={cx('dashBoardPage-main-content')}>
                            <div className={cx('dashBoardPage-main-text')}>
                                <span>Recent</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeLogined;
