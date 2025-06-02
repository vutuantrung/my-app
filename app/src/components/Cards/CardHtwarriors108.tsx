import styles from './CardHtwarriors108.module.css';

const CardHtwarriors108 = () => {
    return (
        <div className={styles['myCard']}>
            <div className={styles['innerCard']}>
                <div className={styles['frontSide']}>
                    <p className={styles['title']}>FRONT SIDE</p>
                    <p>Hover Me</p>
                </div>
                <div className={styles['backSide']}>
                    <p className={styles['title']}>BACK SIDE</p>
                    <p>Leave Me</p>
                </div>
            </div>
        </div>
    );
};

export default CardHtwarriors108;
