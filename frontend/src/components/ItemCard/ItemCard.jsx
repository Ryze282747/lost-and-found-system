
import { Link } from 'react-router-dom';

import Card from '../Card/Card.jsx';
import styles from './ItemCard.module.css';

function ItemCard({
  image,
  name,
  category,
  status = 'lost',
  location,
  date,
  to,
}) {
  const normalizedStatus = status.toLowerCase();

  const statusLabels = {
    lost: 'Lost',
    found: 'Found',
    pending: 'Pending',
    claimed: 'Claimed',
  };

  const statusLabel = statusLabels[normalizedStatus] ?? status;

  const content = (
    <>
      <div className={styles.imageWrapper}>
        {image ? (
          <img
            className={styles.image}
            src={image}
            alt={name}
            loading="lazy"
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <i className="ri-image-line" aria-hidden="true" />
            <span>No image available</span>
          </div>
        )}

        <span
          className={`${styles.status} ${styles[normalizedStatus] ?? ''}`}
        >
          {statusLabel}
        </span>
      </div>

      <div className={styles.content}>
        <span className={styles.category}>{category}</span>

        <h3 className={styles.name}>{name}</h3>

        <div className={styles.details}>
          {location && (
            <span>
              <i className="ri-map-pin-line" aria-hidden="true" />
              {location}
            </span>
          )}

          {date && (
            <span>
              <i className="ri-calendar-line" aria-hidden="true" />
              {date}
            </span>
          )}
        </div>
      </div>
    </>
  );

  return to ? (
    <Link to={to} className={styles.cardLink}>
      <Card className={styles.itemCard} padding="none" hoverable>
        {content}
      </Card>
    </Link>
  ) : (
    <Card className={styles.itemCard} padding="none" hoverable>
      {content}
    </Card>
  );
}

export default ItemCard;
