'use client';

import styles from './TrafficChart.module.css';

const imgIconChart = "https://www.figma.com/api/mcp/asset/5a8fd583-ddb0-4cff-89a8-9aa8c78528d6";

export default function TrafficChart() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Traffic Overview</h3>
      <div className={styles.chartArea}>
        <div className={styles.placeholder}>
          <img src={imgIconChart} alt="Chart" className={styles.icon} />
          <p className={styles.text}>Traffic Chart</p>
        </div>
      </div>
    </div>
  );
}

