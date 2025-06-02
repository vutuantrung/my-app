import styles from './CardAlexruix.module.css';

const CardAlexruix = () => {
    return (
        <div className={styles['card']}>
            <div className={styles['card-front']}>
                <div className={styles['title']}>John Doe</div>
                <div className={styles['subtitle']}>Web Dev</div>
            </div>
            <div className={styles['card-back']}>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            </div>
        </div>
    );
};

export default CardAlexruix;
