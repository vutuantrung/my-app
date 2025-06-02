import styles from './CardDavidMohseni.module.css';

const CardDavidMohseni = () => {
    return (
        <div className={styles['back']}>
            <div className={styles['card']}>
                <div className={styles['icon']}></div>

                <div className={styles['content']}>
                    <h3>Title</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur </p>
                </div>
            </div>
        </div>
    );
};

export default CardDavidMohseni;
