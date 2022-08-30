import classNames from 'classnames/bind';
import styles from './StudySetsCard.module.scss';

const cx = classNames.bind(styles);

function StudySetsCard() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('studySetsCard__inner')}>
                <div className={cx('studySetsCard__header')}>
                    <h5 className={cx('studySetsCard__header-title')}>Math</h5>
                    <div className={cx('studySetsCard__header-content')}>
                        <div className={cx('studySetsCard__header-terms')}>124 terms</div>
                        <div className={cx('studySetsCard__header-terms')}>124 terms</div>
                    </div>
                </div>
                <div className={cx('studySetsCard__footer')}>
                    <div className={cx('studySetsCard__creator')}>
                        <img src="" />
                        <span>imeidthiz</span>
                    </div>
                    <button className={cx('studySetsCard__btn')}>Preview</button>
                </div>
            </div>
        </div>
    );
}

export default StudySetsCard;
