import styles from './CardJaydipPrajapati1910.module.css';

const CardJaydipPrajapati1910 = () => {
    return (
        <div>
            <div className={styles['card']}>
                <div className={styles['card-header']}>
                    <div className={styles['card-header-bar']}>
                        <a className={styles['btn-message']} href="##">
                            <svg
                                viewBox="0 0 16 16"
                                className={styles['bi bi-chat-dots-fill']}
                                fill="white"
                                height="16"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                            </svg>
                            <span className={styles['sr-only']}>Message</span>
                        </a>
                        <a className={styles['btn-menu']} href="##">
                            <svg
                                viewBox="0 0 16 16"
                                className={`${styles['bi']} ${styles['bi-list']}`}
                                fill="white"
                                height="16"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                                    fill-rule="evenodd"
                                ></path>
                            </svg>
                            <span className={styles['sr-only']}>Menu</span>
                        </a>
                    </div>
                    <span className={styles['image']}>Image Here</span>
                    <div className={styles['card-header-slanted-edge']}></div>
                </div>

                <div className={styles['card-body']}>
                    <span className={styles['name']}>John Smith</span>
                    <br />
                    <span className={styles['job-title']}>
                        <u>Product Designer</u>
                    </span>
                    <div className={styles['bio']}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, aperiam.
                    </div>
                    <div className={styles['social-accounts']}>
                        <a href="#">
                            <svg
                                viewBox="0 0 16 16"
                                className={`${styles['bi']} ${styles['bi-facebook']}`}
                                fill="grey"
                                height="16"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                            </svg>
                            <span className={styles['sr-only']}>facebook</span>
                        </a>
                        <a href="#">
                            <svg
                                viewBox="0 0 16 16"
                                className={`${styles['bi']} ${styles['bi-twitter']}`}
                                fill="grey"
                                height="16"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                            </svg>
                            <span className={styles['sr-only']}>Twitter</span>
                        </a>
                        <a href="##">
                            <svg
                                viewBox="0 0 16 16"
                                className={`${styles['bi']} ${styles['bi-instagram']}`}
                                fill="grey"
                                height="16"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                            </svg>
                            <span className={styles['sr-only']}>Instagram</span>
                        </a>
                    </div>
                </div>

                <div className={styles['card-footer']}>
                    <div className={styles['stats']}>
                        <div className={styles['stat']}>
                            <span className={styles['label']}>Following</span>
                            <span className={styles['value']}>56K</span>
                        </div>
                        <div className={styles['stat']}>
                            <span className={styles['label']}>Followers</span>
                            <span className={styles['value']}>940</span>
                        </div>
                        <div className={styles['stat']}>
                            <span className={styles['label']}>Likes</span>
                            <span className={styles['value']}>320</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardJaydipPrajapati1910;
