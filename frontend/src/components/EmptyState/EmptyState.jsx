
import styles from './EmptyState.module.css';

function EmptyState({
  icon = 'ri-inbox-line',
  title = 'Nothing here yet',
  description = 'There are no items to display right now.',
  actionLabel,
  onAction,
}) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.iconWrapper}>
        <i className={icon} aria-hidden="true" />
      </div>

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.description}>{description}</p>

      {actionLabel && onAction && (
        <button
          type="button"
          className={styles.actionButton}
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
