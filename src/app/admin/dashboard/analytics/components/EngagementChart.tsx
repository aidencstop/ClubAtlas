'use client';

import styles from './EngagementChart.module.css';

interface EngagementChartProps {
  months: string[];
  subscribersData: number[];
  saveData: number[];
}

const CHART_WIDTH = 640;
const CHART_HEIGHT = 280;
const PADDING = { top: 20, right: 20, bottom: 40, left: 50 };
const PLOT_WIDTH = CHART_WIDTH - PADDING.left - PADDING.right;
const PLOT_HEIGHT = CHART_HEIGHT - PADDING.top - PADDING.bottom;
const Y_MAX = 2400;
const Y_TICKS = [0, 600, 1200, 1800, 2400];

export default function EngagementChart({ months, subscribersData, saveData }: EngagementChartProps) {
  const subs = subscribersData.length > 0 ? subscribersData : months.map(() => 0);
  const save = saveData.length > 0 ? saveData : months.map(() => 0);
  const maxVal = Math.max(...subs, ...save, 1, Y_MAX);
  const scaleY = (v: number) => PADDING.top + PLOT_HEIGHT - (v / maxVal) * PLOT_HEIGHT;
  const scaleX = (i: number) => PADDING.left + (i / Math.max(months.length - 1, 1)) * PLOT_WIDTH;

  const subscribersPath = subs
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(v)}`)
    .join(' ');
  const subscribersAreaPath = subs.length > 0 ? `${subscribersPath} L ${scaleX(subs.length - 1)} ${PADDING.top + PLOT_HEIGHT} L ${scaleX(0)} ${PADDING.top + PLOT_HEIGHT} Z` : '';

  const savePath = save
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(v)}`)
    .join(' ');
  const saveAreaPath = save.length > 0 ? `${savePath} L ${scaleX(save.length - 1)} ${PADDING.top + PLOT_HEIGHT} L ${scaleX(0)} ${PADDING.top + PLOT_HEIGHT} Z` : '';

  return (
    <div className={styles.chartContainer}>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className={styles.chartSvg}
        preserveAspectRatio="xMidYMid meet"
      >
        {Y_TICKS.map((tick, i) => (
          <g key={i}>
            <line
              x1={PADDING.left}
              y1={scaleY(tick)}
              x2={CHART_WIDTH - PADDING.right}
              y2={scaleY(tick)}
              className={styles.gridLine}
            />
            <text
              x={PADDING.left - 8}
              y={scaleY(tick) + 4}
              className={styles.axisLabel}
              textAnchor="end"
            >
              {tick}
            </text>
          </g>
        ))}
        {months.map((m, i) => (
          <text
            key={m}
            x={scaleX(i)}
            y={CHART_HEIGHT - 8}
            className={styles.axisLabel}
            textAnchor="middle"
          >
            {m}
          </text>
        ))}
        {subscribersAreaPath && <path d={subscribersAreaPath} className={styles.subscribersArea} />}
        {saveAreaPath && <path d={saveAreaPath} className={styles.saveArea} />}
        {subscribersPath && <path d={subscribersPath} className={styles.subscribersLine} fill="none" />}
        {savePath && <path d={savePath} className={styles.saveLine} fill="none" />}
      </svg>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.subscribers}`} />
          <span>Subscribers</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.save}`} />
          <span>Save</span>
        </div>
      </div>
    </div>
  );
}
