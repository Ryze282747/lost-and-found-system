
import { Link } from 'react-router-dom';
import styles from './HomeHero.module.css';

function HomeHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>
          <i className="ri-community-line" aria-hidden="true" />
          Lost & Found System
        </span>

        <h1 className={styles.title}>
          Lost something?
          <br />
          <span>Let's find it.</span>
        </h1>

        <p className={styles.description}>
          Browse reported items, reconnect with lost belongings,
          and help others find what they're looking for.
        </p>

        <div className={styles.actions}>
          <Link to="/items" className={styles.primaryButton}>
            Browse items
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </Link>

          <Link to="/report" className={styles.secondaryButton}>
            <i className="ri-add-line" aria-hidden="true" />
            Report an item
          </Link>
        </div>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.visualIcon}>
          <i className="ri-search-eye-line" />
        </div>

        <div className={styles.floatingIcon}>
          <i className="ri-key-2-line" />
        </div>

        <div className={styles.floatingIcon}>
          <i className="ri-wallet-3-line" />
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
