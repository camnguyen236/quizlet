import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('home-img-wrapper')}>
                <div className={cx('home-img-inner')}>
                    <div className={cx('home-img-container')}>
                        <div className={cx('home-img-container__wrapper')}>
                            <img
                                src="https://images.prismic.io/quizlet-prod/eca927aa-4f86-4e40-9565-8dd2fefb2cde_hero+image+shaded.png?auto=compress,format"
                                className={cx('home-img-container__img')}
                            />
                        </div>
                        <div className={cx('home-img-container__content')}>
                            <div className={cx('home-img-container')}>
                                <div className={cx('home-img-container__text')}>
                                    <h1 className={cx('text')}>Learn it. Own it</h1>
                                    <h1 className={cx('text')}>Quizlet</h1>
                                    <p>
                                        With our ever-effective flashcards, an AI Learning Assistant and new expert
                                        <br />
                                        explanations, get a suite of science-backed study tools at your fingertips.
                                    </p>
                                </div>
                                <div className={cx('home-img-container__btn')}>
                                    <a href="/signup" className={cx('home-img-container__btn-link')}>
                                        <span>Get started</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className={cx('home-title')}>
                <div className={cx('home-img-container')}>
                    <h2 className={cx('home-title__text')}>
                        <p>
                            <em>90%</em>
                            users have improved their scores
                        </p>
                    </h2>
                </div>
            </section>
            <section className={cx('callouts')}>
                <div className={cx('home-img-container', { isMaxWidth: 'isMaxWidth' })}>
                    <div className={cx('callout-content')}>
                        <div className={cx('callout-content__description')}>
                            <h1 className={cx('callout-content__title')}>
                                You just have to study,
                                <br />
                                everything will become simple.
                            </h1>
                            <p>
                                From flashcards to help you learn English, to games that make learning history easy,
                                <br /> you can use a variety of tools to conquer any challenge.
                            </p>
                        </div>
                        <div className={cx('callout-content__img', { rightImage: 'rightImage' })}>
                            <img
                                src="https://images.prismic.io/quizlet-prod/d4052d90-f71e-466a-86f5-080cf02de2da_20210814_QZ_Home_Flashcards.png?auto=compress,format&rect=0,2,3072,2395&w=1026&h=800"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx('space')}></section>
            <section className={cx('callouts')}>
                <div className={cx('home-img-container', { isMaxWidth: 'isMaxWidth' })}>
                    <div className={cx('callout-content', { imageDescription: 'imageDescription' })}>
                        <div className={cx('callout-content__description')}>
                            <h1 className={cx('callout-content__title')}>Your next success is very close</h1>
                            <p>
                                Every new knowledge you learn is an achievement.
                                <br />
                                Quizlet breaks down topics and subjects to help you improve day by day.
                            </p>
                        </div>
                        <div className={cx('callout-content__img', { leftImage: 'leftImage' })}>
                            <img
                                src="https://images.prismic.io/quizlet-prod/3a92729c-f212-4ac0-8dad-b2c875c57358_20210814_QZ_Home_StudyJam.png?auto=compress,format&rect=0,2,3072,2395&w=1026&h=800"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx('space')}></section>
            <section className={cx('callouts')}>
                <div className={cx('home-img-container', { isMaxWidth: 'isMaxWidth' })}>
                    <div className={cx('callout-content')}>
                        <div className={cx('callout-content__description')}>
                            <h1 className={cx('callout-content__title')}>
                                Don't be discouraged,
                                <br />
                                let's make an effort.
                            </h1>
                            <p>
                                When even the smallest lesson brings a sense of victory,
                                <br />
                                you will be more motivated to keep going.
                            </p>
                        </div>
                        <div className={cx('callout-content__img', { rightImage: 'rightImage' })}>
                            <img
                                src="https://images.prismic.io/quizlet-prod/6b2ff704-ccbf-441e-9b49-dbd3b7d7d530_20210814_QZ_Home_MobileApp.png?auto=compress,format&rect=0,2,3072,2395&w=1026&h=800"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx('space')}></section>
            <section className={cx('home-title')}>
                <div className={cx('home-img-container')}>
                    <h2 className={cx('home-title__text')}>
                        <p>Are you ready to improve your score?</p>
                    </h2>
                    <div className={cx('home-img-container__btn', { widthBtn: 'widthBtn' })}>
                        <a href="/signup" className={cx('home-img-container__btn-link')}>
                            <span>Get started</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
