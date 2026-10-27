
import { useMemo, useState } from 'react';

import StatsCard from '../../components/StatsCard/StatsCard.jsx';
import ItemCard from '../../components/ItemCard/ItemCard.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';

import HomeHero from './components/HomeHero.jsx';
import ItemSearch from './components/ItemSearch.jsx';
import mockItems from './data/mockItems.js';

import styles from './Home.module.css';

function Home() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');

  // Get unique categories from the available items.
  const categories = useMemo(() => {
    return [...new Set(mockItems.map((item) => item.category))].sort();
  }, []);

  // Calculate dashboard statistics.
  const stats = useMemo(() => [
    {
      title: 'Total Items',
      value: mockItems.length,
      icon: 'ri-archive-line',
      description: 'All reported items',
      color: 'primary',
    },
    {
      title: 'Lost Items',
      value: mockItems.filter((item) => item.status === 'lost').length,
      icon: 'ri-search-line',
      description: 'Items reported missing',
      color: 'lost',
    },
    {
      title: 'Found Items',
      value: mockItems.filter((item) => item.status === 'found').length,
      icon: 'ri-checkbox-circle-line',
      description: 'Items reported found',
      color: 'found',
    },
    {
      title: 'Pending',
      value: mockItems.filter((item) => item.status === 'pending').length,
      icon: 'ri-time-line',
      description: 'Awaiting resolution',
      color: 'pending',
    },
  ], []);

  // Search and filter the items.
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
    <main className={styles.home}>
      <HomeHero />

      <section className={styles.statsGrid} aria-label="Item statistics">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
            color={stat.color}
          />
        ))}
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
            {filteredItems.length}{' '}
            {filteredItems.length === 1 ? 'item' : 'items'}
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
