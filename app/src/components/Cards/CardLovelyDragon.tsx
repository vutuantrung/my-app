import styles from './CardLovelyDragon.module.css';

const CardLovelyDragon = () => {
    return (
        <>
            <div className={styles['card']}>
                <div className={styles['blob']}></div>
                <span className={styles['img']}></span>
                <h2>John Doe</h2>
            </div>
        </>
    );
};

export default CardLovelyDragon;
