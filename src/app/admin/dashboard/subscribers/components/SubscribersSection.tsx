'use client';

import { useState } from 'react';
import styles from './SubscribersSection.module.css';
import StatCard from './StatCard';
import SubscriberRow from './SubscriberRow';
import SubscriberDetailsModal from './SubscriberDetailsModal';

const imgIconSearch = "https://www.figma.com/api/mcp/asset/8c02a939-889b-4a3b-bada-1dd826a49483";

interface Subscriber {
  id: string;
  email: string;
  subscribedDate: string;
  initial: string;
}

const mockSubscribers: Subscriber[] = [
  {
    id: '1',
    email: 'john.doe@email.edu',
    subscribedDate: 'Nov 2024',
    initial: 'J',
  },
  {
    id: '2',
    email: 'jane.smith@email.edu',
    subscribedDate: 'Nov 2024',
    initial: 'J',
  },
  {
    id: '3',
    email: 'alex.kim@email.edu',
    subscribedDate: 'Nov 2024',
    initial: 'A',
  },
  {
    id: '4',
    email: 'maria.garcia@email.edu',
    subscribedDate: 'Nov 2024',
    initial: 'M',
  },
];

export default function SubscribersSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleViewDetails = (subscriberId: string) => {
    const subscriber = mockSubscribers.find(s => s.id === subscriberId);
    if (subscriber) {
      setSelectedSubscriber(subscriber);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSubscriber(null);
  };

  const filteredSubscribers = mockSubscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className={styles.subscribersSection}>
        <h1 className={styles.title}>Subscribers</h1>

        <div className={styles.statsGrid}>
          <StatCard
            value="127"
            label="Total Subscribers"
            subtext="+12 this week"
            subtextColor="green"
          />
          <StatCard
            value="89%"
            label="Active Rate"
            subtext="Opened recent email"
            subtextColor="gray"
          />
          <StatCard
            value="42%"
            label="Avg. Open Rate"
            subtext="Email engagement"
            subtextColor="gray"
          />
        </div>

        <div className={styles.subscribersContainer}>
          <div className={styles.searchBar}>
            <div className={styles.searchInput}>
              <img src={imgIconSearch} alt="" className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search subscribers by email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.input}
              />
            </div>
            <button onClick={handleSearch} className={styles.searchButton}>
              Search
            </button>
          </div>

          <div className={styles.subscribersList}>
            {filteredSubscribers.map((subscriber) => (
              <SubscriberRow
                key={subscriber.id}
                subscriber={subscriber}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      </div>

      <SubscriberDetailsModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        subscriber={selectedSubscriber}
      />
    </>
  );
}

