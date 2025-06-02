import styles from './CardArshshaikh06.module.css';

const CardArshshaikh06 = () => {
    return (
        <div className={styles['container']}>
            <div className={styles['palette']}>
                <div id="color1" className={styles['color']}>
                    <span>#CECE5A</span>
                </div>
                <div id="color2" className={styles['color']}>
                    <span>#FFE17B</span>
                </div>
                <div id="color3" className={styles['color']}>
                    <span>#FD8D14</span>
                </div>
                <div id="color4" className={styles['color']}>
                    <span>#C51605</span>
                </div>
                <div id="color-code">
                    <div id="color-code-bg"></div>
                    <div id="color-code-text"></div>
                </div>
            </div>
            <div id="footer">
                <div id="bookmarks">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>53421</span>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                </svg>
            </div>
        </div>
    );
};

export default CardArshshaikh06;
