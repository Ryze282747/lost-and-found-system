
import { useMemo, useState } from 'react';

import ItemCard from '../../components/ItemCard/ItemCard.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';

import ItemSearch from '../Home/components/ItemSearch.jsx';
import mockItems from '../Home/data/mockItems.js';

import styles from './Items.module.css';

function Items() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');

  const categories = useMemo(() => {
    return [...new Set(mockItems.map((item) => item.category))].sort();
  }, []);

  const filteredItems = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return mockItems.filter((item) => {
      const matchesSearch = [
        item.name,
        item.category,
        item.location,
        item.description,
      ].some((value) => value.toLowerCase().includes(keyword));

      const matchesStatus =
        status === 'all' || item.status === status;

      const matchesCategory =
        category === 'all' || item.category === category;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [search, status, category]);

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

      {filteredItems.length > 0 ? (
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
