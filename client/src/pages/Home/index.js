import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import homeee from '~/assets/img';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <img
                src="https://clipartix.com/wp-content/uploads/2016/12/Clipart-background-clipart-free-download-2.jpg"
                className={cx('home-img')}
            />
            <img src={homeee.home} alt="home" className={cx('hom')} />
        </div>
    );
}

export default Home;
