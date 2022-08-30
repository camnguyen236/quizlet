import Input from '~/components/Input/Input';
import classNames from 'classnames/bind';
import styles from './CreateStudySet.module.scss';

const cx = classNames.bind(styles);
function CreateStudySet() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('create-set-header')}>
                <div className={cx('UIContainer')}>
                    <div className={cx('create-set-heading')}>
                        <div className={cx('heading-text')}>
                            <span>Create a new study set</span>
                        </div>
                    </div>
                </div>
                <div className={cx('UIContainer')}>
                    <div className={cx('title-description-wrapper')}>
                        <div className={cx('title')}>
                            <Input
                                // value={info.username}
                                // onChange={e => setInfo({...info,username: e.target.value})}
                                type="text"
                                label="Title"
                                placeholder='Enter a title, like "Biology-Chapter 22: Evolution"'
                                id="title"
                                name="title"
                            />
                        </div>
                        <div className={cx('description')}>
                            <Input
                                // value={info.username}
                                // onChange={e => setInfo({...info,username: e.target.value})}
                                type="text"
                                label="description"
                                placeholder="Add a description"
                                id="description"
                                name="description"
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('UIContainer')}>
                    <div className={cx('create-set-permissions')}>
                        <div className={cx('permissions-wrapper')}>
                            <span>Create a new study set</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateStudySet;
