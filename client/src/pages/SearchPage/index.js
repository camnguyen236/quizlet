import classNames from 'classnames/bind';
import styles from './SearchPage.module.scss';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import StudySetsCard from '~/components/StudySetsCard';

const cx = classNames.bind(styles);
function SearchPage() {
    // const $ = document.querySelector.bind(document);
    // const $$ = document.querySelectorAll.bind(document);
    // const tabs = $$('.searchSubNav__tabList-item');
    // const tabActive = $('.searchSubNav__tabList-item.active');
    // const line = $('.searchSubNav__tabList .searchSubNav__tabList-line');
    // line.styles.left = tabActive.offsetLeft + 'px';
    // line.styles.width = tabActive.offsetWidth + 'px';
    // console.log(line);

    // tabs.forEach((tab) => {
    //     tab.onClick = function () {
    //         tabActive.classList.remove('active');
    //         // line.styles.left = this.offsetLeft + 'px';
    //         // line.styles.width = this.offsetWidth + 'px';
    //         this.classList.add('active');
    //     };
    // });

    return (
        <div className={cx('wrapper')}>
            <section className={cx('headerSearch')}>
                <div className={cx('headerSearch__container')}>
                    <div className={cx('searchArea')}>
                        <div className={cx('searchArea__inner')}>
                            <SearchOutlined className={cx('searchArea__inner-icon')} />
                            <input className={cx('searchArea__inner-text')} placeholder="Study sets" type="text" />
                            <CloseOutlined
                                className={cx('searchArea__inner-icon', {
                                    closeIcon: 'closeIcon',
                                })}
                            />
                        </div>
                    </div>
                    <div className={cx('searchSubNav')}>
                        <div className={cx('searchSubNav__wrapper')}>
                            <div className={cx('searchSubNav__tabList')}>
                                <div className={cx('searchSubNav__tabList-item')}>All results</div>
                                <div
                                    className={cx('searchSubNav__tabList-item')}
                                    onClick={(e) => {
                                        this.classList.add('active');
                                    }}
                                >
                                    Users
                                </div>
                                <div className={cx('line')}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx('searchResult')}>
                <div className={cx('searchResultView')}>
                    <div className={cx('searchResultView__header')}>
                        <h3>Study sets</h3>
                        <a href="" className={cx('searchResultView__header-link')}>
                            View all
                        </a>
                    </div>
                    <div className={cx('searchResultView__results')}>
                        <StudySetsCard />
                    </div>
                </div>
            </section>
            <div className={cx('modal')}>
                <div className={cx('modal-container')}></div>
            </div>
        </div>
    );
}

export default SearchPage;
