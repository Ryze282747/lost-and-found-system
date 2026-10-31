
import { useEffect, useMemo, useState } from 'react';

import ItemCard from '../../components/ItemCard/ItemCard.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';
import ItemSearch from '../Home/components/ItemSearch.jsx';
import Loading from '../../components/Loading/Loading.jsx';

import { getAllItems } from '../../pages/Items/api/itemApi.js';

import styles from './Items.module.css';

function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true);
        setError('');

        const data = await getAllItems();
        setItems(data);
      } catch (err) {
        console.error('Failed to fetch items:', err);
        setError('Unable to load items. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(items.map((item) => item.category))].sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch = [
        item.name,
        item.category,
        item.location,
        item.description,
      ].some((value) =>
        String(value ?? '').toLowerCase().includes(keyword)
      );

      const matchesStatus =
        status === 'all' || item.status === status;

      const matchesCategory =
        category === 'all' || item.category === category;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [items, search, status, category]);

  function clearFilters() {
    setSearch('');
    setStatus('all');
    setCategory('all');
  }

  return (
    <main className={styles.itemsPage}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Browse Items</h1>
          <p className={styles.description}>
            Explore reported lost and found belongings.
          </p>
        </div>

        <span className={styles.itemCount}>
          {filteredItems.length}{' '}
          {filteredItems.length === 1 ? 'item' : 'items'}
        </span>
      </header>

      <ItemSearch
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
      />

      {loading ? (
        <Loading message="Loading lost and found items..." />
      ) : error ? (
        <EmptyState
          icon="ri-error-warning-line"
          title="Unable to load items"
          description={error}
          actionLabel="Try again"
          onAction={() => window.location.reload()}
        />
      ) : filteredItems.length > 0 ? (
        <div className={styles.itemsGrid}>
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              image={item.image}
              name={item.name}
              category={item.category}
              status={item.status}
              location={item.location}
              date={item.date}
              to={`/items/${item.id}`}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="ri-search-line"
          title="No items found"
          description="Try changing your search or filters."
          actionLabel="Clear filters"
          onAction={clearFilters}
        />
      )}
    </main>
  );
}

export default Items;
