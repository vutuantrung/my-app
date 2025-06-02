import styles from './CardAnthonyPreite.module.css';

const CardAnthonyPreite = () => {
    return (
        <div>
            <div className={`${styles['cards__card']} ${styles['card']}`}>
                <p className={styles['card__heading']}>Free Plan</p>
                <p className={styles['card__price']}>$0/month</p>
                <ul className={`${styles['card_bullets']} ${styles['flow']}`}>
                    <li>Access to all features</li>
                    <li>Unlimited storage</li>
                    <li>No ads</li>
                </ul>
                <a className={`${styles['card__cta']} ${styles['cta']}`} href="#basic">
                    Get Started
                </a>
            </div>
            <div className={styles['overlay cards__inner']}></div>
        </div>
    );
};

export default CardAnthonyPreite;
