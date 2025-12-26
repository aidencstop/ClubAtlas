import styles from './QuickActions.module.css';

interface Action {
  icon: string;
  iconBg: string;
  label: string;
  href?: string;
}

const actions: Action[] = [
  {
    icon: "https://www.figma.com/api/mcp/asset/f9a0d896-59aa-4f4d-9ac4-b0740537ba8b",
    iconBg: "#dbeafe",
    label: "Create Event",
  },
  {
    icon: "https://www.figma.com/api/mcp/asset/bd8dee7d-f81d-4b0d-9a07-6c1710716739",
    iconBg: "#f3e8ff",
    label: "New Announcement",
  },
  {
    icon: "https://www.figma.com/api/mcp/asset/fc0d4d4b-4a7e-4fe6-8212-5138f7f1d0fa",
    iconBg: "#dcfce7",
    label: "Edit Profile",
  },
  {
    icon: "https://www.figma.com/api/mcp/asset/bc1d3d37-65af-4a05-a651-6c8a1e11cff7",
    iconBg: "#ffedd4",
    label: "View Subscribers",
  },
];

export default function QuickActions() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Quick Actions</h3>
      <div className={styles.actions}>
        {actions.map((action, index) => (
          <button key={index} className={styles.actionButton}>
            <div
              className={styles.actionIconContainer}
              style={{ backgroundColor: action.iconBg }}
            >
              <img src={action.icon} alt={action.label} className={styles.actionIcon} />
            </div>
            <span className={styles.actionLabel}>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}


