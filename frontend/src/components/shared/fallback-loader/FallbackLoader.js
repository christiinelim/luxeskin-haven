import loadingGif from '../../../assets/images/main/loading.gif';
import styles from './styles.module.css';

const FallbackLoader = () => {
    return (
        <div className={styles['loading-wrapper']}>
            <div>
                <img src={loadingGif} alt='loading' />
            </div>
        </div>
    )
}

export default FallbackLoader