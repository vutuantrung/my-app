import styles from './CardAlexruix3.module.css';

const CardAlexruix3 = () => {
    return (
        <div className={styles['card']}>
            <div className={styles['imgbox']}>
                <div className={styles['img']}></div>
            </div>
            <div className={styles['details']}>
                <h2 className={styles['title']}>John Doe</h2>
                <span className={styles['caption']}>Developer</span>
            </div>
        </div>
    );
};

export default CardAlexruix3;
