import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Card from '../../components/Card/Card.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';
import ClaimForm from '../../components/ClaimForm/ClaimForm.jsx';
import FoundItemForm from '../../components/FoundItemForm/FoundItemForm.jsx';
import mockItems from '../../pages/Home/data/mockItems.js';

import styles from './ItemDetails.module.css';

function ItemDetails() {
  const { id } = useParams();

  const [isClaimFormOpen, setIsClaimFormOpen] = useState(false);
  const [isFoundFormOpen, setIsFoundFormOpen] = useState(false);

  const item = mockItems.find((item) => String(item.id) === id);

  if (!item) {
    return (
      <main className={styles.page}>
        <EmptyState
          icon="ri-file-search-line"
          title="Item not found"
          description="This item may no longer be available or the link may be incorrect."
          actionLabel="Browse items"
          onAction={() => {
            window.location.href = '/items';
          }}
        />
      </main>
    );
  }

  const normalizedStatus = item.status.toLowerCase();

  const statusLabels = {
    lost: 'Lost',
    found: 'Found',
    pending: 'Pending',
    claimed: 'Claimed',
  };

  return (
    <main className={styles.page}>
      <Link to="/items" className={styles.backLink}>
        <i className="ri-arrow-left-line" aria-hidden="true" />
        Back to items
      </Link>

      <Card className={styles.detailsCard} padding="none">
        <div className={styles.imageWrapper}>
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <i className="ri-image-line" aria-hidden="true" />
              <span>No image available</span>
            </div>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.heading}>
            <span className={styles.category}>{item.category}</span>

            <span
              className={`${styles.status} ${
                styles[normalizedStatus] ?? ''
              }`}
            >
              {statusLabels[normalizedStatus] ?? item.status}
            </span>
          </div>

          <h1 className={styles.title}>{item.name}</h1>
          <p className={styles.description}>{item.description}</p>

          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <i className="ri-map-pin-line" aria-hidden="true" />
              <div>
                <span className={styles.infoLabel}>Location</span>
                <p>{item.location || 'Not specified'}</p>
              </div>
            </div>

            <div className={styles.infoRow}>
              <i className="ri-calendar-line" aria-hidden="true" />
              <div>
                <span className={styles.infoLabel}>Date reported</span>
                <p>{item.date || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {normalizedStatus === 'found' && (
            <div className={styles.claimSection}>
              <button
                type="button"
                className={styles.claimButton}
                onClick={() => setIsClaimFormOpen(true)}
              >
                <i className="ri-hand-heart-line" aria-hidden="true" />
                Claim This Item
              </button>
            </div>
          )}

          {normalizedStatus === 'lost' && (
            <div className={styles.claimSection}>
              <button
                type="button"
                className={styles.claimButton}
                onClick={() => setIsFoundFormOpen(true)}
              >
                <i className="ri-search-eye-line" aria-hidden="true" />
                I Found This Item
              </button>
            </div>
          )}

          {normalizedStatus === 'claimed' && (
            <p className={styles.claimedMessage}>
              <i
                className="ri-checkbox-circle-line"
                aria-hidden="true"
              />
              This item has already been claimed.
            </p>
          )}
        </div>
      </Card>

      {isClaimFormOpen && (
        <ClaimForm
          itemName={item.name}
          onClose={() => setIsClaimFormOpen(false)}
        />
      )}

      {isFoundFormOpen && (
        <FoundItemForm
          itemName={item.name}
          onClose={() => setIsFoundFormOpen(false)}
        />
      )}
    </main>
  );
}

export default ItemDetails;
