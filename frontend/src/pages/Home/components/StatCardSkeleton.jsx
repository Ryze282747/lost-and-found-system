import styles from './StatCardSkeleton.module.css';

function StatCardSkeleton() {
  return (
    <div
      className={styles.card}
      aria-hidden="true"
    >
      <div className={styles.header}>
        <div className={styles.label} />
        <div className={styles.icon} />
      </div>

      <div className={styles.value} />

      <div className={styles.footer} />
    </div>
  );
}

export default StatCardSkeleton;
