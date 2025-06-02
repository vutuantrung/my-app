import { useEffect, useState } from 'react';
import styles from './FoodCart.module.css';
import PageHeader from '../../../Layouts/PageHeader';

const FoodCart = () => {
    const [closeModal, setCloseModal] = useState(false);
    const [docState, setDocState] = useState('');

    useEffect(() => {
        const cont_modal = document.querySelector(`.${styles['cont_modal']}`);
        if (closeModal) {
            cont_modal!.classList.remove(styles['cont_modal_active']);
        } else {
            cont_modal!.classList.add(styles['cont_modal_active']);
        }
    }, [closeModal]);

    useEffect(() => {
        if (document.readyState === 'complete') {
            setDocState(document.readyState);
        } else {
            document.onreadystatechange = () => {
                setDocState(document.readyState);
            };
        }
    }, []);

    useEffect(() => {
        if (docState === 'complete') {
            const cont_modal = document.querySelector(`.${styles['cont_modal']}`);
            cont_modal!.className = styles['cont_modal'];
        } else {
            setTimeout(() => {
                setDocState(document.readyState);
            }, 1000);
        }
    }, [docState]);
    return (
        <div>
            <PageHeader />
            <div className={styles['wrapper']}>
                <div className={styles['cont_principal']}>
                    <div className={styles['cont_central']}>
                        <div className={`${styles['cont_modal']} ${styles['cont_modal_active']}`}>
                            <div className={styles['cont_photo']}>
                                <div className={styles['cont_img_back']}>
                                    <img src="https://jjgirls.com/japanese/anri-okita/43/anri-okita-1.jpg" alt="" />
                                </div>
                                <div className={styles['cont_mins']}>
                                    <div className={styles['sub_mins']}>
                                        <h3>50</h3>
                                        <span>MINS</span>
                                    </div>
                                    <div className={styles['cont_icon_right']}>
                                        <a href="##">
                                            <i className="material-icons">&#xE8E7;</i>
                                        </a>
                                    </div>
                                </div>
                                <div className={styles['cont_servings']}>
                                    <h3>4</h3>
                                    <span>SERVINGS</span>
                                </div>
                                <div className={styles['cont_details']}>
                                    <h3>Anri Okita</h3>
                                    <p>
                                        orem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis est est aliquam, sed faucibus massa
                                        lobortis. Maecenas non est justo.
                                    </p>
                                </div>
                            </div>
                            <div className={styles['cont_text_ingredients']}>
                                <div className={styles['cont_over_hidden']}>
                                    <div className={styles['cont_tabs']}>
                                        <ul>
                                            <li>
                                                <a href="##">
                                                    <h4>INGREDIENTS</h4>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="##">
                                                    <h4>PREPARATION</h4>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className={styles['cont_text_det_preparation']}>
                                        <div className={styles['cont_title_preparation']}>
                                            <p>STEP 1</p>
                                        </div>
                                        <div className={styles['cont_info_preparation']}>
                                            <p>Heat oven to 375 degress</p>
                                        </div>
                                        <div className={styles['cont_text_det_preparation']}>
                                            <div className={styles['cont_title_preparation']}>
                                                <p>STEP 2</p>
                                            </div>
                                            <div className={styles['cont_info_preparation']}>
                                                <p>
                                                    Heat oil in a large skillet over medium-low head. Add onion and bell papper. Cook gently until
                                                    very soft, about 20 minutes. Add garlic and cook until tender, 1 to 2 minutes; stir in cumin,
                                                    paprika and cook 1 minute. Pour in tomatoes and season with 3/4 teaspoon salt and 1/4 teaspoon
                                                    pepper;
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['cont_btn_mas_dets']}>
                                        <a href="##">
                                            <i className="material-icons">&#xE313;</i>
                                        </a>
                                    </div>
                                </div>
                                <div className={styles['cont_btn_open_dets']}>
                                    <a href="#e" onClick={() => setCloseModal((prevState: boolean) => !prevState)}>
                                        <i className="material-icons">&#xE314;</i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCart;
