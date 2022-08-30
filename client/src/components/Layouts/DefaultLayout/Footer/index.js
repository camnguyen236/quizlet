import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('grid__row')}>
                    <div className={cx('grid__row-2-4')}>
                        <h3 className={cx('footer__heading')}>About us</h3>
                        <ul className={cx('footer-list')}>
                            <li className={cx('footer-item')}>
                                <a href="" className={cx('footer-item__link')}>
                                    About Quizlet
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="" className={cx('footer-item__link')}>
                                    How Quizlet works
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="" className={cx('footer-item__link')}>
                                    News
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('grid__row-2-4')}>
                        <h3 className={cx('footer__heading')}>For users</h3>
                        <ul className={cx('footer-list')}>
                            <li className={cx('footer-item')}>
                                <a href="" className={cx('footer-item__link')}>
                                    Flashcards
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="" className={cx('footer-item__link')}>
                                    Learn
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="" className={cx('footer-item__link')}>
                                    Solutions
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('grid__row-2-4')}>
                        <h3 className={cx('footer__heading')}>Resources</h3>
                        <ul className={cx('footer-list')}>
                            <li className={cx('footer-item')}>
                                <a href="" className={cx('footer-item__link')}>
                                    Help center
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="" className={cx('footer-item__link')}>
                                    Sign up
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="" className={cx('footer-item__link')}>
                                    Privacy
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('grid__row-2-4')}>
                        <h3 className={cx('footer__heading')}>Resources</h3>
                        <ul className={cx('footer-list')}>
                            <li className={cx('footer-item')}>
                                <a href="" className={cx('footer-item__link')}>
                                    Help center
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="" className={cx('footer-item__link')}>
                                    Sign up
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="" className={cx('footer-item__link')}>
                                    Privacy
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('grid__row-2-4')}>
                        <h3 className={cx('footer__heading')}>Resources</h3>
                        <ul className={cx('footer-list')}>
                            <li className={cx('footer-item')}>
                                <a href="" className={cx('footer-item__link')}>
                                    Help center
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="" className={cx('footer-item__link')}>
                                    Sign up
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="" className={cx('footer-item__link')}>
                                    Privacy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('grid__row')}>
                    <p>© 2022 Quizlet Inc.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
