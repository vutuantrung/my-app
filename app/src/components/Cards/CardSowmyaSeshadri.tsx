import styles from './CardSowmyaSeshadri.module.css';

const CardSowmyaSeshadri = () => {
    return (
        <div className={styles['container']}>
            <div className={styles['overlay']}>
                <div className={styles['items']}></div>
                <div className={`${styles['items']} ${styles['head']}`}>
                    <p>Flower Embroidery Hoop Art</p>
                    <hr />
                </div>
                <div className={`${styles['items']} ${styles['price']}`}>
                    <p className={styles['old']}>$699</p>
                    <p className={styles['new']}>$345</p>
                </div>
                <div className={`${styles['items']} ${styles['cart']}`}>
                    <i className={`${styles['fa']} ${styles['fa-shopping-cart']}`}></i>
                    <span>ADD TO CART</span>
                </div>
            </div>
        </div>
    );
};

export default CardSowmyaSeshadri;
