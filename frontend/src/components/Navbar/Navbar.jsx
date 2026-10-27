import { useState } from 'react';
import styles from './Navbar.module.css';

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.container}>
          {/* Brand */}
          <a href="/" className={styles.brand}>
            <i className="ri-search-eye-line" aria-hidden="true"></i>
            <span className={styles.brandName}>Lost & Found</span>
          </a>

          {/* Desktop navigation */}
          <div className={styles.links}>
            <a href="/" className={styles.link}>
              <i className="ri-home-5-line" aria-hidden="true"></i>
              <span>Home</span>
            </a>

            <a href="/items" className={styles.link}>
              <i className="ri-archive-line" aria-hidden="true"></i>
              <span>Browse Items</span>
            </a>

            <a href="/report" className={styles.link}>
              <i className="ri-add-circle-line" aria-hidden="true"></i>
              <span>Report Item</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
            aria-controls="mobile-sidebar"
          >
            <i className="ri-menu-line" aria-hidden="true"></i>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`${styles.overlay} ${
          sidebarOpen ? styles.overlayVisible : ''
        }`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* Mobile sidebar */}
      <aside
        id="mobile-sidebar"
        className={`${styles.sidebar} ${
          sidebarOpen ? styles.sidebarOpen : ''
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!sidebarOpen}
        inert={!sidebarOpen}
      >
        <div className={styles.sidebarHeader}>
          <a href="/" className={styles.brand} onClick={closeSidebar}>
            <i className="ri-search-eye-line" aria-hidden="true"></i>
            <span className={styles.brandName}>Lost & Found</span>
          </a>

          <button
            type="button"
            className={styles.closeButton}
            onClick={closeSidebar}
            aria-label="Close navigation menu"
          >
            <i className="ri-close-line" aria-hidden="true"></i>
          </button>
        </div>

        <div className={styles.sidebarLinks}>
          <a href="/" className={styles.link} onClick={closeSidebar}>
            <i className="ri-home-5-line" aria-hidden="true"></i>
            <span>Home</span>
          </a>

          <a href="/items" className={styles.link} onClick={closeSidebar}>
            <i className="ri-archive-line" aria-hidden="true"></i>
            <span>Browse Items</span>
          </a>

          <a href="/report" className={styles.link} onClick={closeSidebar}>
            <i className="ri-add-circle-line" aria-hidden="true"></i>
            <span>Report Item</span>
          </a>
        </div>

        <div className={styles.sidebarFooter}>
          <span>Lost & Found System</span>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
