import styles from './CardEduardoAmaroMaciel.module.css';

const CardEduardoAmaroMaciel = () => {
    return (
        <div className={styles['container']}>
            <div className={styles['card']}>
                <div className={`${styles['face']} ${styles['back']}`}>
                    <div className={styles['content']}>
                        <span className={styles['stars']}></span>
                        <b className={styles['desc']}>Hello</b>
                        <p className={styles['desc']}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                </div>
                <div className={`${styles['face']} ${styles['front']}`}>
                    <b>Hover</b>
                </div>
            </div>
        </div>
    );
};

export default CardEduardoAmaroMaciel;
