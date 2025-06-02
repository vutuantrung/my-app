import styles from './CardElijahwgummerPoc.module.css';

const CardElijahwgummerPoc = () => {
    return (
        <div className={styles['card']}>
            <div className={styles['card-content']}>
                <div className={styles['card-title']}>Cool Card</div>
                <p className={styles['card-description']}>This is a cool card design.</p>
                <button className={styles['card-button']}>Click Me</button>
            </div>
        </div>
    );
};

export default CardElijahwgummerPoc;
