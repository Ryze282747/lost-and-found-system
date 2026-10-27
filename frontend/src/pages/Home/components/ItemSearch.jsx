
import styles from './ItemSearch.module.css';

function ItemSearch({
  search,
  onSearchChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
  categories = [],
}) {
  return (
    <section className={styles.searchSection}>
      <div className={styles.searchBar}>
        <i
          className="ri-search-line"
          aria-hidden="true"
        />

        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by item name or location..."
          aria-label="Search items"
        />

        {search && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <i className="ri-close-line" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="item-status">Status</label>

          <select
            id="item-status"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            <option value="all">All items</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
            <option value="pending">Pending</option>
            <option value="claimed">Claimed</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="item-category">Category</label>

          <select
            id="item-category"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            <option value="all">All categories</option>

            {categories.map((itemCategory) => (
              <option key={itemCategory} value={itemCategory}>
                {itemCategory}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

export default ItemSearch;
