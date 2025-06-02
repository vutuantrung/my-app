import styles from './CardAbanoubMagdy1.module.css';

const CardAbanoubMagdy1 = () => {
    return (
        <div className={styles['card']}>
            <div className={`${styles['img']} ${styles['img1']}`}></div>
            <div className={`${styles['img']} ${styles['img2']}`}></div>
            <div className={styles['card__content']}>
                <span className={styles['name']}>John Doe</span>
                <span className={styles['job']}>Software engineer</span>
            </div>
        </div>
    );
};

export default CardAbanoubMagdy1;
