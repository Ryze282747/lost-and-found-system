import Card from '../Card/Card.jsx';
import styles from './StatsCard.module.css';

function StatsCard({
  title,
  value,
  icon,
  description,
  color = 'primary',
}) {
  return (
    <Card className={styles.statsCard} padding="md">
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>

        <div className={`${styles.icon} ${styles[color]}`}>
          <i className={icon} aria-hidden="true" />
        </div>
      </div>

      <div className={styles.value}>{value}</div>

      {description && (
        <p className={styles.description}>{description}</p>
      )}
    </Card>
  );
}

export default StatsCard;
