import styles from './CardGharsh11032000.module.css';

const CardGharsh11032000 = () => {
    return (
        <div className={styles['card']}>
            <img src="./assets/images/test/test_card_vertical.jpg" alt="" className={styles['card__backgroundImg']} />
            <div className={styles['card__content']}>
                <p className={styles['card__title']}>Card Title</p>
                <p className={styles['card__description']}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                </p>
            </div>
        </div>
    );
};

export default CardGharsh11032000;
