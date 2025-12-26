'use client';

import styles from './ActivityChart.module.css';

const imgIconChart = "https://www.figma.com/api/mcp/asset/63c0c552-db4a-4d6c-9d0e-dc92254947e1";

export default function ActivityChart() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>User Activity Trends</h3>
      <div className={styles.chartArea}>
        <div className={styles.placeholder}>
          <img src={imgIconChart} alt="Chart" className={styles.icon} />
          <p className={styles.text}>User Activity Chart Visualization</p>
        </div>
      </div>
    </div>
  );
}

