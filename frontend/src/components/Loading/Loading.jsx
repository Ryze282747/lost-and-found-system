
import styles from './Loading.module.css';

function Loading({
  message = 'Loading, please wait...',
  fullPage = false,
}) {
  return (
    <div
      className={`${styles.loading} ${
        fullPage ? styles.fullPage : ''
      }`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.loader} aria-hidden="true">
        <span className={styles.loaderRing} />
        <i className="ri-search-eye-line" />
      </div>

      <p className={styles.message}>{message}</p>
      <span className={styles.srOnly}>Loading</span>
    </div>
  );
}

export default Loading;
