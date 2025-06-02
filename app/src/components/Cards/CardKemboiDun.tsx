import styles from './CardKemboiDun.module.css';
const CardKemboiDun = () => {
    return (
        <article className={styles['card']}>
            <div className={styles['temporary_text']}>Some big title here</div>
            <div className={styles['card_content']}>
                <span className={styles['card_title']}>This is a Title</span>
                <span className={styles['card_subtitle']}>
                    Thsi is a subtitle of this page. Let us see how it looks on the Web.
                </span>
                <p className={styles['card_description']}>
                    Lorem ipsum dolor, sit amet expedita exercitationem recusandae aut dolor tempora aperiam itaque possimus at,
                    cupiditate earum, quae repudiandae aspernatur? Labore minus soluta consequatur placeat.
                </p>
            </div>
        </article>
    );
};

export default CardKemboiDun;
