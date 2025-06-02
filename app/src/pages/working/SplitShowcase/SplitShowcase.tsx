import { useEffect, useState } from 'react';
import styles from './SplitShowcase.module.css';
import PageHeader from '../../../Layouts/PageHeader';

const SplitShowcase = () => {
    const [docState, setDocState] = useState('');

    useEffect(() => {
        if (document.readyState === 'complete') {
            setDocState(document.readyState);
        } else {
            document.onreadystatechange = () => {
                setDocState(document.readyState);
            };
        }
    }, []);

    useEffect(() => {
        if (docState === 'complete') {
            const $cont = document.querySelector(`.${styles['cont']}`);
            const $elsArr = [].slice.call(document.querySelectorAll(`.${styles['el']}`));
            const $closeBtnsArr = [].slice.call(document.querySelectorAll(`.${styles['el__close-btn']}`));

            setTimeout(function () {
                $cont!.classList.remove(styles['s--inactive']);
            }, 200);

            $elsArr.forEach(function ($el) {
                ($el as any).addEventListener('click', function () {
                    if (this.classList.contains(styles['s--active'])) return;
                    $cont!.classList.add(styles['s--el-active']);
                    this.classList.add(styles['s--active']);
                });
            });

            $closeBtnsArr.forEach(function ($btn) {
                ($btn as any).addEventListener('click', function (e: any) {
                    e.stopPropagation();
                    $cont!.classList.remove(styles['s--el-active']);
                    document.querySelector(`.${styles['el']}.${styles['s--active']}`)!.classList.remove(styles['s--active']);
                });
            });
        } else {
            setTimeout(() => {
                setDocState(document.readyState);
            }, 1000);
        }
    }, [docState]);
    return (
        <div className={styles['wrapper']}>
            <PageHeader />
            <div className={`${styles['cont']} ${styles['s--inactive']}`}>
                <div className={styles['cont__inner']}>
                    <div className={styles['el']}>
                        <div className={styles['el__overflow']}>
                            <div className={styles['el__inner']}>
                                <div className={styles['el__bg']}></div>
                                <div className={styles['el__preview-cont']}>
                                    <h2 className={styles['el__heading']}>奈汐酱nice</h2>
                                </div>
                                <div className={styles['el__content']}>
                                    <div className={styles['el__text']}>Whatever</div>
                                    <div className={styles['el__close-btn']}></div>
                                </div>
                            </div>
                        </div>
                        <div className={styles['el__index']}>
                            <div className={styles['el__index-back']}>奈汐酱nice</div>
                            <div className={styles['el__index-front']}>
                                <div className={styles['el__index-overlay']} data-index="1">
                                    1
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['el']}>
                        <div className={styles['el__overflow']}>
                            <div className={styles['el__inner']}>
                                <div className={styles['el__bg']}></div>
                                <div className={styles['el__preview-cont']}>
                                    <h2 className={styles['el__heading']}>Son Yeeun 손예은</h2>
                                </div>
                                <div className={styles['el__content']}>
                                    <div className={styles['el__text']}>Whatever</div>
                                    <div className={styles['el__close-btn']}></div>
                                </div>
                            </div>
                        </div>
                        <div className={styles['el__index']}>
                            <div className={styles['el__index-back']}>Son Yeeun 손예은</div>
                            <div className={styles['el__index-front']}>
                                <div className={styles['el__index-overlay']} data-index="2">
                                    2
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['el']}>
                        <div className={styles['el__overflow']}>
                            <div className={styles['el__inner']}>
                                <div className={styles['el__bg']}></div>
                                <div className={styles['el__preview-cont']}>
                                    <h2 className={styles['el__heading']}>Bambi 밤비</h2>
                                </div>
                                <div className={styles['el__content']}>
                                    <div className={styles['el__text']}>Whatever</div>
                                    <div className={styles['el__close-btn']}></div>
                                </div>
                            </div>
                        </div>
                        <div className={styles['el__index']}>
                            <div className={styles['el__index-back']}>Bambi 밤비</div>
                            <div className={styles['el__index-front']}>
                                <div className={styles['el__index-overlay']} data-index="3">
                                    3
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['el']}>
                        <div className={styles['el__overflow']}>
                            <div className={styles['el__inner']}>
                                <div className={styles['el__bg']}></div>
                                <div className={styles['el__preview-cont']}>
                                    <h2 className={styles['el__heading']}>Jeong Bomi 정보미</h2>
                                </div>
                                <div className={styles['el__content']}>
                                    <div className={styles['el__text']}>Whatever</div>
                                    <div className={styles['el__close-btn']}></div>
                                </div>
                            </div>
                        </div>
                        <div className={styles['el__index']}>
                            <div className={styles['el__index-back']}>Jeong Bomi 정보미</div>
                            <div className={styles['el__index-front']}>
                                <div className={styles['el__index-overlay']} data-index="4">
                                    4
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['el']}>
                        <div className={styles['el__overflow']}>
                            <div className={styles['el__inner']}>
                                <div className={styles['el__bg']}></div>
                                <div className={styles['el__preview-cont']}>
                                    <h2 className={styles['el__heading']}>美七Mia</h2>
                                </div>
                                <div className={styles['el__content']}>
                                    <div className={styles['el__text']}>Whatever</div>
                                    <div className={styles['el__close-btn']}></div>
                                </div>
                            </div>
                        </div>
                        <div className={styles['el__index']}>
                            <div className={styles['el__index-back']}>美七Mia</div>
                            <div className={styles['el__index-front']}>
                                <div className={styles['el__index-overlay']} data-index="5">
                                    5
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SplitShowcase;
