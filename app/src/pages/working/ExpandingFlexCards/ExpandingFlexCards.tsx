import { useEffect, useState } from 'react';
import styles from './ExpandingFlexCards.module.css';
import PageHeader from '../../../Layouts/PageHeader';

const ExpandingFlexCards = () => {
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
            $('.' + CSS.escape(styles['option'])).on('click', function () {
                console.log('clcickede');
                $('.' + CSS.escape(styles['option'])).removeClass(styles['active']);
                $(this).addClass(styles['active']);
            });
        } else {
            setTimeout(() => {
                setDocState(document.readyState);
            }, 1000);
        }
    }, [docState]);
    return (
        <div style={{ width: '100vw' }}>
            <PageHeader />
            <div className={styles['wrapper_option']}>
                <div className={styles['options']}>
                    <div className={`${styles['option']} ${styles['active']} ${styles['option_0']}`}>
                        <div className={styles['shadow']}></div>
                        <div className={styles['label']}>
                            <div className={styles['icon']}>
                                <img src="../../../assets/images/test/avatar_instructor/anri-okita-avatar.jpg" alt="" />
                            </div>
                            <div className={styles['info']}>
                                <div className={styles['main']}>Anri Okita</div>
                                <div className={styles['sub']}>Omuke trughte a otufta</div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles['option']} ${styles['option_1']}`}>
                        <div className={styles['shadow']}></div>
                        <div className={styles['label']}>
                            <div className={styles['icon']}>
                                <img src="../../../assets/images/test/avatar_instructor/airi-suzumura-avatar.jpg" alt="" />
                            </div>
                            <div className={styles['info']}>
                                <div className={styles['main']}>Airi Suzumura</div>
                                <div className={styles['sub']}>Omuke trughte a otufta</div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles['option']} ${styles['option_2']}`}>
                        <div className={styles['shadow']}></div>
                        <div className={styles['label']}>
                            <div className={styles['icon']}>
                                <img src="../../../assets/images/test/avatar_instructor/koharu-suzuki-avatar.jpg" alt="" />
                            </div>
                            <div className={styles['info']}>
                                <div className={styles['main']}>Koharu Suzuki</div>
                                <div className={styles['sub']}>Omuke trughte a otufta</div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles['option']} ${styles['option_3']}`}>
                        <div className={styles['shadow']}></div>
                        <div className={styles['label']}>
                            <div className={styles['icon']}>
                                <img src="../../../assets/images/test/avatar_instructor/nodoka-sakuraha-avatar.jpg" alt="" />
                            </div>
                            <div className={styles['info']}>
                                <div className={styles['main']}>Bodoka Sakuraha</div>
                                <div className={styles['sub']}>Omuke trughte a otufta</div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles['option']} ${styles['option_4']}`}>
                        <div className={styles['shadow']}></div>
                        <div className={styles['label']}>
                            <div className={styles['icon']}>
                                <img src="../../../assets/images/test/avatar_instructor/hibiki-natsume-avatar.jpg" alt="" />
                            </div>
                            <div className={styles['info']}>
                                <div className={styles['main']}>Hibiki Natsume</div>
                                <div className={styles['sub']}>Omuke trughte a otufta</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpandingFlexCards;
