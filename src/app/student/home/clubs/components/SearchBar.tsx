'use client';

import styles from './SearchBar.module.css';

const searchIcon = "https://www.figma.com/api/mcp/asset/852932b0-4fd8-46b7-971d-27c904703d8c";
const filterIcon = "https://www.figma.com/api/mcp/asset/59a88fd4-c704-48d4-bc84-9435d427da82";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <img src={searchIcon} alt="" className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search by club name, category, or interest..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <button className={styles.filterButton}>
        <img src={filterIcon} alt="" className={styles.filterIcon} />
        <span>Filters</span>
      </button>
    </div>
  );
}

