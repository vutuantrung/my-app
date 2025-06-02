import PageHeader from '../../../Layouts/PageHeader';
import styles from './ClipBlinds.module.css';

const ClipBlinds = () => {
    return (
        <div>
            <PageHeader />
            <div>
                <div id={styles['background_clipBlinds']} className={styles['clip_clipBlinds']}></div>
                <div id={styles['clip_clipBlinds_3']} className={styles['clip_clipBlinds']}></div>
                <div id={styles['clip_clipBlinds_4']} className={styles['clip_clipBlinds']}></div>
                <div id={styles['clip_clipBlinds_a']} className={styles['clip_clipBlinds']}></div>
                <div id={styles['clip_clipBlinds_1']} className={styles['clip_clipBlinds']}></div>
                <div id={styles['clip_clipBlinds_2']} className={styles['clip_clipBlinds']}></div>
                <div id={styles['clip_clipBlinds_b']} className={styles['clip_clipBlinds']}></div>
            </div>
        </div>
    );
};
export default ClipBlinds;
