'use client';

import styles from './FilterSection.module.css';

const chevronIcon = "https://www.figma.com/api/mcp/asset/be0b2b8b-a481-4b56-bdb5-dc45b8621589";

interface FilterSectionProps {
  selectedCategory: string;
  selectedPrice: string;
  selectedMembership: string;
  onCategoryChange: (category: string) => void;
  onPriceChange: (price: string) => void;
  onMembershipChange: (membership: string) => void;
}

export default function FilterSection({
  selectedCategory,
  selectedPrice,
  selectedMembership,
  onCategoryChange,
  onPriceChange,
  onMembershipChange,
}: FilterSectionProps) {
  return (
    <div className={styles.filterSection}>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Category</label>
        <div className={styles.selectWrapper}>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={styles.select}
          >
            <option value="All">All</option>
            <option value="STEM">STEM</option>
            <option value="Arts">Arts</option>
            <option value="Performance">Performance</option>
            <option value="Academic">Academic</option>
            <option value="Sports">Sports</option>
            <option value="Social">Social</option>
          </select>
          <img src={chevronIcon} alt="" className={styles.chevronIcon} />
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Meeting Days</label>
        <div className={styles.selectWrapper}>
          <select
            value={selectedPrice}
            onChange={(e) => onPriceChange(e.target.value)}
            className={styles.select}
          >
            <option value="All">All</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Weekend">Weekend</option>
          </select>
          <img src={chevronIcon} alt="" className={styles.chevronIcon} />
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Time</label>
        <div className={styles.selectWrapper}>
          <select
            value={selectedMembership}
            onChange={(e) => onMembershipChange(e.target.value)}
            className={styles.select}
          >
            <option value="All">All</option>
            <option value="Morning">Morning (6AM - 12PM)</option>
            <option value="Afternoon">Afternoon (12PM - 6PM)</option>
            <option value="Evening">Evening (6PM - 10PM)</option>
          </select>
          <img src={chevronIcon} alt="" className={styles.chevronIcon} />
        </div>
      </div>
    </div>
  );
}

