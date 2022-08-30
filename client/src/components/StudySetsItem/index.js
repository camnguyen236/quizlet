import classNames from 'classnames/bind';
import styles from './StudySetsItem.module.scss';
import { SearchOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

function StudySetsItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <SearchOutlined className={cx('search-icon')} />
            <div className={cx('nameStudySets')}>{data.nameStudySets}</div>
        </div>
    );
}

export default StudySetsItem;
