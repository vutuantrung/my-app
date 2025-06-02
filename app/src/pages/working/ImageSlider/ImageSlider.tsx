import { useEffect, useState } from 'react';
import styles from './ImageSlider.module.css';
import PageHeader from '../../../Layouts/PageHeader';

const ImageSlider = () => {
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
            const next = document.querySelector(`.${styles['next']}`);
            const prev = document.querySelector(`.${styles['prev']}`);

            next?.addEventListener('click', function () {
                let items = document.querySelectorAll(`.${styles['item']}`);
                document.querySelector(`.${styles['slide']}`)!.appendChild(items[0]);
            });

            prev?.addEventListener('click', function () {
                let items = document.querySelectorAll(`.${styles['item']}`);
                document.querySelector(`.${styles['slide']}`)!.prepend(items[items.length - 1]); // here the length of items = 6
            });
        } else {
            setTimeout(() => {
                setDocState(document.readyState);
            }, 1000);
        }
    }, [docState]);

    return (
        <div>
            <PageHeader />
            <div className={styles['container']}>
                <div className={styles['slide']}>
                    <div className={`${styles['item']} ${styles['item_0']}`}>
                        <div className={styles['content']}>
                            <div className={styles['name']}>Switzerland</div>
                            <div className={styles['des']}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                            <button>See More</button>
                        </div>
                    </div>
                    <div className={`${styles['item']} ${styles['item_1']}`}>
                        {' '}
                        <div className={styles['content']}>
                            <div className={styles['name']}>Finland</div>
                            <div className={styles['des']}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                            <button>See More</button>
                        </div>
                    </div>
                    <div className={`${styles['item']} ${styles['item_2']}`}>
                        {' '}
                        <div className={styles['content']}>
                            <div className={styles['name']}>Iceland</div>
                            <div className={styles['des']}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                            <button>See More</button>
                        </div>
                    </div>
                    <div className={`${styles['item']} ${styles['item_3']}`}>
                        {' '}
                        <div className={styles['content']}>
                            <div className={styles['name']}>Australia</div>
                            <div className={styles['des']}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                            <button>See More</button>
                        </div>
                    </div>
                    <div className={`${styles['item']} ${styles['item_4']}`}>
                        {' '}
                        <div className={styles['content']}>
                            <div className={styles['name']}>Netherland</div>
                            <div className={styles['des']}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                            <button>See More</button>
                        </div>
                    </div>
                    <div className={`${styles['item']} ${styles['item_5']}`}>
                        {' '}
                        <div className={styles['content']}>
                            <div className={styles['name']}>Ireland</div>
                            <div className={styles['des']}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                            <button>See More</button>
                        </div>
                    </div>
                </div>

                <div className={styles['button']}>
                    <button className={styles['prev']}>
                        <i className={styles['fa-solid fa-arrow-left']}></i>
                    </button>
                    <button className={styles['next']}>
                        <i className={styles['fa-solid fa-arrow-right']}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
