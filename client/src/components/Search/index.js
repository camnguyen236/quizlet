import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import StudySetsItem from '../StudySetsItem';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]); //vì sau này kết quả là mảng
    const [showResult, setShowResult] = useState(true);

    const inputRef = useRef();

    useEffect(() => {
        // setTimeout(() => {
        //     setSearchResult([1, 2]); //call API trong lày
        // }, 3000);
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }
        fetch('')
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data);
            });
    }, [searchValue]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <Tippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Study sets</h4>
                        {searchResult.map((result) => {
                            <StudySetsItem key={result.id} data={result} />;
                        })}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Study sets, textbook,..."
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={(e) => setShowResult(true)}
                />
                {!!searchValue && (
                    <button
                        className={cx('clear')}
                        onClick={(e) => {
                            setSearchValue('');
                            setSearchResult([]);
                            inputRef.current.focus();
                        }}
                    >
                        <CloseOutlined />
                    </button>
                )}
                <button className={cx('search-btn')}>
                    <SearchOutlined />
                </button>
            </div>
        </Tippy>
    );
}

export default Search;
