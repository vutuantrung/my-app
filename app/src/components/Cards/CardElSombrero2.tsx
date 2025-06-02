import { IMAGES } from '../../constants';
import styles from './CardElSombrero2.module.css';

const CardElSombrero2 = () => {
    return (
        <div className={styles['card']}>
            <div className={styles['content']}>
                <div className={styles['back']}>
                    <div className={styles['back-content']}>
                        <img src={IMAGES.pizza} alt="" />
                        <strong>Hover Me</strong>
                    </div>
                </div>
                <div className={styles['front']}>
                    <div className={styles['img']}>
                        <div className={styles['circle']}></div>
                        <div className={styles['circle']} id="right"></div>
                        <div className={styles['circle']} id="bottom"></div>
                    </div>

                    <div className={styles['front-content']}>
                        <small className={styles['badge']}>Pasta</small>
                        <div className={styles['description']}>
                            <div className={styles['title']}>
                                <p className={styles['title']}>
                                    <strong>Spaguetti Bolognese</strong>
                                </p>
                                <svg
                                    fill-rule="nonzero"
                                    height="15px"
                                    width="15px"
                                    viewBox="0,0,256,256"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        text-anchor="none"
                                        font-size="none"
                                        font-weight="none"
                                        font-family="none"
                                        stroke-dashoffset="0"
                                        stroke-dasharray=""
                                        stroke-miterlimit="10"
                                        stroke-linejoin="miter"
                                        stroke-linecap="butt"
                                        stroke-width="1"
                                        stroke="none"
                                        fill-rule="nonzero"
                                        fill="#20c997"
                                    >
                                        <g transform="scale(8,8)">
                                            <path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <p className={styles['card-footer']}>30 Mins &nbsp; | &nbsp; 1 Serving</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardElSombrero2;
