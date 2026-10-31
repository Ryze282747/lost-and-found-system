import { useEffect, useMemo, useState } from 'react';

import StatsCard from '../../components/StatsCard/StatsCard.jsx';
import ItemCard from '../../components/ItemCard/ItemCard.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';
import HomeHero from './components/HomeHero.jsx';
import ItemSearch from './components/ItemSearch.jsx';
import Loading from '../../components/Loading/Loading.jsx';

import { getAllItems } from '../../pages/Items/api/itemApi.js';

import StatCardSkeleton from './components/StatCardSkeleton.jsx';
import styles from './Home.module.css';

function Home() {
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

  // Get unique categories from the API data.
  const categories = useMemo(() => {
    return [...new Set(items.map((item) => item.category))].sort();
  }, [items]);

  // Calculate statistics from the API data.
  const stats = useMemo(() => [
    {
      title: 'Total Items',
      value: items.length,
      icon: 'ri-archive-line',
      description: 'All reported items',
      color: 'primary',
    },
    {
      title: 'Lost Items',
      value: items.filter((item) => item.status === 'lost').length,
      icon: 'ri-search-line',
      description: 'Items reported missing',
      color: 'lost',
    },
    {
      title: 'Found Items',
      value: items.filter((item) => item.status === 'found').length,
      icon: 'ri-checkbox-circle-line',
      description: 'Items reported found',
      color: 'found',
    },
    {
      title: 'Pending',
      value: items.filter((item) => item.status === 'pending').length,
      icon: 'ri-time-line',
      description: 'Awaiting resolution',
      color: 'pending',
    },
  ], [items]);

  // Search and filter the API data.
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
    <main className={styles.home}>
      <HomeHero />
      <section
        className={styles.statsGrid}
        aria-label="Item statistics"
        aria-busy={loading}
      >
        {loading ? (
          Array.from({ length: 4 }, (_, index) => (
            <StatCardSkeleton key={index} />
          ))
        ) : (
          stats.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              description={stat.description}
              color={stat.color}
            />
          ))
        )}
      </section>
      <section className={styles.itemsSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Recent Items</h2>
            <p className={styles.sectionDescription}>
              Browse recently reported lost and found belongings.
            </p>
          </div>

          <span className={styles.resultsCount}>
            {loading ? 'Loading...' : (
              <>
                {filteredItems.length}{' '}
                {filteredItems.length === 1 ? 'item' : 'items'}
              </>
            )}
          </span>
        </div>

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
          <Loading message="Loading recent items..." />
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
            description="Try another search term or change your filters to find what you're looking for."
            actionLabel="Clear filters"
            onAction={clearFilters}
          />
        )}
      </section>
    </main>
  );
}

export default Home;
